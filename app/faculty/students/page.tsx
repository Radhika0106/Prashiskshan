"use client";

import { useState } from "react";
import { useMockData } from "@/context/MockDataContext";
import { Badge } from "@/components/ui/Badge";
import { Search, ChevronDown, MessageSquare, Briefcase, Eye } from "lucide-react";

export default function FacultyStudents() {
  const { students } = useMockData();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-instrument text-[32px] leading-tight">Students</h1>
          <p className="text-[#666] text-sm mt-1">Manage and track your assigned students' progress.</p>
        </div>
      </div>

      <div className="bg-white border border-[#E5E5E5] rounded-[16px] shadow-sm overflow-hidden flex flex-col">
         {/* Toolbar */}
         <div className="p-4 border-b border-[#E5E5E5] flex flex-col md:flex-row justify-between gap-4 bg-[#FAFAFA]/50">
            <div className="flex-1 max-w-md flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-[#E5E5E5] focus-within:border-[#111111] transition-colors">
               <Search size={16} className="text-[#999]" />
               <input 
                  type="text" 
                  placeholder="Search by name, roll no, or course..." 
                  className="bg-transparent border-none outline-none w-full text-sm"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
               />
            </div>
            
            <div className="flex gap-2">
               <select className="px-3 py-2 text-sm border border-[#E5E5E5] rounded-lg bg-white outline-none cursor-pointer">
                  <option>All Courses</option>
                  <option>B.Tech CS</option>
                  <option>B.Des</option>
               </select>
               <select className="px-3 py-2 text-sm border border-[#E5E5E5] rounded-lg bg-white outline-none cursor-pointer">
                  <option>Any Status</option>
                  <option>Active Internship</option>
                  <option>Searching</option>
               </select>
            </div>
         </div>

         {/* Table */}
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-[#E5E5E5]">
                     <th className="px-6 py-4 text-xs font-medium text-[#666] uppercase">Name & Course</th>
                     <th className="px-6 py-4 text-xs font-medium text-[#666] uppercase">Internship Status</th>
                     <th className="px-6 py-4 text-xs font-medium text-[#666] uppercase">Readiness Score</th>
                     <th className="px-6 py-4 text-xs font-medium text-[#666] uppercase text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-[#E5E5E5]">
                  {filteredStudents.map(s => (
                     <tr key={s.id} className="hover:bg-[#FAFAFA] transition-colors group">
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-center font-medium font-inter group-hover:border-[#111] transition-colors">
                                 {s.name.split(' ').map(n=>n[0]).join('')}
                              </div>
                              <div>
                                 <div className="font-medium text-[15px]">{s.name}</div>
                                 <div className="text-[13px] text-[#666]">{s.course}</div>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           {s.internshipStatus === 'active' ? (
                              <div>
                                 <Badge variant="success" className="mb-1">Active</Badge>
                                 <div className="text-xs text-[#666] flex items-center gap-1 mt-1"><Briefcase size={12}/> Frontend Intern</div>
                              </div>
                           ) : (
                              <div>
                                 <Badge variant="warning" className="mb-1">Searching</Badge>
                                 <div className="text-xs text-[#999] mt-1">Pending placements</div>
                              </div>
                           )}
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <span className="font-jetbrains-mono font-medium">{s.readinessScore}/100</span>
                              <div className="w-24 h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden hidden sm:block">
                                 <div className="h-full bg-[#111111]" style={{ width: `${s.readinessScore}%` }}></div>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex justify-end gap-2">
                              <button className="p-2 text-[#666] hover:text-[#111] hover:bg-[#E5E5E5] rounded transition-colors" title="Message Student">
                                 <MessageSquare size={18} />
                              </button>
                              <button className="p-2 text-[#666] hover:text-[#111] hover:bg-[#E5E5E5] rounded transition-colors" title="View Profile">
                                 <Eye size={18} />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         {filteredStudents.length === 0 && (
            <div className="p-12 text-center text-[#666]">
               No students found matching your criteria.
            </div>
         )}
      </div>
    </div>
  );
}
