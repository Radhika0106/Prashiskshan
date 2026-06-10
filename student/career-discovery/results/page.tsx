"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMockData } from "@/context/MockDataContext";
import { CheckCircle2, Sparkles, ArrowRight, Info, Download, Share, BarChart2, Shield } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { recommendCareers } from "@/lib/engines/career-engine";
import { CareerCategory } from "@/lib/engines/types";

// Metadata mapping for career tracks
const CAREER_META: Record<CareerCategory, {
  subtitle: string;
  description: string;
  whyFits: string;
  skillsHave: string[];
  skillsNeed: string[];
  salary: string;
  growth: number;
}> = {
  'Software Development': {
    subtitle: "Build and optimize software systems",
    description: "Design, develop, and maintain software applications. Solve technical challenges, write clean code, and collaborate with teams to ship products.",
    whyFits: "Fits your strong alignment with system design, clean coding principles, and interest in backend APIs.",
    skillsHave: ["Python", "SQL", "Logic"],
    skillsNeed: ["System Design", "Git", "Testing"],
    salary: "₹6-15 LPA",
    growth: 3,
  },
  'Data Science': {
    subtitle: "Extract insights from complex data",
    description: "Analyze large datasets to find patterns and trends. Build predictive models and algorithms to help businesses make data-driven decisions.",
    whyFits: "Fits your analytical mindset, data-driven problem solving, and Python proficiency.",
    skillsHave: ["Python", "SQL", "Databases"],
    skillsNeed: ["Machine Learning", "Data Analysis", "Data Visualization"],
    salary: "₹8-18 LPA",
    growth: 3,
  },
  'Web Development': {
    subtitle: "Craft engaging web user experiences",
    description: "Create visually stunning and highly functional web applications. Work with React, Next.js, HTML/CSS, and integrate APIs.",
    whyFits: "Fits your creative UI problem-solving and web technologies foundation.",
    skillsHave: ["Web Technologies", "HTML/CSS", "React"],
    skillsNeed: ["Next.js", "APIs", "Performance Optimization"],
    salary: "₹5-12 LPA",
    growth: 2,
  },
  'Cybersecurity': {
    subtitle: "Protect networks and systems from threats",
    description: "Analyze vulnerabilities, configure secure networks, audit systems, and mitigate security threats.",
    whyFits: "Fits your interest in network defense, Linux CLI commands, and system privacy.",
    skillsHave: ["Linux/CLI", "Logical Thinking"],
    skillsNeed: ["Networking & Security", "Ethical Hacking", "Penetration Testing"],
    salary: "₹7-16 LPA",
    growth: 3,
  },
  'Cloud Computing': {
    subtitle: "Design and scale virtualized infrastructures",
    description: "Design, deploy, and manage virtual network topologies, cloud servers, and serverless architectures.",
    whyFits: "Fits your system design background, Linux CLI experience, and distributed computing interest.",
    skillsHave: ["System Design", "Linux/CLI"],
    skillsNeed: ["Cloud Architecture", "AWS/Azure Services", "IaC"],
    salary: "₹8-17 LPA",
    growth: 3,
  },
  'Mobile App Development': {
    subtitle: "Develop applications for pocket devices",
    description: "Build native and cross-platform mobile apps for iOS and Android. Work with Swift, Kotlin, React Native, or Flutter.",
    whyFits: "Fits your visual design interest, mobile SDKs preference, and user interaction styling.",
    skillsHave: ["Web Technologies", "React"],
    skillsNeed: ["Mobile App Development", "Mobile SDKs", "App Store Publishing"],
    salary: "₹6-14 LPA",
    growth: 2,
  },
  'DevOps': {
    subtitle: "Automate and streamline release pipelines",
    description: "Manage deployments, containerize applications with Docker, orchestrate with Kubernetes, and monitor infrastructure.",
    whyFits: "Fits your automation scripting interests, system design base, and Linux CLI skills.",
    skillsHave: ["Linux/CLI", "Python"],
    skillsNeed: ["CI/CD", "Docker", "Kubernetes", "Monitoring"],
    salary: "₹7-16 LPA",
    growth: 3,
  },
  'AI/ML Engineering': {
    subtitle: "Build cognitive and intelligent agents",
    description: "Train machine learning models, construct deep neural networks, and implement intelligent decision pipelines.",
    whyFits: "Fits your algorithmic focus, Python programming base, and cutting-edge tech interests.",
    skillsHave: ["Python", "Algorithms"],
    skillsNeed: ["Machine Learning", "Deep Learning", "Neural Networks"],
    salary: "₹9-20 LPA",
    growth: 3,
  },
};

