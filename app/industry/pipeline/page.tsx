"use client";

import { useState } from "react";
import { useIndustryStore, Candidate } from "@/lib/store/industryStore";
import { 
  DndContext, DragOverlay, closestCorners, KeyboardSensor, 
  PointerSensor, useSensor, useSensors, DragStartEvent, DragEndEvent
} from '@dnd-kit/core';
import { 
  SortableContext, arrayMove, sortableKeyboardCoordinates, 
  verticalListSortingStrategy, useSortable 
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Filter, Search, Calendar, Mail, MoveRight, Eye, 
  X, Check, Clock, UserCheck
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const STAGES = [
  'New Applications', 'Under Review', 'Shortlisted', 
  'Interview Scheduled', 'Interviewed', 'Offer Sent', 
  'Accepted', 'Rejected'
];

export default function PipelinePage() {
  const { candidates, updateCandidateStage } = useIndustryStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  
  // Filters
  const [roleFilter, setRoleFilter] = useState('All');
  
  const filteredCandidates = candidates.filter(c => roleFilter === 'All' || c.roleTitle === roleFilter);

  // Group candidates by stage
  const columns = STAGES.map(stage => ({
    id: stage,
    title: stage,
    items: filteredCandidates.filter(c => c.stage === stage)
  }));

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Is it dropping over a column?
    const isOverAColumn = STAGES.includes(overId);
    
    if (isOverAColumn) {
      updateCandidateStage(activeId, overId);
      toast.success(`Moved to ${overId}`);
      return;
    }

    // Is it dropping over another item?
    const activeCandidate = candidates.find(c => c.id === activeId);
    const overCandidate = candidates.find(c => c.id === overId);
    
    if (activeCandidate && overCandidate && activeCandidate.stage !== overCandidate.stage) {
      updateCandidateStage(activeId, overCandidate.stage);
      toast.success(`Moved to ${overCandidate.stage}`);
    }
  };

  const activeCandidate = activeId ? candidates.find(c => c.id === activeId) : null;

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <h1 className="font-instrument text-3xl tracking-tight text-[#111111] mb-2">Talent Pipeline</h1>
          <p className="text-[#666666] font-inter text-sm">Manage candidates across all hiring stages.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="px-3 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm bg-white focus:outline-none focus:border-[#111111]"
          >
            <option value="All">All Roles</option>
            {Array.from(new Set(candidates.map(c => c.roleTitle))).map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <div className="flex border border-[#E5E5E5] rounded-lg overflow-hidden">
            <button className="px-3 py-2 bg-[#F3F4F6] text-[#111111] text-sm font-medium border-r border-[#E5E5E5]">Board</button>
            <button className="px-3 py-2 bg-white text-[#666666] text-sm font-medium hover:bg-[#F9FAFB]">Table</button>
          </div>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 overflow-x-auto overflow-y-hidden flex gap-4 pb-4 px-1">
          {columns.map(col => (
            <Column key={col.id} id={col.id} title={col.title} items={col.items} />
          ))}
        </div>
        
        <DragOverlay>
          {activeCandidate ? <CandidateCard candidate={activeCandidate} isOverlay /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

function Column({ id, title, items }: { id: string, title: string, items: Candidate[] }) {
  const { setNodeRef } = useSortable({
    id: id,
    data: { type: "Column", id }
  });

  return (
    <div 
      ref={setNodeRef}
      className="flex flex-col bg-[#F3F4F6] rounded-xl w-[320px] shrink-0 border border-[#E5E5E5]"
    >
      <div className="p-3 border-b border-[#E5E5E5] flex items-center justify-between shrink-0 bg-[#F9FAFB] rounded-t-xl">
        <h3 className="font-instrument text-lg tracking-tight text-[#111111]">{title}</h3>
        <span className="px-2 py-0.5 bg-[#E5E5E5] rounded-full font-mono text-[11px] text-[#374151]">
          {items.length}
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
          {items.map(item => (
            <SortableCandidateCard key={item.id} candidate={item} />
          ))}
        </SortableContext>
        {items.length === 0 && (
          <div className="h-24 border-2 border-dashed border-[#E5E5E5] rounded-lg flex items-center justify-center text-sm font-inter text-[#999999]">
            Drop here
          </div>
        )}
      </div>
    </div>
  );
}

function SortableCandidateCard({ candidate }: { candidate: Candidate }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: candidate.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CandidateCard candidate={candidate} />
    </div>
  );
}

function CandidateCard({ candidate, isOverlay = false }: { candidate: Candidate, isOverlay?: boolean }) {
  const [showProfile, setShowProfile] = useState(false);
  
  const borderColor = 
    candidate.stage === 'New Applications' ? 'border-l-4 border-l-[#3B82F6]' :
    candidate.stage === 'Rejected' ? 'border-l-4 border-l-[#DC2626] opacity-75' :
    candidate.stage === 'Accepted' ? 'border-l-4 border-l-[#059669]' :
    candidate.matchScore > 85 ? 'border-l-4 border-l-[#D97706]' : '';

  return (
    <>
      <div 
        className={`bg-white p-3 rounded-lg border border-[#E5E5E5] shadow-sm cursor-grab hover:border-[#111111] transition-colors ${borderColor} ${isOverlay ? 'rotate-2 scale-105 shadow-xl cursor-grabbing' : ''}`}
        onPointerDown={(e) => {
          // Prevent drag if clicking action buttons
          if ((e.target as HTMLElement).closest('button')) {
            e.stopPropagation();
          }
        }}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center text-xs font-medium text-[#111111]">
              {candidate.name.split(' ').map(n=>n[0]).join('')}
            </div>
            <div>
              <div className="font-medium text-[14px] text-[#111111] leading-tight">{candidate.name}</div>
              <div className="text-[11px] text-[#666666] truncate max-w-[150px]">{candidate.college}</div>
            </div>
          </div>
          <div className="px-1.5 py-0.5 bg-[#D1FAE5] text-[#065F46] rounded font-mono text-[10px]">
            {candidate.matchScore}%
          </div>
        </div>
        
        <div className="text-[12px] text-[#111111] mb-2 font-medium">{candidate.roleTitle}</div>
        
        <div className="flex gap-1 mb-3">
          {candidate.tags.map(t => (
            <span key={t} className="px-1.5 py-0.5 bg-[#F3F4F6] text-[#666666] rounded font-inter text-[10px]">{t}</span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E5E5E5]">
          <div className="text-[10px] font-mono text-[#999999]">{candidate.appliedAgo}</div>
          <div className="flex gap-1">
            <button onClick={() => setShowProfile(true)} className="p-1 text-[#666666] hover:bg-[#F3F4F6] rounded" title="View Profile">
              <Eye size={14} />
            </button>
            <button className="p-1 text-[#666666] hover:bg-[#F3F4F6] rounded" title="Message">
              <Mail size={14} />
            </button>
            <button className="p-1 text-[#666666] hover:bg-[#F3F4F6] rounded" title="Schedule">
              <Calendar size={14} />
            </button>
          </div>
        </div>
      </div>

      {showProfile && (
        <CandidateProfileModal candidate={candidate} onClose={() => setShowProfile(false)} />
      )}
    </>
  );
}

// Simple profile modal stub to fulfill the requirement
function CandidateProfileModal({ candidate, onClose }: { candidate: Candidate, onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex justify-end" onClick={onClose}>
      <div 
        className="w-full max-w-3xl bg-white h-full overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-[#E5E5E5] flex items-start justify-between">
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center text-xl font-medium text-[#111111]">
              {candidate.name.split(' ').map(n=>n[0]).join('')}
            </div>
            <div>
              <h2 className="font-instrument text-3xl tracking-tight text-[#111111]">{candidate.name}</h2>
              <div className="text-sm text-[#666666] mt-1">{candidate.roleTitle} · {candidate.college}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#D1FAE5] text-[#065F46] rounded-full font-mono text-xs">{candidate.matchScore}% Match</span>
            <button onClick={onClose} className="p-2 text-[#666666] hover:bg-[#F3F4F6] rounded-full">
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="p-6 flex-1 bg-[#F7F6F3]">
          <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 mb-6">
            <h3 className="font-instrument text-xl mb-4">Action Center</h3>
            <div className="flex gap-3">
              <button className="flex-1 py-2 bg-[#111111] text-white rounded-lg text-sm font-medium hover:bg-black/90">
                Move to Next Stage
              </button>
              <button className="flex-1 py-2 bg-white border border-[#E5E5E5] text-[#111111] rounded-lg text-sm font-medium hover:bg-[#F9FAFB]">
                Schedule Interview
              </button>
              <button className="px-4 py-2 bg-[#FEF2F2] text-[#DC2626] rounded-lg text-sm font-medium hover:bg-[#FEE2E2]">
                Reject
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E5E5] p-6">
            <h3 className="font-instrument text-xl mb-4">Readiness Profile</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Technical Skills</span>
                  <span className="font-mono">82/100</span>
                </div>
                <div className="w-full h-2 bg-[#F3F4F6] rounded-full overflow-hidden"><div className="h-full bg-[#059669] w-[82%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Soft Skills</span>
                  <span className="font-mono">68/100</span>
                </div>
                <div className="w-full h-2 bg-[#F3F4F6] rounded-full overflow-hidden"><div className="h-full bg-[#D97706] w-[68%]"></div></div>
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Verified Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {candidate.tags.map(t => (
                    <span key={t} className="px-2 py-1 bg-[#F3F4F6] text-[#666666] border border-[#E5E5E5] rounded-md text-xs">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
