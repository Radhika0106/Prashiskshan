"use client";

import { useCollegeData } from "@/context/CollegeDataContext";
import { 
  Sparkles, BookOpen, Users, Briefcase, GraduationCap,
  ChevronRight, AlertTriangle, ArrowRight, Activity, Zap
} from "lucide-react";
import { useState } from "react";

export default function AIRecommendations() {
  const { recommendations } = useCollegeData();
  const [activeCategory, setActiveCategory] = useState<'All' | 'Curriculum' | 'Student' | 'Faculty' | 'Industry'>('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const categories = [
    { id: 'All', icon: Zap, label: 'All Insights' },
    { id: 'Curriculum', icon: BookOpen, label: 'Curriculum Optimization' },
    { id: 'Student', icon: GraduationCap, label: 'Student Development' },
    { id: 'Faculty', icon: Users, label: 'Faculty Optimization' },
    { id: 'Industry', icon: Briefcase, label: 'Industry Engagement' },
  ] as const;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const filteredRecs = recommendations.filter(r => activeCategory === 'All' || r.category === activeCategory);

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-[1000px] mx-auto animate-in fade-in duration-300">
      
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border border-[#E5E5E5] rounded-[16px] p-8 shadow-sm">
         <div className="max-w-2xl">
           <h1 className="font-instrument text-[36px] leading-tight mb-2 flex items-center gap-3">
             <Sparkles className="text-yellow-400" size={32} />
             Intelligent insights powered by your data
           </h1>
           <p className="text-[#666] text-[15px] leading-relaxed">
             Our AI analyzes student performance, industry trends, and curriculum effectiveness 
             to provide you with actionable recommendations designed to improve outcomes and compliance.
           </p>
           <div className="font-jetbrains-mono text-[11px] text-[#999] mt-6">
             Last updated: Today at 09:42 AM
           </div>
         </div>
         
         <div className="shrink-0 flex flex-col items-center">
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`bg-[#111] text-white px-6 py-3 rounded-lg text-[14px] font-medium flex items-center gap-2 transition-all ${isRefreshing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-black/90'}`}
            >
              {isRefreshing ? (
                <><Activity size={16} className="animate-spin" /> Analyzing Data...</>
              ) : (
                <><Sparkles size={16} /> Refresh Insights</>
              )}
            </button>
            <a href="#" className="text-[12px] text-[#666] hover:text-[#111] hover:underline mt-3 transition-colors">
              Review AI Methodology →
            </a>
         </div>
      </div>

      {/* Category Tabs */}
      <div className="flex bg-[#E5E5E5]/50 p-1 rounded-lg overflow-x-auto hide-scrollbar sticky top-16 z-10 backdrop-blur-md">
        {categories.map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 text-[14px] font-medium rounded-md whitespace-nowrap transition-colors ${
                activeCategory === cat.id ? 'bg-white text-[#111] shadow-sm' : 'text-[#666] hover:text-[#111] hover:bg-white/50'
              }`}
            >
              <Icon size={16} />
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Recommendations Feed */}
      <div className="space-y-6">
        {filteredRecs.length === 0 ? (
           <div className="text-center py-20 bg-white border border-[#E5E5E5] border-dashed rounded-[16px]">
             <Sparkles size={40} className="mx-auto text-[#E5E5E5] mb-4" />
             <div className="font-medium text-[#111]">No pending recommendations</div>
             <div className="text-[14px] text-[#666] mt-1">Your data looks optimal for this category.</div>
           </div>
        ) : (
          filteredRecs.map(rec => (
            <div key={rec.id} className="bg-white border border-[#E5E5E5] rounded-[16px] overflow-hidden shadow-sm hover:border-[#111] transition-colors group">
              <div className="p-6 md:p-8">
                 
                 <div className="flex justify-between items-start mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium capitalize border ${
                      rec.impact === 'High Impact' ? 'bg-red-50 text-red-700 border-red-100' : 
                      rec.impact === 'Medium Impact' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                      'bg-green-50 text-green-700 border-green-100'
                    }`}>
                      {rec.impact === 'High Impact' && <AlertTriangle size={12}/>}
                      {rec.impact}
                    </span>
                    <span className="text-[12px] font-jetbrains-mono text-[#999] bg-[#FAFAFA] px-2 py-1 rounded border border-[#E5E5E5]">
                      {rec.category} Engine
                    </span>
                 </div>
  
                 <h2 className="font-instrument text-[28px] leading-tight mb-4 text-[#111]">{rec.title}</h2>
                 
                 <div className="bg-[#F7F6F3] border-l-2 border-[#111] p-4 rounded-r-lg mb-6">
                    <div className="text-[12px] font-medium text-[#666] uppercase tracking-widest mb-1 font-jetbrains-mono">AI Reasoning</div>
                    <p className="text-[15px] text-[#444] leading-relaxed">
                      {rec.reasoning}
                    </p>
                 </div>
                 
                 {rec.impact === 'High Impact' && (
                    <div className="grid grid-cols-3 gap-4 mb-6 pt-4 border-t border-[#E5E5E5]/50">
                       <div>
                          <div className="font-jetbrains-mono text-[24px] text-[#111] leading-none mb-1">64%</div>
                          <div className="text-[12px] text-[#666]">Job postings</div>
                       </div>
                       <div>
                          <div className="font-jetbrains-mono text-[24px] text-[#EF4444] leading-none mb-1">12%</div>
                          <div className="text-[12px] text-[#666]">Student coverage</div>
                       </div>
                       <div>
                          <div className="font-jetbrains-mono text-[24px] text-[#22C55E] leading-none mb-1">+31%</div>
                          <div className="text-[12px] text-[#666]">Placement boost</div>
                       </div>
                    </div>
                 )}
  
                 <div className="flex flex-wrap items-center gap-3">
                    <button className="bg-[#111] text-white px-5 py-2.5 rounded-lg text-[13px] font-medium hover:bg-black/90 transition-colors flex items-center gap-2">
                       {rec.actionLabel}
                    </button>
                    <button className="bg-white border border-[#E5E5E5] text-[#111] px-5 py-2.5 rounded-lg text-[13px] font-medium hover:bg-[#FAFAFA] transition-colors">
                       View Detailed Analysis
                    </button>
                    <div className="w-px h-6 bg-[#E5E5E5] mx-1"></div>
                    <button className="text-[#666] text-[13px] font-medium hover:text-[#EF4444] transition-colors px-3">
                       Dismiss
                    </button>
                 </div>
  
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
