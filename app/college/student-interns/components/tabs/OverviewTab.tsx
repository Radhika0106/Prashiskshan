"use client";

import { Intern } from "@/lib/store/internsStore";
import { Sparkles, Building2, MapPin, Users, Briefcase, CalendarCheck } from "lucide-react";

export default function OverviewTab({ intern }: { intern: Intern }) {
  const { overview } = intern;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Logbook Entries", value: `${overview.totalLogbookEntries}/${overview.expectedEntries}` },
          { label: "Tasks Completed", value: overview.tasksCompleted },
          { label: "Skills Acquired", value: overview.skillsAcquired },
          { label: "Attendance", value: `${overview.attendanceRate}%` },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-[#E5E5E5] rounded-[12px] p-4">
            <div className="text-[13px] text-[#666] font-inter mb-1">{stat.label}</div>
            <div className="text-[20px] font-instrument text-[#111] leading-none">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* AI Summary */}
          <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F7F6F3] to-transparent rounded-bl-full pointer-events-none opacity-50" />
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} className="text-[#111]" />
              <h3 className="font-instrument text-[20px] text-[#111]">Internship Summary</h3>
            </div>
            <p className="font-inter text-[15px] text-[#444] leading-relaxed">
              {overview.aiSummary}
            </p>
            <div className="mt-4 pt-4 border-t border-[#E5E5E5] font-jetbrains-mono text-[11px] text-[#999]">
              AI-generated analysis based on logbooks and evaluations
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6">
            <h3 className="font-instrument text-[20px] text-[#111] mb-6">Learning Outcomes</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-inter font-medium text-[14px] text-[#111] mb-3">Technical Skills</h4>
                <ul className="space-y-2">
                  {overview.learningOutcomes.technical.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111] shrink-0 mt-1.5" />
                      <span className="font-inter text-[14px] text-[#444]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-inter font-medium text-[14px] text-[#111] mb-3">Soft Skills</h4>
                <ul className="space-y-2">
                  {overview.learningOutcomes.soft.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111] shrink-0 mt-1.5" />
                      <span className="font-inter text-[14px] text-[#444]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-inter font-medium text-[14px] text-[#111] mb-3">Domain Knowledge</h4>
                <ul className="space-y-2">
                  {overview.learningOutcomes.domain.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111] shrink-0 mt-1.5" />
                      <span className="font-inter text-[14px] text-[#444]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Role Details */}
        <div className="space-y-4">
          <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6">
            <h3 className="font-instrument text-[20px] text-[#111] mb-4">Company & Role</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#F7F6F3] flex items-center justify-center shrink-0">
                  <Building2 size={20} className="text-[#666]" />
                </div>
                <div>
                  <div className="font-inter font-medium text-[14px] text-[#111]">{intern.companyName}</div>
                  <div className="font-inter text-[12px] text-[#666]">{overview.industrySector}</div>
                </div>
              </div>

              <div className="h-px bg-[#E5E5E5]" />

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#444]">
                  <Briefcase size={16} className="text-[#999]" />
                  <span className="font-inter text-[13px]">{intern.roleTitle}</span>
                </div>
                <div className="flex items-center gap-3 text-[#444]">
                  <MapPin size={16} className="text-[#999]" />
                  <span className="font-inter text-[13px]">{intern.location}</span>
                </div>
                <div className="flex items-center gap-3 text-[#444]">
                  <Users size={16} className="text-[#999]" />
                  <span className="font-inter text-[13px]">Team of {overview.teamSize}</span>
                </div>
                <div className="flex items-center gap-3 text-[#444]">
                  <CalendarCheck size={16} className="text-[#999]" />
                  <span className="font-inter text-[13px]">{overview.workMode}</span>
                </div>
              </div>

              <div className="h-px bg-[#E5E5E5]" />

              <div>
                <div className="font-inter text-[12px] text-[#999] mb-2 uppercase tracking-wide">Industry Mentor</div>
                <div className="font-inter font-medium text-[14px] text-[#111]">{overview.mentorName}</div>
                <div className="font-inter text-[12px] text-[#666]">{overview.mentorDesignation}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
