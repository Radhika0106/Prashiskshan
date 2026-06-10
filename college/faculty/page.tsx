"use client";

import { useCollegeData } from "@/context/CollegeDataContext";
import { useState } from "react";
import { 
  Users, Search, Filter, BookOpen, Star, MessageSquare, 
  UserPlus, ExternalLink, Activity, Calendar
} from "lucide-react";
import { Faculty } from "@/context/CollegeDataContext";

export default function FacultyManagement() {
  const { faculty } = useCollegeData();
  const [activeTab, setActiveTab] = useState<'directory' | 'mentorship'>('directory');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);

  const filteredFaculty = faculty.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.department.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1400px] mx-auto animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2 shrink-0">
        <div>
          <h1 className="font-instrument text-[32px] leading-none mb-1">Faculty & Mentors</h1>
          <p className="text-[#666] text-[14px]">Manage faculty profiles, course allocations, and mentorship workloads.</p>
        </div>
        
        <div className="bg-[#E5E5E5]/50 p-1 rounded-[10px] flex gap-1">
          <button 
            onClick={() => setActiveTab('directory')}
            className={`px-6 py-2 rounded-[8px] text-[13px] font-medium transition-all ${
              activeTab === 'directory' ? 'bg-white text-[#111] shadow-sm' : 'text-[#666] hover:text-[#111]'
            }`}
          >
            Faculty Directory
          </button>
          <button 
            onClick={() => setActiveTab('mentorship')}
            className={`px-6 py-2 rounded-[8px] text-[13px] font-medium transition-all ${
              activeTab === 'mentorship' ? 'bg-white text-[#111] shadow-sm' : 'text-[#666] hover:text-[#111]'
            }`}
          >
            Mentorship Management
          </button>
        </div>
      </div>

      {activeTab === 'directory' && (
        <div className="space-y-6 animate-in slide-in-from-right-4">
           {/* Filters */}
           <div className="flex flex-wrap gap-3">
              <div className="flex items-center w-full max-w-sm bg-white rounded-lg px-3 py-2 border border-[#E5E5E5] focus-within:border-[#111] transition-all shadow-sm">
                <Search size={16} className="text-[#999] mr-2 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search by name, ID, or specialization..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none w-full text-[13px] font-inter" 
                />
              </div>
              <select className="bg-white border border-[#E5E5E5] rounded-lg px-3 py-2 text-[13px] outline-none hover:border-[#111] shadow-sm">
                <option>All Departments</option>
                <option>CSE</option>
                <option>ECE</option>
              </select>
              <select className="bg-white border border-[#E5E5E5] rounded-lg px-3 py-2 text-[13px] outline-none hover:border-[#111] shadow-sm">
                <option>All Designations</option>
                <option>Professor</option>
                <option>Associate Professor</option>
                <option>Assistant Professor</option>
              </select>
           </div>

           {/* Grid */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredFaculty.map(f => (
                <div key={f.id} className="bg-white border border-[#E5E5E5] rounded-[16px] overflow-hidden shadow-sm hover:border-[#111] transition-all group flex flex-col">
                   <div className="p-5 flex-1 pt-6 text-center relative">
                      <div className="absolute top-4 right-4 text-[10px] bg-[#F7F6F3] text-[#666] px-2 py-0.5 rounded uppercase tracking-wider font-medium">{f.department}</div>
                      
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-white shadow-sm rounded-full flex items-center justify-center font-instrument text-2xl text-blue-900 mb-3">
                        {f.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      
                      <h3 className="font-medium text-[16px] text-[#111] leading-tight mb-1">{f.name}</h3>
                      <div className="text-[13px] text-[#666] mb-4">{f.designation}</div>

                      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-5">
                         {f.specializations.map(spec => (
                           <span key={spec} className="px-2 py-1 bg-[#FAFAFA] border border-[#E5E5E5] text-[10px] text-[#444] rounded uppercase tracking-wide">
                             {spec}
                           </span>
                         ))}
                      </div>

                      <div className="flex justify-between border-t border-[#E5E5E5] pt-4 mt-auto">
                         <div className="text-center w-full border-r border-[#E5E5E5]">
                            <div className="font-jetbrains-mono text-[16px] font-medium text-[#111]">{f.menteesCount}</div>
                            <div className="text-[10px] text-[#999] uppercase tracking-wider mt-0.5">Mentees</div>
                         </div>
                         <div className="text-center w-full border-r border-[#E5E5E5]">
                            <div className="font-jetbrains-mono text-[16px] font-medium text-[#111]">{f.coursesTeaching}</div>
                            <div className="text-[10px] text-[#999] uppercase tracking-wider mt-0.5">Courses</div>
                         </div>
                         <div className="text-center w-full">
                            <div className="font-jetbrains-mono text-[16px] font-medium text-[#111] flex items-center justify-center gap-1">
                              {f.rating} <Star fill="#F59E0B" className="text-[#F59E0B]" size={12}/>
                            </div>
                            <div className="text-[10px] text-[#999] uppercase tracking-wider mt-0.5">Rating</div>
                         </div>
                      </div>
                   </div>
                   
                   <div className="mt-auto px-4 py-3 bg-[#FAFAFA] border-t border-[#E5E5E5] flex gap-2">
                     <button onClick={() => setSelectedFaculty(f)} className="flex-1 py-1.5 text-[12px] font-medium text-[#111] border border-[#E5E5E5] rounded bg-white hover:bg-[#F3F4F6] transition-colors flex items-center justify-center gap-1">
                       Profile <ExternalLink size={12}/>
                     </button>
                     <button className="flex-1 py-1.5 text-[12px] font-medium text-white border border-[#111] rounded bg-[#111] hover:bg-black/90 transition-colors flex items-center justify-center gap-1">
                       <MessageSquare size={12}/> Message
                     </button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}

      {activeTab === 'mentorship' && (
        <div className="space-y-6 animate-in slide-in-from-right-4">
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 shadow-sm">
                <div className="text-[12px] font-medium text-[#666] mb-1 uppercase tracking-wide">Total Mentorships</div>
                <div className="font-jetbrains-mono text-[28px] text-[#111] leading-none mb-1">482</div>
                <div className="text-[12px] text-[#666]">Active student assignments</div>
              </div>
              <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 shadow-sm border-l-4 border-l-amber-500">
                <div className="text-[12px] font-medium text-[#666] mb-1 uppercase tracking-wide">Avg Load</div>
                <div className="font-jetbrains-mono text-[28px] text-[#111] leading-none mb-1">18.5</div>
                <div className="text-[12px] text-amber-700 font-medium">Students per faculty (High)</div>
              </div>
              <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 shadow-sm border-l-4 border-l-red-500">
                <div className="text-[12px] font-medium text-[#666] mb-1 uppercase tracking-wide">Unassigned</div>
                <div className="font-jetbrains-mono text-[28px] text-[#111] leading-none mb-1">24</div>
                <div className="text-[12px] text-red-600 font-medium">Require immediate allocation</div>
              </div>
              <div className="bg-[#111] border border-[#111] rounded-[12px] p-5 shadow-sm flex flex-col justify-center items-center group cursor-pointer text-white hover:bg-black/90">
                <Activity size={24} className="mb-2 text-yellow-400 group-hover:scale-110 transition-transform"/>
                <div className="font-medium text-[14px]">Auto-Balance Load</div>
                <div className="text-[11px] text-[#999] mt-1 text-center">Run AI rebalancing algorithm</div>
              </div>
            </div>

            {/* Load Chart Dummy */}
            <div className="bg-white border border-[#E5E5E5] rounded-[12px] shadow-sm p-6 overflow-x-auto">
               <h3 className="font-instrument text-[20px] mb-6">Workload Distribution</h3>
               <div className="space-y-4 min-w-[600px]">
                  {faculty.map(f => (
                     <div key={f.id} className="flex items-center gap-4">
                       <div className="w-32 shrink-0 text-[13px] font-medium text-[#111] truncate">{f.name}</div>
                       <div className="flex-1 bg-[#F3F4F6] h-6 rounded overflow-hidden flex relative">
                          {/* Ideal zone indicator */}
                          <div className="absolute left-[30%] right-[60%] top-0 bottom-0 bg-green-500/10 border-x border-green-500/30"></div>
                          <div 
                            className={`h-full flex items-center px-2 text-[10px] font-jetbrains-mono text-white ${f.menteesCount > 20 ? 'bg-red-500' : f.menteesCount < 10 ? 'bg-amber-500' : 'bg-green-500'}`} 
                            style={{ width: `${(f.menteesCount / 40) * 100}%` }}
                          >
                             {f.menteesCount}
                          </div>
                       </div>
                       <button className="text-[11px] text-[#3B82F6] hover:underline font-medium shrink-0">View List</button>
                     </div>
                  ))}
               </div>
            </div>

        </div>
      )}

      {/* Basic modal stub for selected faculty */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-2xl rounded-[16px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
             <div className="p-4 border-b border-[#E5E5E5] flex justify-between items-center bg-[#FAFAFA]">
                <h3 className="font-instrument text-2xl">Faculty Profile</h3>
                <button onClick={() => setSelectedFaculty(null)} className="p-1 hover:bg-[#E5E5E5] rounded">✕</button>
             </div>
             <div className="p-6 md:p-8 flex gap-6 items-start">
                <div className="w-32 h-32 shrink-0 bg-[#F3F4F6] rounded-full flex items-center justify-center font-instrument text-4xl text-[#999]">
                  {selectedFaculty.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <div>
                   <h2 className="font-instrument text-[32px] leading-tight mb-1">{selectedFaculty.name}</h2>
                   <div className="text-[15px] text-[#666] mb-4">{selectedFaculty.designation} • {selectedFaculty.department} Department</div>
                   <div className="text-[13px] text-[#444] leading-relaxed max-w-lg mb-6">
                     Dr. {selectedFaculty.name.split(' ')[1]} has been a key member of the college since {selectedFaculty.joinDate.split('-')[0]}, 
                     specializing in {selectedFaculty.specializations.join(' and ')}.
                   </div>
                   <div className="flex gap-3">
                     <button className="bg-[#111] text-white px-5 py-2 rounded-lg text-[13px] font-medium hover:bg-black/90">Assign Students</button>
                     <button className="bg-white border border-[#E5E5E5] text-[#111] px-5 py-2 rounded-lg text-[13px] font-medium hover:bg-[#FAFAFA]">View Feedback</button>
                   </div>
                </div>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
