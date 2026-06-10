"use client";

import { useState, useEffect, useCallback } from "react";
import ReactFlow, { 
  Controls, 
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Lock, CheckCircle2, ChevronRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { LearningPath } from "@/lib/engines/types";

// Custom Node Component
function SkillNode({ data, isConnectable }: any) {
  let bgColor = "bg-white";
  let borderColor = "border-[#E5E5E5]";
  let icon = null;

  if (data.status === 'completed') {
    bgColor = "bg-[#ECFDF5]";
    borderColor = "border-[#A7F3D0]";
    icon = <CheckCircle2 size={14} className="text-[#059669]" />;
  } else if (data.status === 'in-progress') {
    bgColor = "bg-[#EFF6FF]";
    borderColor = "border-[#BFDBFE]";
  } else if (data.status === 'locked') {
    bgColor = "bg-[#F3F4F6]";
    borderColor = "border-[#E5E5E5]";
    icon = <Lock size={12} className="text-[#999]" />;
  }

  return (
    <div className={`px-4 py-2 shadow-sm rounded-lg border-2 ${bgColor} ${borderColor} min-w-[150px]`}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-2 h-2 bg-[#999]" />
      <div className="flex items-center justify-between gap-2">
        <div className={`font-inter font-medium text-[13px] ${data.status === 'locked' ? 'text-[#999]' : 'text-[#111]'}`}>
          {data.label}
        </div>
        {icon}
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="w-2 h-2 bg-[#999]" />
    </div>
  );
}

const nodeTypes = {
  skillNode: SkillNode,
};

export default function SkillsTab({ path }: { path: LearningPath }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);

  useEffect(() => {
    if (!path) return;

    const newNodes: any[] = [];
    const newEdges: any[] = [];

    // Root target career node
    const rootId = 'root';
    newNodes.push({
      id: rootId,
      type: 'skillNode',
      position: { x: 350, y: 10 },
      data: { label: path.career, status: 'in-progress' }
    });

    let nodeIndex = 1;
    const matchedSet = new Set(path.gapAnalysis.matchedSkills.map(s => s.toLowerCase()));

    // Generate nodes and edges dynamically based on phases
    path.phases.forEach((phase, pIdx) => {
      // Phase container node
      const phaseNodeId = `phase-${phase.phase}`;
      const phaseX = 50 + pIdx * 220;
      
      newNodes.push({
        id: phaseNodeId,
        type: 'skillNode',
        position: { x: phaseX, y: 130 },
        data: { 
          label: `Phase ${phase.phase}: ${phase.name.split(' & ')[0]}`, 
          status: pIdx === 0 ? 'in-progress' : 'locked' 
        }
      });

      // Link root to phase nodes
      newEdges.push({
        id: `e-root-${phaseNodeId}`,
        source: rootId,
        target: phaseNodeId,
        style: { stroke: '#E5E5E5' }
      });

      // Skill child nodes under each phase
      phase.skills.forEach((skill, sIdx) => {
        const skillId = `skill-${nodeIndex++}`;
        const isMatched = matchedSet.has(skill.toLowerCase());
        
        let status = 'not-started';
        if (isMatched) {
          status = 'completed';
        } else if (pIdx === 0) {
          status = 'in-progress';
        } else {
          status = 'locked';
        }

        newNodes.push({
          id: skillId,
          type: 'skillNode',
          position: { x: phaseX, y: 230 + sIdx * 90 },
          data: { label: skill, status, phase: phase.name }
        });

        // Link phase to skill
        newEdges.push({
          id: `e-${phaseNodeId}-${skillId}`,
          source: phaseNodeId,
          target: skillId,
          animated: status === 'in-progress',
          style: { stroke: isMatched ? '#10B981' : (status === 'in-progress' ? '#3B82F6' : '#D1D5DB') },
          markerEnd: { type: MarkerType.ArrowClosed, color: isMatched ? '#10B981' : '#D1D5DB' }
        });
      });
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [path]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: any) => {
    // Prevent root or phase container node selection from breaking UI
    if (node.id === 'root' || node.id.startsWith('phase')) return;
    setSelectedSkill(node.data);
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Top Section: Gap Analysis & Endorsements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white border border-[#E5E5E5] rounded-xl flex flex-col justify-between shadow-sm">
          <div>
            <h3 className="font-instrument text-[24px] mb-4">Skill Gap Analysis</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <div className="text-[12px] uppercase tracking-wider text-[#666] font-medium mb-2">Acquired ({path.gapAnalysis.matchedSkills.length})</div>
                <div className="flex flex-wrap gap-1.5">
                  {path.gapAnalysis.matchedSkills.slice(0, 3).map(skill => (
                    <span key={skill} className="px-2 py-0.5 bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] rounded text-[12px]">
                      {skill}
                    </span>
                  ))}
                  {path.gapAnalysis.matchedSkills.length > 3 && (
                    <span className="text-[12px] text-[#666] px-2 py-0.5">+{path.gapAnalysis.matchedSkills.length - 3} more</span>
                  )}
                  {path.gapAnalysis.matchedSkills.length === 0 && (
                    <span className="text-[12px] text-[#999] italic">None yet</span>
                  )}
                </div>
              </div>
              <div className="w-px h-16 bg-[#E5E5E5]"></div>
              <div className="flex-1">
                <div className="text-[12px] uppercase tracking-wider text-[#666] font-medium mb-2">To Learn ({path.gapAnalysis.gapSkills.length})</div>
                <div className="flex flex-wrap gap-1.5">
                  {path.gapAnalysis.gapSkills.slice(0, 3).map(skill => (
                    <span key={skill} className="px-2 py-0.5 bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A] rounded text-[12px]">
                      {skill}
                    </span>
                  ))}
                  {path.gapAnalysis.gapSkills.length > 3 && (
                    <span className="text-[12px] text-[#666] px-2 py-0.5">+{path.gapAnalysis.gapSkills.length - 3} more</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#F7F6F3] rounded-lg">
            <span className="text-[13px] font-medium text-[#111]">Current Skill Gap Percentage</span>
            <span className="font-jetbrains-mono text-[16px] font-medium">{path.gapAnalysis.gapPercentage}% gap</span>
          </div>
        </div>

        <div className="p-6 bg-white border border-[#E5E5E5] rounded-xl shadow-sm">
          <h3 className="font-instrument text-[24px] mb-4">Skill Endorsements</h3>
          <p className="text-[14px] text-[#666] mb-4">
            Peers and mentors can endorse the skills you've acquired. Highly endorsed skills stand out to recruiters.
          </p>
          <div className="space-y-3">
            {path.gapAnalysis.matchedSkills.slice(0, 2).map((skill, idx) => (
              <div key={skill} className="flex items-center justify-between p-3 border border-[#E5E5E5] rounded-lg bg-[#FAFAFA]">
                <div className="font-medium text-[14px]">{skill}</div>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-[#16A34A] font-medium">Verified by Assessment</span>
                </div>
              </div>
            ))}
            {path.gapAnalysis.matchedSkills.length === 0 && (
              <div className="text-[13px] text-[#999] text-center py-4 italic border border-dashed rounded-lg">
                Complete assessments or projects to earn skill verification endorsements.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Skill Tree */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        <div className="lg:col-span-2 border border-[#E5E5E5] rounded-xl overflow-hidden bg-[#FAFAFA] relative shadow-sm">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-right"
          >
            <Background color="#E5E5E5" gap={16} />
            <Controls />
          </ReactFlow>
          <div className="absolute top-4 left-4 bg-white p-3 rounded-lg border border-[#E5E5E5] shadow-sm flex flex-col gap-2 text-[12px] z-10">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#ECFDF5] border border-[#A7F3D0]"></div> Mastered</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#EFF6FF] border border-[#BFDBFE]"></div> In Focus</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-white border border-[#E5E5E5]"></div> Target Skill</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#F3F4F6] border border-[#E5E5E5]"></div> Locked</div>
          </div>
        </div>

        {/* Skill Detail Panel */}
        <div className="border border-[#E5E5E5] rounded-xl bg-white p-6 overflow-y-auto shadow-sm">
          {selectedSkill ? (
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-instrument text-[24px]">{selectedSkill.label}</h3>
                {selectedSkill.status === 'completed' && <Badge variant="success">Mastered</Badge>}
                {selectedSkill.status === 'in-progress' && <Badge variant="info">In Focus</Badge>}
                {selectedSkill.status === 'locked' && <Badge variant="neutral">Locked</Badge>}
              </div>
              <p className="text-[14px] text-[#666] mb-4">
                Part of phase roadmap: {selectedSkill.phase || "Foundation"}
              </p>

              {selectedSkill.status === 'locked' ? (
                <div className="bg-[#F7F6F3] p-4 rounded-lg flex items-center gap-3 mb-6 border">
                  <Lock size={20} className="text-[#999]" />
                  <div className="text-[13px]">
                    <span className="font-medium block text-[#111]">Prerequisites locked</span>
                    <span className="text-[#666]">Complete earlier phase modules first.</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 mb-6">
                  <div className="font-medium text-[14px]">Recommended Action</div>
                  <p className="text-[13px] text-[#666]">
                    You can study this skill through courses or projects listed in the Roadmap and Resources tabs.
                  </p>
                  
                  <div className="p-3 border border-[#E5E5E5] rounded-lg flex items-start gap-3 bg-[#F7F6F3]">
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center shrink-0 border">
                      <BookOpen size={16} className="text-[#111]" />
                    </div>
                    <div>
                      <div className="font-medium text-[13px]">Curriculum Syllabus Integration</div>
                      <div className="text-[12px] text-[#666]">Interactive module in learning path</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-[#666]">
              <div className="w-12 h-12 bg-[#F7F6F3] rounded-full flex items-center justify-center mb-4 border">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <p className="text-[14px]">Click on any skill node in the tree graph to view its details, prerequisites, and learning state.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
