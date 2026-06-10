"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Calendar, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { LearningPath } from "@/lib/engines/types";

export default function RoadmapTab({ path }: { path: LearningPath }) {
  const [expandedPhases, setExpandedPhases] = useState<number[]>([1]); // Phase 1 open by default
  const [phasesState, setPhasesState] = useState<any[]>([]);

  // Initialize phase tasks from path data
  useEffect(() => {
    if (!path) return;
    
    const initialPhases = path.phases.map(phase => {
      const tasks = [
        ...phase.resources.map((res, idx) => ({
          id: `res-${phase.phase}-${idx}`,
          title: res.title,
          type: res.type === 'certification' ? 'Certification' : 'Course',
          time: 'Self-paced',
          priority: idx === 0 ? 'high' : 'medium',
          status: 'not-started',
          platform: res.provider,
          url: res.url
        })),
        {
          id: `ms-${phase.phase}`,
          title: `Milestone: ${phase.milestone}`,
          type: 'Project',
          time: '1 week',
          priority: 'high',
          status: 'not-started',
          platform: 'Prashikshan',
          url: '#'
        }
      ];

      return {
        id: phase.phase,
        title: phase.name,
        duration: `${phase.durationWeeks} weeks`,
        status: 'not-started',
        description: `Acquire key skills: ${phase.skills.join(', ')}.`,
        tasks
      };
    });

    setPhasesState(initialPhases);
  }, [path]);

  const togglePhase = (id: number) => {
    setExpandedPhases(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleTaskStatus = (phaseId: number, taskId: string) => {
    setPhasesState(prev => prev.map(phase => {
      if (phase.id !== phaseId) return phase;
      
      const updatedTasks = phase.tasks.map((task: any) => {
        if (task.id !== taskId) return task;
        return { ...task, status: task.status === 'completed' ? 'not-started' : 'completed' };
      });

      // Update phase status based on completed tasks
      const allCompleted = updatedTasks.every((t: any) => t.status === 'completed');
      const someCompleted = updatedTasks.some((t: any) => t.status === 'completed');
      let status = 'not-started';
      if (allCompleted) status = 'completed';
      else if (someCompleted) status = 'in-progress';

      return {
        ...phase,
        status,
        tasks: updatedTasks
      };
    }));
  };

  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'Course': return <Badge variant="info">{type}</Badge>;
      case 'Certification': return <Badge variant="warning">{type}</Badge>;
      case 'Project': return <Badge variant="success">{type}</Badge>;
      default: return <Badge variant="neutral">{type}</Badge>;
    }
  };

  const getPriorityDots = (priority: string) => {
    let color = '';
    switch(priority) {
      case 'high': color = 'bg-[#DC2626]'; break;
      case 'medium': color = 'bg-[#D97706]'; break;
      case 'low': color = 'bg-[#16A34A]'; break;
    }
    return (
      <div className="flex gap-0.5">
        <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
        <div className={`w-1.5 h-1.5 rounded-full ${priority !== 'low' ? color : 'bg-[#E5E5E5]'}`} />
        <div className={`w-1.5 h-1.5 rounded-full ${priority === 'high' ? color : 'bg-[#E5E5E5]'}`} />
      </div>
    );
  };

  return (
    <div className="max-w-4xl space-y-6">
      
      {/* Header Info */}
      <div className="flex items-start gap-4 p-4 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl">
        <div className="mt-1"><CheckCircle2 size={20} className="text-[#16A34A]" /></div>
        <div>
          <h3 className="font-medium text-[#111] mb-1">AI-Customized Curriculum</h3>
          <p className="text-[13px] text-[#166534] leading-relaxed">
            Your gap analysis shows you lack {path.gapAnalysis.gapSkills.length} required skills for {path.career}.
            We have adjusted phase durations and highlighted key resources to speed up your learning by leveraging the {path.gapAnalysis.matchedSkills.length} skills you already have.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-[#E5E5E5] ml-4 md:ml-6 space-y-8 pb-8">
        {phasesState.map((phase) => {
          const isExpanded = expandedPhases.includes(phase.id);
          const completedTasks = phase.tasks.filter((t: any) => t.status === 'completed').length;
          const progress = phase.tasks.length > 0 ? (completedTasks / phase.tasks.length) * 100 : 0;

          return (
            <div key={phase.id} className="relative pl-8 md:pl-10">
              {/* Phase Node */}
              <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-white border-2 border-[#111111] flex items-center justify-center font-jetbrains-mono text-[13px] font-medium z-10">
                {phase.id}
              </div>

              {/* Phase Header */}
              <div 
                className={`cursor-pointer group ${isExpanded ? 'mb-4' : ''}`}
                onClick={() => togglePhase(phase.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h2 className="font-instrument text-[24px] md:text-[28px] group-hover:underline">Phase {phase.id}: {phase.title}</h2>
                    {phase.status === 'in-progress' && <Badge variant="info">In Progress</Badge>}
                    {phase.status === 'completed' && <Badge variant="success">Completed</Badge>}
                  </div>
                  {isExpanded ? <ChevronUp size={20} className="text-[#999]" /> : <ChevronDown size={20} className="text-[#999]" />}
                </div>
                
                <div className="flex items-center gap-4 mt-2">
                  <span className="font-jetbrains-mono text-[13px] text-[#666]">{phase.duration}</span>
                  <div className="w-32 h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
                    <div className="h-full bg-[#111111]" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="font-jetbrains-mono text-[12px] text-[#999]">{completedTasks} / {phase.tasks.length} tasks</span>
                </div>
              </div>

              {/* Phase Content */}
              {isExpanded && (
                <div className="space-y-4">
                  <p className="text-[14px] text-[#666]">{phase.description}</p>
                  
                  <div className="space-y-3">
                    {phase.tasks.map((task: any) => {
                      const isCompleted = task.status === 'completed';
                      return (
                        <div key={task.id} className={`p-4 rounded-xl border transition-colors ${isCompleted ? 'bg-[#FAFAFA] border-[#E5E5E5]' : 'bg-white border-[#E5E5E5] hover:border-[#111111]'}`}>
                          <div className="flex items-start gap-3">
                            
                            <button 
                              onClick={(e) => { e.stopPropagation(); toggleTaskStatus(phase.id, task.id); }}
                              className={`mt-0.5 shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${isCompleted ? 'bg-[#16A34A] border-[#16A34A] text-white' : 'border-[#CCCCCC] hover:border-[#111111]'}`}
                            >
                              {isCompleted && <CheckCircle2 size={14} />}
                            </button>

                            <div className="flex-1">
                              <div className="flex flex-wrap gap-2 items-center mb-1">
                                <h4 className={`font-medium text-[15px] ${isCompleted ? 'text-[#999] line-through' : 'text-[#111]'}`}>
                                  {task.title}
                                </h4>
                                {!isCompleted && getTypeBadge(task.type)}
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-4 text-[12px] text-[#666]">
                                <span className="font-jetbrains-mono">Est: {task.time}</span>
                                <div className="flex items-center gap-1.5">
                                  <span>Priority:</span> {getPriorityDots(task.priority)}
                                </div>
                                {task.platform && <span>Provider: {task.platform}</span>}
                              </div>

                              {!isCompleted && (
                                <div className="mt-4 flex gap-3">
                                  <a 
                                    href={task.url} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="text-[13px] font-medium text-[#111] hover:underline flex items-center"
                                  >
                                    Start Learning <ExternalLink size={14} className="ml-1" />
                                  </a>
                                </div>
                              )}
                              
                              {isCompleted && (
                                <div className="mt-2 text-[11px] font-jetbrains-mono text-[#999]">
                                  Task Checked
                                </div>
                              )}
                            </div>

                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
