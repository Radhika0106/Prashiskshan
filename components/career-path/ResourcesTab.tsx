"use client";

import { useState } from "react";
import { Search, Bookmark, ExternalLink, Filter, Sparkles, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { LearningPath } from "@/lib/engines/types";

export default function ResourcesTab({ path }: { path: LearningPath }) {
  const [filterType, setFilterType] = useState('All');
  const [savedOnly, setSavedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Construct resources list dynamically from path phases
  const resourcesList = path.phases.flatMap(phase =>
    phase.resources.map((res, idx) => ({
      id: `res-${phase.phase}-${idx}`,
      title: res.title,
      type: res.type === 'certification' ? 'Certification' : 'Course',
      platform: res.provider,
      duration: 'Self-paced',
      price: res.type === 'certification' ? 'Paid' : 'Free',
      status: 'not-started',
      saved: idx === 0,
      aiInsight: `Builds skills in Phase ${phase.phase} to cover: ${phase.skills.join(', ')}.`,
      url: res.url
    }))
  );

  const filteredResources = resourcesList.filter(r => {
    if (filterType !== 'All' && r.type !== filterType) return false;
    if (savedOnly && !r.saved) return false;
    if (searchQuery && !r.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'Course': return <Badge variant="info">{type}</Badge>;
      case 'Certification': return <Badge variant="warning">{type}</Badge>;
      case 'Project': return <Badge variant="success">{type}</Badge>;
      default: return <Badge variant="neutral">{type}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* AI Recommendations */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={20} className="text-[#111]" />
          <h3 className="font-instrument text-[24px]">Top Recommended Resources</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resourcesList.slice(0, 3).map(r => (
            <div key={`ai-${r.id}`} className="p-4 bg-[#F7F6F3] border border-[#E5E5E5] rounded-xl flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-start justify-between mb-2">
                  {getTypeBadge(r.type)}
                  <div className="text-[11px] font-medium px-2 py-0.5 bg-white border border-[#E5E5E5] rounded text-[#111]">
                    {r.price}
                  </div>
                </div>
                <h4 className="font-medium text-[15px] mb-1">{r.title}</h4>
                <div className="text-[12px] text-[#666] mb-3">{r.platform} • {r.duration}</div>
                <p className="text-[13px] text-[#111] italic leading-relaxed">
                  "{r.aiInsight}"
                </p>
              </div>
              <a 
                href={r.url} 
                target="_blank" 
                rel="noreferrer"
                className="w-full mt-4 py-2 bg-white border border-[#E5E5E5] rounded-lg text-[13px] font-medium hover:border-[#111] transition-colors text-center block"
              >
                Go to Resource
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Library */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="font-instrument text-[24px]">Resource Library</h3>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white border border-[#E5E5E5] rounded-lg px-3 py-2 w-full sm:w-64 shadow-sm">
              <Search size={16} className="text-[#999] mr-2" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-[13px]"
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {['All', 'Course', 'Certification'].map(type => (
            <button 
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-full text-[13px] font-medium border transition-colors ${
                filterType === type 
                  ? 'bg-[#111] text-white border-[#111]' 
                  : 'bg-white text-[#666] border-[#E5E5E5] hover:border-[#111] hover:text-[#111]'
              }`}
            >
              {type}
            </button>
          ))}
          <div className="w-px h-6 bg-[#E5E5E5] mx-2"></div>
          <button 
            onClick={() => setSavedOnly(!savedOnly)}
            className={`px-3 py-1.5 rounded-full text-[13px] font-medium border transition-colors flex items-center gap-1.5 ${
              savedOnly 
                ? 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]' 
                : 'bg-white text-[#666] border-[#E5E5E5] hover:border-[#111] hover:text-[#111]'
            }`}
          >
            <Bookmark size={14} className={savedOnly ? 'fill-[#1D4ED8]' : ''} /> Starred
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(r => (
            <div key={r.id} className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden hover:border-[#111] transition-colors group flex flex-col shadow-sm">
              <div className="h-24 bg-[#F7F6F3] flex items-center justify-center p-4">
                <div className="w-full h-full bg-white rounded border border-[#E5E5E5] flex items-center justify-center">
                  <span className="font-instrument text-[18px] text-[#999] opacity-75">{r.platform}</span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                  {getTypeBadge(r.type)}
                </div>
                <h4 className="font-medium text-[16px] mb-1 line-clamp-2">{r.title}</h4>
                <p className="text-[12px] text-[#666] mb-4">{r.aiInsight}</p>
                
                <div className="mt-auto pt-4 border-t border-[#E5E5E5] flex items-center justify-between">
                  <div className="text-[12px] font-medium px-2 py-0.5 bg-[#F7F6F3] rounded text-[#111]">
                    {r.price}
                  </div>
                  <a 
                    href={r.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[13px] font-medium text-[#111] hover:underline flex items-center"
                  >
                    Start <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
