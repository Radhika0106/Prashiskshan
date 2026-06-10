"use client";

import { useState } from "react";
import { useIndustryStore, College } from "@/lib/store/industryStore";
import { 
  Building, MapPin, Users, Award, ChevronRight, X, 
  Download, Send, Calendar, Sparkles, Filter, Search
} from "lucide-react";

export default function CollegeNetworkPage() {
  const { colleges } = useIndustryStore();
  const [search, setSearch] = useState("");
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);

  const filtered = colleges.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-instrument text-3xl tracking-tight text-[#111111] mb-2">College Network</h1>
          <p className="text-[#666666] font-inter text-sm">Manage partner colleges and discover new talent pools.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
            <input 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search colleges..."
              className="pl-9 pr-4 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm focus:outline-none focus:border-[#111111] w-64"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        <select className="px-3 py-1.5 border border-[#E5E5E5] rounded-lg font-inter text-sm bg-white focus:outline-none focus:border-[#111111]">
          <option>All Locations</option>
          <option>Bangalore</option>
          <option>Delhi</option>
        </select>
        <select className="px-3 py-1.5 border border-[#E5E5E5] rounded-lg font-inter text-sm bg-white focus:outline-none focus:border-[#111111]">
          <option>All Statuses</option>
          <option>Active MoU</option>
          <option>MoU Expiring</option>
        </select>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F3F4F6] text-[#666666] rounded-lg text-sm font-medium hover:bg-[#E5E5E5] whitespace-nowrap">
          <Filter size={14} /> More Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
        {filtered.map(college => (
          <div key={college.id} className="bg-white p-5 rounded-2xl border border-[#E5E5E5] hover:border-[#111111] transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#F3F4F6] flex items-center justify-center">
                  <Building size={20} className="text-[#666666]" />
                </div>
                <span className={`px-2 py-1 rounded font-mono text-[11px] ${
                  college.status === 'Active MoU' ? 'bg-[#D1FAE5] text-[#065F46]' :
                  college.status === 'MoU Expiring Soon' ? 'bg-[#FEF9C3] text-[#854D0E]' :
                  'bg-[#F3F4F6] text-[#374151]'
                }`}>
                  {college.status}
                </span>
              </div>
              <h3 className="font-instrument text-xl text-[#111111] mb-1">{college.name}</h3>
              <p className="text-xs text-[#666666] flex items-center gap-1 mb-4">
                <MapPin size={12} /> {college.location}
              </p>

              <div className="grid grid-cols-3 gap-2 mb-4 bg-[#F7F6F3] p-3 rounded-xl border border-[#E5E5E5]">
                <div className="text-center">
                  <div className="text-[10px] text-[#666666] mb-1">Students</div>
                  <div className="font-mono text-sm font-medium">{college.studentsInNetwork}</div>
                </div>
                <div className="text-center border-x border-[#E5E5E5]">
                  <div className="text-[10px] text-[#666666] mb-1">Apps</div>
                  <div className="font-mono text-sm font-medium">{college.applicationsReceived}</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-[#666666] mb-1">Hired</div>
                  <div className="font-mono text-sm font-medium">{college.internsHired}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-1 mb-4">
                <span className="text-xs font-medium text-[#111111]">Avg. Quality:</span>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(star => (
                    <Award key={star} size={12} className={star <= parseFloat(college.avgQuality) ? "text-[#111111]" : "text-[#E5E5E5]"} />
                  ))}
                </div>
                <span className="text-xs font-mono text-[#666666] ml-1">{college.avgQuality}</span>
              </div>
            </div>

            <button 
              onClick={() => setSelectedCollege(college)}
              className="w-full py-2 border border-[#E5E5E5] rounded-lg text-sm font-medium hover:bg-[#F9FAFB] transition-colors"
            >
              View Details
            </button>
          </div>
        ))}

        {/* AI Outreach Suggestions */}
        <div className="bg-[#111111] text-white p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={20} className="text-[#D1FAE5]" />
              <h3 className="font-instrument text-2xl tracking-tight">Opportunities</h3>
            </div>
            <p className="font-inter text-sm text-white/80 leading-relaxed mb-6">
              AI suggests partnering with <strong>National Institute of Technology, Surathkal</strong> based on strong alignment with your data science hiring needs.
            </p>
            <div className="bg-white/10 p-3 rounded-xl mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white/80">Match Score</span>
                <span className="font-mono text-[#D1FAE5]">88%</span>
              </div>
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-[#D1FAE5] w-[88%]"></div>
              </div>
            </div>
          </div>
          <button className="w-full py-2 bg-white text-[#111111] rounded-lg text-sm font-medium hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
            Initiate Partnership <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {selectedCollege && (
        <CollegeDetailModal college={selectedCollege} onClose={() => setSelectedCollege(null)} />
      )}
    </div>
  );
}

function CollegeDetailModal({ college, onClose }: { college: College, onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex justify-end">
      <div className="w-full max-w-3xl bg-white h-full overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300">
        
        <div className="sticky top-0 bg-white border-b border-[#E5E5E5] px-8 py-6 flex items-start justify-between z-10">
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#F3F4F6] flex items-center justify-center">
              <Building size={24} className="text-[#666666]" />
            </div>
            <div>
              <h2 className="font-instrument text-3xl tracking-tight text-[#111111]">{college.name}</h2>
              <div className="text-sm text-[#666666] mt-1 flex items-center gap-1">
                <MapPin size={14} /> {college.location} · Established 1960
              </div>
              <div className="mt-2">
                <span className={`px-2 py-0.5 rounded font-mono text-[10px] ${
                  college.status === 'Active MoU' ? 'bg-[#D1FAE5] text-[#065F46]' :
                  college.status === 'MoU Expiring Soon' ? 'bg-[#FEF9C3] text-[#854D0E]' :
                  'bg-[#F3F4F6] text-[#374151]'
                }`}>
                  {college.status}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[#666666] hover:bg-[#F3F4F6] rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-8 bg-[#F7F6F3] min-h-screen">
          
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm font-medium hover:bg-[#F9FAFB]">
              <Calendar size={16} /> Schedule Visit
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm font-medium hover:bg-[#F9FAFB]">
              <Building size={16} /> Post Exclusive Role
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white rounded-lg text-sm font-medium hover:bg-black/90">
              <Send size={16} /> Message Placement Cell
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5]">
              <h3 className="font-instrument text-xl mb-4">MoU Details</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-[#666666] mb-1">Status</div>
                  <div className="font-medium">{college.status}</div>
                </div>
                <div>
                  <div className="text-sm text-[#666666] mb-1">Validity</div>
                  <div className="font-medium">Jan 2024 - Dec 2026</div>
                </div>
                <button className="w-full mt-2 py-2 border border-[#E5E5E5] rounded-lg text-sm font-medium hover:bg-[#F9FAFB] flex items-center justify-center gap-2">
                  <Download size={16} /> Download MoU
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5]">
              <h3 className="font-instrument text-xl mb-4">Contact Person</h3>
              <div className="space-y-4">
                <div>
                  <div className="font-medium text-[#111111]">Dr. Sharma</div>
                  <div className="text-sm text-[#666666]">Head of Placement Cell</div>
                </div>
                <div className="text-sm font-mono text-[#666666]">placements@example.edu</div>
                <div className="text-sm font-mono text-[#666666]">+91 98765 43210</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5]">
            <h3 className="font-instrument text-xl mb-4">Student Pipeline Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-[#F7F6F3] rounded-xl border border-[#E5E5E5]">
                <div className="text-xs text-[#666666] mb-1">Total Students</div>
                <div className="font-mono text-2xl text-[#111111]">{college.studentsInNetwork}</div>
              </div>
              <div className="p-4 bg-[#F7F6F3] rounded-xl border border-[#E5E5E5]">
                <div className="text-xs text-[#666666] mb-1">Applications</div>
                <div className="font-mono text-2xl text-[#111111]">{college.applicationsReceived}</div>
              </div>
              <div className="p-4 bg-[#F7F6F3] rounded-xl border border-[#E5E5E5]">
                <div className="text-xs text-[#666666] mb-1">Shortlist Rate</div>
                <div className="font-mono text-2xl text-[#111111]">24%</div>
              </div>
              <div className="p-4 bg-[#F7F6F3] rounded-xl border border-[#E5E5E5]">
                <div className="text-xs text-[#666666] mb-1">Hire Rate</div>
                <div className="font-mono text-2xl text-[#111111]">{((college.internsHired / Math.max(college.applicationsReceived, 1)) * 100).toFixed(1)}%</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
