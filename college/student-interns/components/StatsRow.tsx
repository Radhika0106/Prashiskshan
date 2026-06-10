"use client";

import { useInternsStore } from "@/lib/store/internsStore";
import { Users, CheckCircle, Star, FileText } from "lucide-react";

export default function StatsRow() {
  const { interns } = useInternsStore();
  
  const activeInterns = interns.filter(i => i.status === 'Active').length;
  const completedThisYear = interns.filter(i => i.status === 'Completed').length;
  
  const ratedInterns = interns.filter(i => i.performanceRating > 0);
  const avgPerformance = ratedInterns.length > 0 
    ? (ratedInterns.reduce((acc, curr) => acc + curr.performanceRating, 0) / ratedInterns.length).toFixed(1)
    : "N/A";

  const stats = [
    { label: "Active Interns", value: activeInterns, icon: Users },
    { label: "Completed This Year", value: completedThisYear, icon: CheckCircle },
    { label: "Avg. Performance", value: `${avgPerformance}/5`, icon: Star },
    { label: "Reports Generated", value: "12", icon: FileText }, // Hardcoded mock for now
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div key={i} className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#F7F6F3] flex items-center justify-center shrink-0">
              <Icon size={20} className="text-[#111]" />
            </div>
            <div>
              <div className="text-[13px] text-[#666] font-inter mb-1">{stat.label}</div>
              <div className="text-[20px] font-instrument text-[#111] leading-none">{stat.value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
