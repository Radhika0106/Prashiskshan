"use client";

import { useState } from "react";
import { useCollegeData } from "@/context/CollegeDataContext";
import { 
  BookOpen, Plus, FileText, CheckCircle, 
  MessageSquare, MoreVertical, Edit3, Download, BarChart2
} from "lucide-react";
import { 
  DndContext, closestCenter, KeyboardSensor, 
  PointerSensor, useSensor, useSensors, DragEndEvent
} from '@dnd-kit/core';
import { 
  arrayMove, SortableContext, sortableKeyboardCoordinates, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Kanban Sortable Item Component
function SortableProposalCard({ proposal }: { proposal: any }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: proposal.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  return (
    <div 
      ref={setNodeRef} style={style} {...attributes} {...listeners}
      className={`bg-white border ${isDragging ? 'border-[#111] shadow-md' : 'border-[#E5E5E5]'} rounded-[12px] p-4 cursor-grab active:cursor-grabbing hover:border-[#111] transition-colors relative group`}
    >
      <div className="flex justify-between items-start mb-2">
         <span className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded ${
           proposal.type === 'New Course' ? 'bg-indigo-50 text-indigo-700' :
           proposal.type === 'Modify Existing' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
         }`}>
            {proposal.type}
         </span>
         <span className={`w-2 h-2 rounded-full ${proposal.priority === 'High' ? 'bg-red-500' : proposal.priority === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'}`} title={`${proposal.priority} Priority`}></span>
      </div>
      <h4 className="font-instrument text-[18px] leading-tight mb-2">{proposal.title}</h4>
      <p className="text-[13px] text-[#666] line-clamp-2 mb-4 leading-relaxed">{proposal.description}</p>
      
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#E5E5E5]">
         <div className="text-[11px] text-[#999] font-medium">{proposal.proposedBy}</div>
         <div className="flex items-center gap-1 text-[#666] text-[12px]">
            <MessageSquare size={14} /> {proposal.commentsCount}
         </div>
      </div>
    </div>
  );
}

export default function CurriculumManagement() {
  const { courses, curriculumProposals } = useCollegeData();
  const [activeTab, setActiveTab] = useState('active');
  const [activeDept, setActiveDept] = useState('CSE');

  // Kanban State
  const [proposals, setProposals] = useState(curriculumProposals);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // Simplified sorting logic within columns for mockup 
    // In reality, this would transition items between "Status" groups.
    setProposals((items) => {
      const oldIndex = items.findIndex(i => i.id === active.id);
      const newIndex = items.findIndex(i => i.id === over.id);
      
      // If dropping into a different column zone (mock approach)
      let newItems = arrayMove(items, oldIndex, newIndex);
      
      // Find the status of the item we dropped it near and adopt it
      const targetItem = newItems[newIndex];
      if(targetItem && targetItem.status !== items[oldIndex].status) {
         newItems[newIndex].status = targetItem.status;
      }
      return [...newItems];
    });
  };

  const getCardsByStatus = (status: string) => proposals.filter(p => p.status === status);

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto h-[min(calc(100vh-4rem),900px)] flex flex-col animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 shrink-0">
        <div>
          <h1 className="font-instrument text-[32px] leading-none mb-1">Curriculum Management</h1>
          <p className="text-[#666] text-[14px]">Manage active syllables and improvement proposals.</p>
        </div>
        
        <div className="bg-[#E5E5E5]/50 p-1 rounded-[10px] flex gap-1">
          <button 
            onClick={() => setActiveTab('active')}
            className={`px-6 py-2 rounded-[8px] text-[13px] font-medium transition-all ${
              activeTab === 'active' ? 'bg-white text-[#111] shadow-sm' : 'text-[#666] hover:text-[#111]'
            }`}
          >
            Active Curriculum
          </button>
          <button 
            onClick={() => setActiveTab('pipeline')}
            className={`px-6 py-2 rounded-[8px] text-[13px] font-medium transition-all ${
              activeTab === 'pipeline' ? 'bg-white text-[#111] shadow-sm' : 'text-[#666] hover:text-[#111]'
            }`}
          >
            Improvement Pipeline
          </button>
        </div>
      </div>

      {/* ACTIVE CURRICULUM VIEW */}
      {activeTab === 'active' && (
        <div className="flex flex-col flex-1 min-h-0 bg-white border border-[#E5E5E5] rounded-[16px] overflow-hidden shadow-sm">
           
           <div className="flex items-center justify-between p-4 border-b border-[#E5E5E5] bg-[#F7F6F3]">
              <div className="flex gap-2">
                {['CSE', 'ECE', 'MECH', 'CIVIL', 'MBA'].map(dept => (
                  <button 
                    key={dept} onClick={() => setActiveDept(dept)}
                    className={`px-4 py-1.5 text-[13px] rounded-lg border font-medium transition-colors ${
                      activeDept === dept ? 'bg-[#111] text-white border-[#111]' : 'bg-white text-[#666] border-[#E5E5E5] hover:border-[#111]'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-2 text-[13px] font-medium bg-white border border-[#E5E5E5] px-4 py-2 rounded-lg hover:border-[#111] transition-colors">
                <Download size={16} /> Download Syllabus
              </button>
           </div>

           <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Semester Accordion Mock */}
              {[3, 4].map(sem => (
                <div key={sem} className="border border-[#E5E5E5] rounded-[12px] overflow-hidden">
                   <div className="bg-[#FAFAFA] p-4 flex justify-between items-center border-b border-[#E5E5E5] cursor-pointer hover:bg-[#F3F4F6] transition-colors">
                      <h3 className="font-medium text-[15px]">Semester {sem}</h3>
                      <div className="text-[13px] text-[#666] font-jetbrains-mono">{courses.filter(c => c.semester === sem && c.department === activeDept).length} Courses</div>
                   </div>
                   
                   <div className="overflow-x-auto">
                     <table className="w-full text-left text-[14px]">
                        <thead className="text-[#666] text-[12px] font-medium border-b border-[#E5E5E5] bg-white">
                           <tr>
                             <th className="px-5 py-3 font-medium w-24">Code</th>
                             <th className="px-5 py-3 font-medium">Course Name</th>
                             <th className="px-5 py-3 font-medium text-center">Credits</th>
                             <th className="px-5 py-3 font-medium">Avg Performance</th>
                             <th className="px-5 py-3 font-medium text-right">Actions</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5E5E5] bg-white">
                           {courses.filter(c => c.semester === sem && c.department === activeDept).map(course => (
                             <tr key={course.id} className="hover:bg-[#F7F6F3] transition-colors group">
                                <td className="px-5 py-4 font-jetbrains-mono text-[13px]">{course.code}</td>
                                <td className="px-5 py-4">
                                  <div className="font-medium text-[#111]">{course.name}</div>
                                  {course.isComplianceCore && <div className="text-[10px] text-blue-600 uppercase tracking-widest mt-1">NEP Core</div>}
                                </td>
                                <td className="px-5 py-4 text-center font-jetbrains-mono">{course.credits}</td>
                                <td className="px-5 py-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-24 h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
                                      <div className={`h-full ${course.avgScore > 75 ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${course.avgScore}%` }}></div>
                                    </div>
                                    <span className="font-jetbrains-mono text-[13px]">{course.avgScore}%</span>
                                  </div>
                                </td>
                                <td className="px-5 py-4 text-right space-x-2">
                                  <button className="text-[#666] hover:text-[#111] p-1.5 rounded transition-colors"><BarChart2 size={16}/></button>
                                  <button className="text-[#666] hover:text-[#111] p-1.5 rounded transition-colors"><Edit3 size={16}/></button>
                                </td>
                             </tr>
                           ))}
                           {courses.filter(c => c.semester === sem && c.department === activeDept).length === 0 && (
                             <tr>
                               <td colSpan={5} className="px-5 py-8 text-center text-[#999] text-[13px] italic">No active courses found for this criteria.</td>
                             </tr>
                           )}
                        </tbody>
                     </table>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}

      {/* PIPELINE KANBAN VIEW */}
      {activeTab === 'pipeline' && (
        <div className="flex-1 min-h-0 flex flex-col pt-2">
          
          <div className="flex justify-between items-center mb-6 shrink-0">
             <div className="flex gap-4 items-center">
               <select className="bg-white border border-[#E5E5E5] rounded-lg px-3 py-2 text-[13px] outline-none hover:border-[#111]">
                 <option>Filter by Department</option>
                 <option>CSE</option>
                 <option>ECE</option>
               </select>
               <label className="flex items-center gap-2 cursor-pointer text-[13px] text-[#666]">
                 <input type="checkbox" className="accent-[#111]" /> Mine only
               </label>
             </div>
             
             <button className="flex items-center gap-2 bg-[#111] text-white px-4 py-2 rounded-lg text-[13px] font-medium hover:bg-black/90 transition-colors">
               <Plus size={16}/> Propose Change
             </button>
          </div>

          {/* Kanban Board Container */}
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
               
               {/* Column: Proposed */}
               <div className="bg-[#E5E5E5]/40 rounded-[16px] border border-[#E5E5E5] flex flex-col overflow-hidden">
                  <div className="p-4 border-b border-[#E5E5E5] bg-[#F7F6F3] flex justify-between items-center shrink-0">
                    <h3 className="font-medium text-[15px] flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div> PROPOSED
                    </h3>
                    <span className="font-jetbrains-mono bg-[#E5E5E5] text-[#666] text-[11px] px-2 py-0.5 rounded">{getCardsByStatus('Proposed').length}</span>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                     <SortableContext items={getCardsByStatus('Proposed')} strategy={verticalListSortingStrategy}>
                       {getCardsByStatus('Proposed').map(p => <SortableProposalCard key={p.id} proposal={p} />)}
                     </SortableContext>
                  </div>
               </div>

               {/* Column: Under Review */}
               <div className="bg-[#E5E5E5]/40 rounded-[16px] border border-[#E5E5E5] flex flex-col overflow-hidden">
                  <div className="p-4 border-b border-[#E5E5E5] bg-[#F7F6F3] flex justify-between items-center shrink-0">
                    <h3 className="font-medium text-[15px] flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-amber-500"></div> UNDER REVIEW
                    </h3>
                    <span className="font-jetbrains-mono bg-[#E5E5E5] text-[#666] text-[11px] px-2 py-0.5 rounded">{getCardsByStatus('Under Review').length}</span>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                     <SortableContext items={getCardsByStatus('Under Review')} strategy={verticalListSortingStrategy}>
                       {getCardsByStatus('Under Review').map(p => <SortableProposalCard key={p.id} proposal={p} />)}
                     </SortableContext>
                  </div>
               </div>

               {/* Column: Approved */}
               <div className="bg-[#E5E5E5]/40 rounded-[16px] border border-[#E5E5E5] flex flex-col overflow-hidden">
                  <div className="p-4 border-b border-[#E5E5E5] bg-[#F7F6F3] flex justify-between items-center shrink-0">
                    <h3 className="font-medium text-[15px] flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div> APPROVED
                    </h3>
                    <span className="font-jetbrains-mono bg-[#E5E5E5] text-[#666] text-[11px] px-2 py-0.5 rounded">{getCardsByStatus('Approved').length}</span>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                     <SortableContext items={getCardsByStatus('Approved')} strategy={verticalListSortingStrategy}>
                       {getCardsByStatus('Approved').map(p => <SortableProposalCard key={p.id} proposal={p} />)}
                     </SortableContext>
                     {getCardsByStatus('Approved').length === 0 && (
                       <div className="h-32 border-2 border-dashed border-[#E5E5E5] rounded-xl flex items-center justify-center text-[#999] text-[13px]">
                         Drop approved changes here
                       </div>
                     )}
                  </div>
               </div>

            </div>
          </DndContext>
        </div>
      )}

    </div>
  );
}
