"use client";

import { Intern } from "@/lib/store/internsStore";
import { Star, Sparkles, Building2, GraduationCap, ClipboardCheck } from "lucide-react";
import { format } from "date-fns";

export default function EvaluationsTab({ intern }: { intern: Intern }) {
  if (intern.evaluations.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-white border border-[#E5E5E5] rounded-full flex items-center justify-center mb-4">
          <ClipboardCheck size={24} className="text-[#999]" strokeWidth={1.5} />
        </div>
        <h3 className="font-instrument text-[20px] text-[#111]">No evaluations yet</h3>
        <p className="font-inter text-[14px] text-[#666] mt-1">Evaluations will appear here once submitted by mentors.</p>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div 
            key={star} 
            className={`w-3 h-3 rounded-full ${star <= Math.round(rating) ? 'bg-[#111]' : 'bg-[#E5E5E5]'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {intern.evaluations.map((evalData, idx) => (
        <div key={idx} className="space-y-6">
          <div className="flex items-center gap-4 border-b border-[#111] pb-2">
            <h3 className="font-instrument text-[24px] text-[#111]">{evalData.type} Evaluation</h3>
            <span className="font-jetbrains-mono text-[13px] text-[#666] bg-[#F7F6F3] px-2 py-0.5 rounded">
              {format(new Date(evalData.date), 'MMM d, yyyy')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Faculty Evaluation */}
            <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F7F6F3] rounded-full flex items-center justify-center">
                    <GraduationCap size={20} className="text-[#111]" />
                  </div>
                  <div>
                    <div className="font-inter font-medium text-[14px] text-[#111]">Faculty Mentor</div>
                    <div className="font-inter text-[13px] text-[#666]">{evalData.faculty.name}</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-jetbrains-mono text-[24px] font-medium text-[#111] leading-none">
                    {evalData.faculty.overall.toFixed(1)}
                  </div>
                  <div className="font-inter text-[11px] text-[#999] uppercase tracking-wider mt-1">Overall</div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {Object.entries(evalData.faculty.criteria).map(([criterion, score]) => (
                  <div key={criterion} className="flex items-center justify-between">
                    <span className="font-inter text-[13px] text-[#444]">{criterion}</span>
                    <div className="flex items-center gap-2">
                      {renderStars(score)}
                      <span className="font-jetbrains-mono text-[12px] text-[#666] w-6 text-right">{score}/5</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto space-y-4 pt-4 border-t border-[#E5E5E5]">
                <div>
                  <div className="font-inter font-medium text-[12px] text-[#111] uppercase tracking-wide mb-2">Strengths</div>
                  <ul className="space-y-1">
                    {evalData.faculty.strengths.map((s, i) => (
                      <li key={i} className="font-inter text-[13px] text-[#666] before:content-['•'] before:mr-2 before:text-[#111]">{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-inter font-medium text-[12px] text-[#111] uppercase tracking-wide mb-2">Areas for Improvement</div>
                  <ul className="space-y-1">
                    {evalData.faculty.improvements.map((s, i) => (
                      <li key={i} className="font-inter text-[13px] text-[#666] before:content-['•'] before:mr-2 before:text-[#111]">{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Industry Evaluation */}
            <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F7F6F3] rounded-full flex items-center justify-center">
                    <Building2 size={20} className="text-[#111]" />
                  </div>
                  <div>
                    <div className="font-inter font-medium text-[14px] text-[#111]">Industry Mentor</div>
                    <div className="font-inter text-[13px] text-[#666]">{evalData.industry.name} ({evalData.industry.company})</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-jetbrains-mono text-[24px] font-medium text-[#111] leading-none">
                    {evalData.industry.overall.toFixed(1)}
                  </div>
                  <div className="font-inter text-[11px] text-[#999] uppercase tracking-wider mt-1">Overall</div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {Object.entries(evalData.industry.criteria).map(([criterion, score]) => (
                  <div key={criterion} className="flex items-center justify-between">
                    <span className="font-inter text-[13px] text-[#444]">{criterion}</span>
                    <div className="flex items-center gap-2">
                      {renderStars(score)}
                      <span className="font-jetbrains-mono text-[12px] text-[#666] w-6 text-right">{score}/5</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto space-y-4 pt-4 border-t border-[#E5E5E5]">
                <div>
                  <div className="font-inter font-medium text-[12px] text-[#111] uppercase tracking-wide mb-2">Strengths</div>
                  <ul className="space-y-1">
                    {evalData.industry.strengths.map((s, i) => (
                      <li key={i} className="font-inter text-[13px] text-[#666] before:content-['•'] before:mr-2 before:text-[#111]">{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-inter font-medium text-[12px] text-[#111] uppercase tracking-wide mb-2">Areas for Improvement</div>
                  <ul className="space-y-1">
                    {evalData.industry.improvements.map((s, i) => (
                      <li key={i} className="font-inter text-[13px] text-[#666] before:content-['•'] before:mr-2 before:text-[#111]">{s}</li>
                    ))}
                  </ul>
                </div>
                {evalData.industry.wouldHire && (
                  <div className="pt-2">
                    <div className="font-inter font-medium text-[12px] text-[#111] uppercase tracking-wide mb-1">Full-time Potential</div>
                    <div className="font-inter text-[13px] text-[#666]">Would hire: <span className="text-[#111] font-medium">{evalData.industry.wouldHire}</span></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* AI Comparative Analysis */}
          {evalData.aiComparativeAnalysis && (
            <div className="bg-[#F7F6F3] border border-[#E5E5E5] rounded-[12px] p-6 relative overflow-hidden mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-[#111]" />
                <h4 className="font-instrument text-[18px] text-[#111]">AI Comparative Analysis</h4>
              </div>
              <p className="font-inter text-[14px] text-[#444] leading-relaxed">
                {evalData.aiComparativeAnalysis}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
