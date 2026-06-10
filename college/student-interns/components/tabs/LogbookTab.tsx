"use client";

import { Intern } from "@/lib/store/internsStore";
import { Sparkles, Calendar, Clock, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";
import { format } from "date-fns";

export default function LogbookTab({ intern }: { intern: Intern }) {
  if (intern.logbook.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-white border border-[#E5E5E5] rounded-full flex items-center justify-center mb-4">
          <Calendar size={24} className="text-[#999]" strokeWidth={1.5} />
        </div>
        <h3 className="font-instrument text-[20px] text-[#111]">No logbook entries</h3>
        <p className="font-inter text-[14px] text-[#666] mt-1">This student hasn't submitted any logbook entries yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-8">
        <div className="font-inter text-[14px] text-[#666]">
          Showing <span className="text-[#111] font-medium">{intern.logbook.length}</span> entries
        </div>
        <button className="px-4 py-2 bg-white border border-[#E5E5E5] rounded-[8px] text-[13px] font-inter font-medium text-[#111] hover:bg-[#F7F6F3] transition-colors">
          Download All Entries (PDF)
        </button>
      </div>

      <div className="space-y-6">
        {intern.logbook.map((entry) => (
          <div key={entry.id} className="bg-white border border-[#E5E5E5] rounded-[12px] p-6">
            {/* Entry Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 pb-6 border-b border-[#E5E5E5]">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-jetbrains-mono text-[15px] font-medium text-[#111]">
                    {format(new Date(entry.date), 'MMMM d, yyyy')}
                  </h3>
                  <span className="font-inter text-[11px] bg-[#F7F6F3] text-[#666] px-2 py-0.5 rounded-full border border-[#E5E5E5]">
                    Week {entry.weekNumber} of {intern.durationWeeks}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[#666]">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span className="font-jetbrains-mono text-[13px]">{entry.hours} hrs</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {entry.approvalStatus === 'Approved' ? (
                      <CheckCircle2 size={14} className="text-green-600" />
                    ) : (
                      <AlertCircle size={14} className="text-yellow-600" />
                    )}
                    <span className={`font-inter text-[13px] ${entry.approvalStatus === 'Approved' ? 'text-green-700' : 'text-yellow-700'}`}>
                      {entry.approvalStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Insights Card (Mini) */}
              <div className="bg-[#F7F6F3] rounded-[8px] p-3 w-full md:w-64 border border-[#E5E5E5] shrink-0">
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles size={12} className="text-[#111]" />
                  <span className="font-inter font-medium text-[11px] uppercase tracking-wider text-[#111]">AI Analysis</span>
                </div>
                <div className="space-y-1.5">
                  <div className="font-inter text-[12px] text-[#444]">
                    <span className="text-[#666]">Skills:</span> {entry.aiInsights.skillsIdentified.join(', ')}
                  </div>
                  <div className="font-inter text-[12px] text-[#444]">
                    <span className="text-[#666]">Tone:</span> {entry.aiInsights.sentiment}
                  </div>
                  {entry.aiInsights.growthIndicator && (
                    <div className="font-inter text-[12px] text-[#444] border-t border-[#E5E5E5] pt-1.5 mt-1.5">
                      <span className="text-[#666]">Growth:</span> {entry.aiInsights.growthIndicator}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Entry Content */}
            <div className="space-y-6">
              <div>
                <h4 className="font-inter font-medium text-[13px] text-[#111] mb-2">Tasks Completed</h4>
                <ul className="space-y-1">
                  {entry.tasksCompleted.map((task, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#CCC] shrink-0 mt-1.5" />
                      <span className="font-inter text-[14px] text-[#444]">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-inter font-medium text-[13px] text-[#111] mb-2">Learnings</h4>
                <p className="font-inter text-[14px] text-[#444] leading-relaxed">
                  {entry.learnings}
                </p>
              </div>

              <div>
                <h4 className="font-inter font-medium text-[13px] text-[#111] mb-2">Challenges</h4>
                <p className="font-inter text-[14px] text-[#444] leading-relaxed">
                  {entry.challenges}
                </p>
              </div>
            </div>

            {/* Mentor Feedback */}
            {entry.mentorFeedback && (
              <div className="mt-6 pt-6 border-t border-[#E5E5E5]">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare size={16} className="text-[#111]" />
                  <h4 className="font-inter font-medium text-[14px] text-[#111]">Mentor Feedback</h4>
                  <span className="font-inter text-[12px] text-[#666] ml-auto">
                    {entry.mentorFeedback.name} • {format(new Date(entry.mentorFeedback.timestamp), 'MMM d, h:mm a')}
                  </span>
                </div>
                <div className="bg-[#F7F6F3] rounded-[8px] p-4 text-[#444] font-inter text-[14px] italic border-l-2 border-[#111]">
                  "{entry.mentorFeedback.text}"
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
