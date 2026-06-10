"use client";

import { useState } from "react";
import { useMockData, Application } from "@/context/MockDataContext";
import { Badge } from "@/components/ui/Badge";
import { Search, MapPin, Briefcase } from "lucide-react";

const COLUMNS = ['Pending', 'Reviewing', 'Shortlisted', 'Interview', 'Offer', 'Accepted', 'Rejected'];

export default function KanbanBoard() {
  const { applications, students, internships, updateApplicationStatus } = useMockData();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("applicationId", id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e: React.DragEvent, status: Application['status'] | string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("applicationId");
    // Only map to supported status in MockData ('Pending' | 'Shortlisted' | 'Rejected' | 'Accepted') for simplicity
    // If it's a sub-status, we might map it to a broader state
    let newStatus: Application['status'] = 'Pending';
    if (status === 'Pending' || status === 'Reviewing') newStatus = 'Pending';
    if (status === 'Shortlisted' || status === 'Interview' || status === 'Offer') newStatus = 'Shortlisted';
    if (status === 'Accepted') newStatus = 'Accepted';
    if (status === 'Rejected') newStatus = 'Rejected';
    
    updateApplicationStatus(id, newStatus);
  };

  const getApplicationsByCol = (colStatus: string) => {
    return applications.filter(a => {
      // Mock Data has 4 states, Kanban has 7. Map them visually for the demo.
      if (colStatus === 'Pending' && a.status === 'Pending') return true;
      if (colStatus === 'Shortlisted' && a.status === 'Shortlisted') return true;
      if (colStatus === 'Accepted' && a.status === 'Accepted') return true;
      if (colStatus === 'Rejected' && a.status === 'Rejected') return true;
      return false;
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <h1 className="font-instrument text-[32px] leading-tight">Applications</h1>
          <p className="text-[#666] text-sm mt-1">Drag and drop candidates to update their status.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-[#E5E5E5] focus-within:border-[#111111] transition-colors w-full md:w-64 shrink-0">
           <Search size={16} className="text-[#999]" />
           <input 
              type="text" 
              placeholder="Search candidate..." 
              className="bg-transparent border-none outline-none w-full text-sm"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
           />
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
         {COLUMNS.map(col => {
            const colApps = getApplicationsByCol(col);
            return (
               <div 
                  key={col} 
                  className="w-[300px] shrink-0 flex flex-col bg-[#FAFAFA] rounded-[12px] border border-[#E5E5E5]"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, col)}
               >
                  <div className="p-3 border-b border-[#E5E5E5] flex items-center justify-between font-medium text-sm text-[#111]">
                     {col}
                     <span className="bg-[#E5E5E5] text-[#666] px-2 py-0.5 rounded text-xs">{colApps.length}</span>
                  </div>
                  
                  <div className="p-3 flex-1 overflow-y-auto space-y-3">
                     {colApps.map(app => {
                        const student = students.find(s => s.id === app.studentId);
                        const internship = internships.find(i => i.id === app.internshipId);
                        if(!student || !internship) return null;

                        return (
                           <div 
                              key={app.id} 
                              draggable
                              onDragStart={(e) => handleDragStart(e, app.id)}
                              className="bg-white p-3 rounded-lg border border-[#E5E5E5] shadow-sm cursor-grab active:cursor-grabbing hover:border-[#111] transition-colors"
                           >
                              <div className="flex justify-between items-start mb-2">
                                 <div className="font-medium text-[15px] leading-tight">{student.name}</div>
                                 <Badge variant={student.readinessScore > 80 ? 'success' : 'neutral'}>{student.readinessScore}/100</Badge>
                              </div>
                              <div className="text-xs text-[#666] mb-1">{student.college}</div>
                              <div className="flex items-center gap-1.5 text-xs text-[#444] font-medium mt-2 pt-2 border-t border-[#E5E5E5]/50">
                                 <Briefcase size={12} className="text-[#999]"/> {internship.title}
                              </div>
                           </div>
                        )
                     })}
                  </div>
               </div>
            )
         })}
      </div>
    </div>
  );
}
