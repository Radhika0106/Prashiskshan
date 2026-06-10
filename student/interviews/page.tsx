"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Code, Users, Briefcase, PlusCircle, 
  ChevronDown, Sparkles, Activity, Award
} from "lucide-react";

type InterviewType = 'technical' | 'behavioral' | 'hybrid' | 'custom' | null;

export default function InterviewLandingPage() {
  const router = useRouter();
  const [expandedCard, setExpandedCard] = useState<InterviewType>(null);

  // Configuration States
  const [techRole, setTechRole] = useState("Frontend Engineer");
  const [techLevel, setTechLevel] = useState("Entry");
  const [techDuration, setTechDuration] = useState("45");

  const [behavIndustry, setBehavIndustry] = useState("Tech");
  const [behavSize, setBehavSize] = useState("Startup");
  const [behavDuration, setBehavDuration] = useState("30");

  const [hybridRole, setHybridRole] = useState("Full-Stack Developer");
  const [hybridDuration, setHybridDuration] = useState("90");

  const [customFile, setCustomFile] = useState<File | null>(null);

  const handleStartPractice = (type: string) => {
    // In a real app, we might pass config via URL params or state store
    router.push(`/student/interviews/setup?type=${type}`);
  };

  const toggleCard = (type: InterviewType) => {
    if (expandedCard === type) {
      setExpandedCard(null);
    } else {
      setExpandedCard(type);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      {/* Hero Section */}
      <div className="mb-12 pt-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#EFF6FF] text-[#2563EB] rounded-full font-mono text-[11px] mb-4 border border-[#BFDBFE]">
          <Sparkles size={12} />
          Powered by GPT-4
        </div>
        <h1 className="font-instrument text-[32px] text-[#111111] leading-tight mb-2">
          Interview Master
        </h1>
        <p className="font-inter text-[16px] text-[#666666] max-w-2xl">
          Practice with AI interviewers powered by real industry standards.
        </p>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white p-4 border border-[#E5E5E5] rounded-xl flex items-start gap-3">
            <div className="bg-[#F3F4F6] p-2 rounded-lg text-[#111111] shrink-0">
              <Activity size={18} />
            </div>
            <div>
              <h3 className="font-medium text-[#111111] text-sm mb-1">Realistic Q&A</h3>
              <p className="text-xs text-[#666666]">Interviewer adapts based on your answers. No scripted responses.</p>
            </div>
          </div>
          <div className="bg-white p-4 border border-[#E5E5E5] rounded-xl flex items-start gap-3">
            <div className="bg-[#ECFDF5] p-2 rounded-lg text-[#059669] shrink-0">
              <Activity size={18} />
            </div>
            <div>
              <h3 className="font-medium text-[#111111] text-sm mb-1">Real-time Feedback</h3>
              <p className="text-xs text-[#666666]">Get instant insights on confidence, clarity, technical accuracy.</p>
            </div>
          </div>
          <div className="bg-white p-4 border border-[#E5E5E5] rounded-xl flex items-start gap-3">
            <div className="bg-[#FEF2F2] p-2 rounded-lg text-[#DC2626] shrink-0">
              <Award size={18} />
            </div>
            <div>
              <h3 className="font-medium text-[#111111] text-sm mb-1">Industry Scoring</h3>
              <p className="text-xs text-[#666666]">Evaluated by standards used by Google, Amazon, Microsoft.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Selection Grid */}
      <h2 className="font-instrument text-2xl mb-6">Select Interview Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Technical Interview */}
        <div 
          className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${expandedCard === 'technical' ? 'border-[#111111] shadow-sm' : 'border-[#E5E5E5] hover:border-[#111111]/30 cursor-pointer'}`}
        >
          <div className="p-6 flex items-start gap-4" onClick={() => expandedCard !== 'technical' && toggleCard('technical')}>
            <div className="bg-[#F7F6F3] p-3 rounded-lg text-[#111111] shrink-0">
              <Code size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-instrument text-[20px] text-[#111111]">Technical Interview</h3>
              <p className="text-sm text-[#666666] mt-1">Code, system design, problem-solving</p>
            </div>
            {expandedCard === 'technical' && (
              <button className="text-[#666] hover:text-[#111] p-1" onClick={() => toggleCard('technical')}>✕</button>
            )}
          </div>

          {expandedCard === 'technical' && (
            <div className="px-6 pb-6 pt-2 border-t border-[#E5E5E5]/50 animate-in fade-in slide-in-from-top-2">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#666] mb-1.5">Role</label>
                  <select 
                    value={techRole}
                    onChange={(e) => setTechRole(e.target.value)}
                    className="w-full bg-[#F7F6F3] border border-[#E5E5E5] rounded-lg px-3 py-2 text-sm text-[#111] outline-none focus:border-[#111] transition-colors appearance-none"
                  >
                    <option value="Frontend Engineer">Frontend Engineer</option>
                    <option value="Backend Engineer">Backend Engineer</option>
                    <option value="Full-Stack Developer">Full-Stack Developer</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-[#666] mb-1.5">Experience Level</label>
                  <div className="flex gap-3">
                    {['Entry', 'Mid', 'Senior'].map(level => (
                      <label key={level} className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="techLevel" 
                          checked={techLevel === level} 
                          onChange={() => setTechLevel(level)}
                          className="accent-[#111111]"
                        />
                        <span className="text-sm text-[#111]">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#666] mb-1.5">Duration</label>
                  <select 
                    value={techDuration}
                    onChange={(e) => setTechDuration(e.target.value)}
                    className="w-full bg-[#F7F6F3] border border-[#E5E5E5] rounded-lg px-3 py-2 text-sm text-[#111] outline-none focus:border-[#111] transition-colors appearance-none"
                  >
                    <option value="30">30 min</option>
                    <option value="45">45 min</option>
                    <option value="60">60 min</option>
                  </select>
                </div>

                <button 
                  onClick={() => handleStartPractice('technical')}
                  className="w-full mt-2 bg-[#111111] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#333333] transition-colors flex items-center justify-center gap-2"
                >
                  Start Practice <span>→</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Behavioral Interview */}
        <div 
          className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${expandedCard === 'behavioral' ? 'border-[#111111] shadow-sm' : 'border-[#E5E5E5] hover:border-[#111111]/30 cursor-pointer'}`}
        >
          <div className="p-6 flex items-start gap-4" onClick={() => expandedCard !== 'behavioral' && toggleCard('behavioral')}>
            <div className="bg-[#F7F6F3] p-3 rounded-lg text-[#111111] shrink-0">
              <Users size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-instrument text-[20px] text-[#111111]">Behavioral Interview</h3>
              <p className="text-sm text-[#666666] mt-1">Communication, teamwork, leadership</p>
            </div>
            {expandedCard === 'behavioral' && (
              <button className="text-[#666] hover:text-[#111] p-1" onClick={() => toggleCard('behavioral')}>✕</button>
            )}
          </div>

          {expandedCard === 'behavioral' && (
            <div className="px-6 pb-6 pt-2 border-t border-[#E5E5E5]/50 animate-in fade-in slide-in-from-top-2">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#666] mb-1.5">Industry</label>
                  <select 
                    value={behavIndustry}
                    onChange={(e) => setBehavIndustry(e.target.value)}
                    className="w-full bg-[#F7F6F3] border border-[#E5E5E5] rounded-lg px-3 py-2 text-sm text-[#111] outline-none focus:border-[#111] transition-colors appearance-none"
                  >
                    <option value="Tech">Tech</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Consulting">Consulting</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-[#666] mb-1.5">Company Size Preference</label>
                  <div className="flex gap-3">
                    {['Startup', 'Scale-up', 'Enterprise'].map(size => (
                      <label key={size} className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="behavSize" 
                          checked={behavSize === size} 
                          onChange={() => setBehavSize(size)}
                          className="accent-[#111111]"
                        />
                        <span className="text-sm text-[#111]">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#666] mb-1.5">Duration</label>
                  <select 
                    value={behavDuration}
                    onChange={(e) => setBehavDuration(e.target.value)}
                    className="w-full bg-[#F7F6F3] border border-[#E5E5E5] rounded-lg px-3 py-2 text-sm text-[#111] outline-none focus:border-[#111] transition-colors appearance-none"
                  >
                    <option value="30">30 min</option>
                    <option value="45">45 min</option>
                  </select>
                </div>

                <button 
                  onClick={() => handleStartPractice('behavioral')}
                  className="w-full mt-2 bg-[#111111] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#333333] transition-colors flex items-center justify-center gap-2"
                >
                  Start Practice <span>→</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Hybrid Interview */}
        <div 
          className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${expandedCard === 'hybrid' ? 'border-[#111111] shadow-sm' : 'border-[#E5E5E5] hover:border-[#111111]/30 cursor-pointer'}`}
        >
          <div className="p-6 flex items-start gap-4" onClick={() => expandedCard !== 'hybrid' && toggleCard('hybrid')}>
            <div className="bg-[#F7F6F3] p-3 rounded-lg text-[#111111] shrink-0">
              <Briefcase size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-instrument text-[20px] text-[#111111]">Full Interview Loop</h3>
              <p className="text-sm text-[#666666] mt-1">Both technical and behavioral rounds</p>
            </div>
            {expandedCard === 'hybrid' && (
              <button className="text-[#666] hover:text-[#111] p-1" onClick={() => toggleCard('hybrid')}>✕</button>
            )}
          </div>

          {expandedCard === 'hybrid' && (
            <div className="px-6 pb-6 pt-2 border-t border-[#E5E5E5]/50 animate-in fade-in slide-in-from-top-2">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#666] mb-1.5">Role</label>
                  <select 
                    value={hybridRole}
                    onChange={(e) => setHybridRole(e.target.value)}
                    className="w-full bg-[#F7F6F3] border border-[#E5E5E5] rounded-lg px-3 py-2 text-sm text-[#111] outline-none focus:border-[#111] transition-colors appearance-none"
                  >
                    <option value="Frontend Engineer">Frontend Engineer</option>
                    <option value="Backend Engineer">Backend Engineer</option>
                    <option value="Full-Stack Developer">Full-Stack Developer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#666] mb-1.5">Duration</label>
                  <select 
                    value={hybridDuration}
                    onChange={(e) => setHybridDuration(e.target.value)}
                    className="w-full bg-[#F7F6F3] border border-[#E5E5E5] rounded-lg px-3 py-2 text-sm text-[#111] outline-none focus:border-[#111] transition-colors appearance-none"
                  >
                    <option value="60">60 min</option>
                    <option value="90">90 min</option>
                  </select>
                </div>

                <button 
                  onClick={() => handleStartPractice('hybrid')}
                  className="w-full mt-2 bg-[#111111] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#333333] transition-colors flex items-center justify-center gap-2"
                >
                  Start Practice <span>→</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Custom Interview */}
        <div 
          className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${expandedCard === 'custom' ? 'border-[#111111] shadow-sm' : 'border-[#E5E5E5] hover:border-[#111111]/30 cursor-pointer'}`}
        >
          <div className="p-6 flex items-start gap-4" onClick={() => expandedCard !== 'custom' && toggleCard('custom')}>
            <div className="bg-[#F7F6F3] p-3 rounded-lg text-[#111111] shrink-0">
              <PlusCircle size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-instrument text-[20px] text-[#111111]">Upload Job Description</h3>
              <p className="text-sm text-[#666666] mt-1">AI generates questions based on your target role</p>
            </div>
            {expandedCard === 'custom' && (
              <button className="text-[#666] hover:text-[#111] p-1" onClick={() => toggleCard('custom')}>✕</button>
            )}
          </div>

          {expandedCard === 'custom' && (
            <div className="px-6 pb-6 pt-2 border-t border-[#E5E5E5]/50 animate-in fade-in slide-in-from-top-2">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#666] mb-1.5">Paste Job Description</label>
                  <textarea 
                    className="w-full bg-[#F7F6F3] border border-[#E5E5E5] rounded-lg px-3 py-2 text-sm text-[#111] outline-none focus:border-[#111] transition-colors min-h-[80px]"
                    placeholder="Paste the job requirements and responsibilities here..."
                  />
                </div>
                
                <div className="text-center">
                  <span className="text-xs text-[#999] uppercase tracking-wider font-medium">OR</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#666] mb-1.5">Upload File</label>
                  <div className="w-full border-2 border-dashed border-[#E5E5E5] rounded-lg p-4 text-center cursor-pointer hover:border-[#111111]/30 transition-colors">
                    <span className="text-sm text-[#666]">Click to upload PDF or DOCX</span>
                  </div>
                </div>

                <div className="p-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg mt-2">
                  <p className="text-xs text-[#1E40AF] flex gap-2 items-start">
                    <Sparkles size={14} className="shrink-0 mt-0.5" />
                    <span>AI will extract required skills and customize questions to match the exact role expectations.</span>
                  </p>
                </div>

                <button 
                  onClick={() => handleStartPractice('custom')}
                  className="w-full mt-2 bg-[#111111] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#333333] transition-colors flex items-center justify-center gap-2"
                >
                  Start Practice <span>→</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