// Fallback response vector in case the user has not taken the assessment
const FALLBACK_RESPONSES = [
  1, 1, 1, 1, 1, 1, 1, // Interests
  3, 2, 4, 5, 3, 2, 3, // Skills
  3, 3, 3, 4, 3, 4,    // Work Style
  3, 3, 4, 3, 4        // Values
];

export default function ResultsPage() {
  const router = useRouter();
  const { currentUserId, students, updateStudent } = useMockData();
  const student = students.find(s => s.id === currentUserId);
  const [selectedCareerDetail, setSelectedCareerDetail] = useState<string | null>(null);

  if (!student) return <div className="p-8 text-center">Loading student profile...</div>;

  const responses = student.assessmentResponses || FALLBACK_RESPONSES;
  const recommendations = recommendCareers(responses);
  
  if (recommendations.length === 0) {
    return <div className="p-8 text-center text-red-500">Failed to calculate recommendations.</div>;
  }

  const topMatch = recommendations[0];
  const topMeta = CAREER_META[topMatch.career];

  const handleSetTargetCareer = (careerTitle: string) => {
    updateStudent(currentUserId, { targetCareer: careerTitle, targetCareerProgress: 10 });
    router.push("/student/career-path");
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-16">
      
      {/* Header Section */}
      <div className="flex flex-col items-center text-center">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
          className="mb-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F0FDF4] text-[#16A34A] rounded-full border border-[#BBF7D0] font-jetbrains-mono text-[11px] font-medium tracking-wide">
            <Sparkles size={12} /> YOUR TOP MATCH
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="font-instrument text-[42px] md:text-[56px] leading-tight mb-4"
        >
          {topMatch.career}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }}
          className="font-inter text-[16px] text-[#666666] max-w-xl mb-6"
        >
          {topMeta.description}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F6F3] text-[#111111] rounded font-jetbrains-mono text-[13px] border border-[#E5E5E5]"
        >
          <Shield size={14} className="text-[#666]" /> {Math.round(topMatch.confidence * 100)}% confidence match
        </motion.div>
      </div>

      {/* Alignment Breakdown Card */}
      <Card className="max-w-3xl mx-auto border-[#E5E5E5] p-8 md:p-10 shadow-sm bg-white">
        <h3 className="font-instrument text-[24px] mb-6 text-center">Dimension Fit Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-[14px] font-medium mb-1.5">
                <span className="text-[#111]">Interests Alignment</span>
                <span className="font-jetbrains-mono">{Math.round(topMatch.dimensionScores.interests * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-[#E5E5E5] rounded-full overflow-hidden">
                <div className="h-full bg-black rounded-full" style={{ width: `${topMatch.dimensionScores.interests * 100}%` }} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-[14px] font-medium mb-1.5">
                <span className="text-[#111]">Technical Skills Match</span>
                <span className="font-jetbrains-mono">{Math.round(topMatch.dimensionScores.skills * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-[#E5E5E5] rounded-full overflow-hidden">
                <div className="h-full bg-black rounded-full" style={{ width: `${topMatch.dimensionScores.skills * 100}%` }} />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-[14px] font-medium mb-1.5">
                <span className="text-[#111]">Work Style Congruence</span>
                <span className="font-jetbrains-mono">{Math.round(topMatch.dimensionScores.workStyle * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-[#E5E5E5] rounded-full overflow-hidden">
                <div className="h-full bg-black rounded-full" style={{ width: `${topMatch.dimensionScores.workStyle * 100}%` }} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-[14px] font-medium mb-1.5">
                <span className="text-[#111]">Values Compatibility</span>
                <span className="font-jetbrains-mono">{Math.round(topMatch.dimensionScores.values * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-[#E5E5E5] rounded-full overflow-hidden">
                <div className="h-full bg-black rounded-full" style={{ width: `${topMatch.dimensionScores.values * 100}%` }} />
              </div>
            </div>
          </div>

        </div>
      </Card>

      {/* Recommended Careers */}
      <div className="space-y-8">
        <div className="flex items-end justify-between">
          <h2 className="font-instrument text-[32px]">All Recommended Matches</h2>
          <div className="text-[14px] text-[#666] font-jetbrains-mono">
            Powered by Random Forest Model
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((rec, idx) => {
            const meta = CAREER_META[rec.career];
            return (
              <Card key={rec.career} className="p-6 md:p-8 flex flex-col justify-between border-[#E5E5E5] hover:border-[#111111] transition-colors bg-white relative group">
                <div className="absolute top-6 right-6 bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0] px-2 py-1 rounded font-jetbrains-mono text-[11px] font-medium">
                  {Math.round(rec.confidence * 100)}% match
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[12px] font-jetbrains-mono text-[#999]">#{idx + 1}</span>
                    <h3 className="font-instrument text-[24px] md:text-[28px]">{rec.career}</h3>
                  </div>
                  <div className="text-[13px] text-[#666] mb-4">{meta.subtitle}</div>
                  <p className="text-[14px] text-[#111] leading-relaxed mb-6">
                    {meta.description}
                  </p>
                  
                  <div className="bg-[#F7F6F3] rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-2">
                      <Sparkles size={16} className="text-[#111] mt-0.5 shrink-0" />
                      <p className="text-[13px] text-[#111] leading-relaxed">
                        {meta.whyFits}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    <div>
                      <div className="text-[12px] uppercase tracking-wider text-[#666] font-medium mb-2">Ideal Base Skills</div>
                      <div className="flex flex-wrap gap-1.5">
                        {meta.skillsHave.map(skill => (
                          <span key={skill} className="px-2 py-1 bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] rounded text-[12px]">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[12px] uppercase tracking-wider text-[#666] font-medium mb-2">Roadmap Skills to Learn</div>
                      <div className="flex flex-wrap gap-1.5">
                        {meta.skillsNeed.map(skill => (
                          <span key={skill} className="px-2 py-1 bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A] rounded text-[12px]">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-center justify-between py-4 border-t border-[#E5E5E5] mb-6">
                    <div>
                      <div className="flex items-center gap-1.5 text-[12px] text-[#666] mb-1">
                        Est. Salary
                      </div>
                      <div className="font-jetbrains-mono text-[14px]">{meta.salary}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[12px] text-[#666] mb-1">Growth Index</div>
                      <div className="flex items-center justify-end gap-1">
                        {[1, 2, 3].map(i => (
                          <div key={i} className={`w-2 h-2 rounded-full ${i <= meta.growth ? 'bg-[#111]' : 'bg-[#E5E5E5]'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button 
                      onClick={() => handleSetTargetCareer(rec.career)}
                      className="flex-1 bg-[#111111] text-white py-3 rounded-lg font-medium hover:bg-black/90 transition-colors flex items-center justify-center shadow-sm"
                    >
                      Explore Path <ArrowRight size={16} className="ml-2" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center justify-center gap-4 pt-10 border-t border-[#E5E5E5]">
        <button className="px-6 py-3 border border-[#E5E5E5] bg-white rounded-lg text-[14px] font-medium hover:border-[#111] transition-colors flex items-center">
          <Download size={16} className="mr-2" /> Save Results
        </button>
        <button className="px-6 py-3 border border-[#E5E5E5] bg-white rounded-lg text-[14px] font-medium hover:border-[#111] transition-colors flex items-center">
          <Share size={16} className="mr-2" /> Share with Advisor
        </button>
      </div>

    </div>
  );
}
