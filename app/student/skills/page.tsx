"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { BookOpen, ChevronRight, PlayCircle, Award, CheckCircle2, Clock } from "lucide-react";

const SKILLS = [
  { id: '1', name: 'React Fundamentals', difficulty: 'Beginner', modules: 6, time: '~4 hours', progress: 45, icon: BookOpen },
  { id: '2', name: 'UI/UX Design Basics', difficulty: 'Beginner', modules: 4, time: '~3 hours', progress: 100, icon: BookOpen },
  { id: '3', name: 'Advanced CSS', difficulty: 'Intermediate', modules: 8, time: '~6 hours', progress: 0, icon: BookOpen },
];

export default function SkillHub() {
  const [activeTab, setActiveTab] = useState<'paths' | 'progress'>('paths');
  const [selectedSkill, setSelectedSkill] = useState<typeof SKILLS[0] | null>(null);

  if (selectedSkill) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={() => setSelectedSkill(null)}
          className="text-sm font-medium text-[#666] hover:text-[#111111] transition-colors flex items-center"
        >
          <ChevronRight size={14} className="rotate-180 mr-1" /> Back to Skill Hub
        </button>

        <div className="bg-[#111111] text-white rounded-[16px] p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="flex gap-2">
              <span className="text-[11px] font-jetbrains-mono bg-white/20 px-2 py-1 rounded">{selectedSkill.difficulty}</span>
              <span className="text-[11px] font-jetbrains-mono bg-white/20 px-2 py-1 rounded">{selectedSkill.time}</span>
            </div>
            <h1 className="font-instrument text-[40px] leading-tight">{selectedSkill.name}</h1>
            <p className="text-white/80 text-sm">Master the fundamental concepts and build a strong foundation. Complete all modules and interactive quizzes to earn your certificate.</p>
            <div className="pt-4">
              <button className="bg-white text-[#111111] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
                Continue Learning <PlayCircle size={18} />
              </button>
            </div>
          </div>
          <BookOpen className="absolute -right-8 -bottom-8 w-64 h-64 text-white/5 rotate-12" />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">Course Modules</h3>
          
          <div className="border border-[#E5E5E5] rounded-[12px] overflow-hidden bg-white">
            <div className="p-4 border-b border-[#E5E5E5] flex items-center justify-between cursor-pointer hover:bg-[#FAFAFA] transition-colors">
              <div className="flex gap-4 items-center">
                <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center text-sm font-medium">1</div>
                <div>
                  <div className="font-medium">Introduction to the Ecosystem</div>
                  <div className="text-xs text-[#666] mt-0.5">3 lessons • 45 mins</div>
                </div>
              </div>
              <CheckCircle2 size={20} className="text-[#16A34A]" />
            </div>

            <div className="p-4 border-b border-[#E5E5E5] bg-[#FAFAFA] flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-[#E5E5E5]/50 pb-3">
                <div className="flex gap-4 items-center">
                  <div className="w-8 h-8 rounded-full border border-[#111111] flex items-center justify-center text-sm font-medium">2</div>
                  <div>
                    <div className="font-medium flex items-center gap-2">Core Concepts <Badge variant="info">In Progress</Badge></div>
                    <div className="text-xs text-[#666] mt-0.5">4 lessons • 1.5 hours</div>
                  </div>
                </div>
                <ChevronRight size={20} className="text-[#999] rotate-90" />
              </div>
              <div className="pl-12 py-2 space-y-3">
                <div className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-2 text-sm text-[#444] group-hover:text-[#111111]">
                    <CheckCircle2 size={16} className="text-[#16A34A]" /> Lesson 2.1: State & Props
                  </div>
                  <div className="text-xs text-[#999] font-jetbrains-mono">15:00</div>
                </div>
                <div className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-2 text-sm font-medium text-[#111111]">
                    <PlayCircle size={16} className="text-[#2563EB]" /> Lesson 2.2: Context API
                  </div>
                  <div className="text-xs text-[#999] font-jetbrains-mono">22:00</div>
                </div>
                <div className="flex items-center justify-between group cursor-pointer opacity-60">
                  <div className="flex items-center gap-2 text-sm text-[#444]">
                    <div className="w-4 h-4 rounded-full border border-[#999]"></div> Lesson 2.3: Hooks
                  </div>
                  <div className="text-xs text-[#999] font-jetbrains-mono">18:00</div>
                </div>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#FAFAFA] transition-colors opacity-70">
              <div className="flex gap-4 items-center">
                <div className="w-8 h-8 rounded-full border border-[#999] text-[#999] flex items-center justify-center text-sm font-medium">3</div>
                <div>
                  <div className="font-medium text-[#666] flex items-center gap-2">Advanced Patterns <Badge variant="neutral">Locked</Badge></div>
                  <div className="text-xs text-[#999] mt-0.5">5 lessons • 2 hours</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-[#E5E5E5] rounded-[12px] p-6 bg-[#FAFAFA] flex items-center justify-between">
           <div>
             <h4 className="font-medium mb-1">Completion Certificate</h4>
             <p className="text-sm text-[#666]">Complete all modules and score at least 80% on quizzes.</p>
           </div>
           <Award size={32} className="text-[#E5E5E5]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-instrument text-[32px] leading-tight">Skill Hub</h1>
          <p className="text-[#666] text-sm mt-1">Develop new skills taught by experts and peers.</p>
        </div>
        
        <div className="flex bg-[#E5E5E5]/50 p-1 rounded-lg overflow-x-auto shrink-0 hide-scrollbar">
          <button
            onClick={() => setActiveTab('paths')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'paths' ? 'bg-white text-[#111111] shadow-sm' : 'text-[#666] hover:text-[#111111]'
            }`}
          >
            Learning Paths
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'progress' ? 'bg-white text-[#111111] shadow-sm' : 'text-[#666] hover:text-[#111111]'
            }`}
          >
            My Progress
          </button>
        </div>
      </div>

      {activeTab === 'paths' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map(skill => {
            const Icon = skill.icon;
            return (
              <div key={skill.id} className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 hover:border-[#111111] hover:shadow-sm transition-all group flex flex-col justify-between cursor-pointer" onClick={() => setSelectedSkill(skill)}>
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#F7F6F3] flex items-center justify-center text-[#111111] mb-4 group-hover:scale-105 transition-transform">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-instrument text-[22px] mb-2 leading-tight group-hover:underline">{skill.name}</h3>
                  <div className="flex gap-2 mb-4">
                    <Badge variant="neutral">{skill.difficulty}</Badge>
                    <Badge variant="neutral">{skill.modules} modules</Badge>
                  </div>
                </div>
                
                <div>
                  {skill.progress > 0 && skill.progress < 100 && (
                     <div className="mb-4">
                       <div className="flex justify-between text-xs text-[#666] mb-1.5">
                         <span>In progress</span>
                         <span className="font-jetbrains-mono">{skill.progress}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-[#E5E5E5] rounded-full overflow-hidden">
                         <div className="h-full bg-[#2563EB]" style={{ width: `${skill.progress}%` }}></div>
                       </div>
                     </div>
                  )}
                  {skill.progress === 100 && (
                     <div className="mb-4 flex items-center gap-1.5 text-sm text-[#16A34A] font-medium">
                       <CheckCircle2 size={16} /> Completed
                     </div>
                  )}

                  <button className="w-full py-2.5 rounded-lg border border-[#E5E5E5] group-hover:bg-[#111111] group-hover:text-white group-hover:border-[#111111] text-sm font-medium transition-colors">
                    {skill.progress === 0 ? 'Start Learning →' : skill.progress === 100 ? 'View Certificate' : 'Continue Learning'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="space-y-8 animate-in fade-in relative">
           <div className="grid grid-cols-3 gap-4">
              <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 text-center">
                 <div className="font-jetbrains-mono text-[32px] text-[#111111]">1</div>
                 <div className="text-sm text-[#666] mt-1">Skills Completed</div>
              </div>
              <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 text-center">
                 <div className="font-jetbrains-mono text-[32px] text-[#111111]">12</div>
                 <div className="text-sm text-[#666] mt-1">Hours Learned</div>
              </div>
              <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 text-center relative overflow-hidden">
                 <div className="font-jetbrains-mono text-[32px] text-[#111111] relative z-10">1</div>
                 <div className="text-sm text-[#666] mt-1 relative z-10">Certificates Earned</div>
                 <Award size={64} className="absolute -right-4 -bottom-4 text-[#FAFAFA] z-0" />
              </div>
           </div>

           <div>
              <h3 className="font-medium text-lg mb-4">Completed Skills</h3>
              <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-4 flex items-center justify-between">
                 <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-lg bg-[#E0F2FE] flex items-center justify-center text-[#0284C7]">
                       <Award size={24} />
                    </div>
                    <div>
                       <div className="font-medium">UI/UX Design Basics</div>
                       <div className="text-xs text-[#666] mt-0.5">Completed on Apr 12, 2026</div>
                    </div>
                 </div>
                 <button className="text-sm font-medium border border-[#E5E5E5] hover:bg-[#FAFAFA] px-4 py-2 rounded-lg transition-colors">
                    Download Certificate
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
