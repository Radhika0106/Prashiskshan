"use client";

import { useState } from "react";
import { useIndustryStore, Intern } from "@/lib/store/industryStore";
import { 
  Search, MessageSquare, Calendar, ChevronRight, X, 
  CheckCircle2, AlertCircle, AlertTriangle, FileText,
  Star, Clock
} from "lucide-react";
import { toast } from "sonner";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ActiveInternsPage() {
  const { interns } = useIndustryStore();
  const [search, setSearch] = useState("");
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);

  const filtered = interns.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.role.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-instrument text-3xl tracking-tight text-[#111111] mb-2">Active Interns</h1>
          <p className="text-[#666666] font-inter text-sm">Monitor progress and provide feedback to your interns.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
            <input 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search interns..."
              className="pl-9 pr-4 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm focus:outline-none focus:border-[#111111] w-64"
            />
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button className="px-3 py-1.5 bg-[#111111] text-white border border-[#111111] rounded-full text-xs font-medium">All Interns</button>
        <button className="px-3 py-1.5 bg-white text-[#666666] border border-[#E5E5E5] rounded-full text-xs font-medium hover:bg-[#F9FAFB]">Needs Feedback (4)</button>
        <button className="px-3 py-1.5 bg-white text-[#666666] border border-[#E5E5E5] rounded-full text-xs font-medium hover:bg-[#F9FAFB]">Mid-term Due (2)</button>
        <button className="px-3 py-1.5 bg-white text-[#666666] border border-[#E5E5E5] rounded-full text-xs font-medium hover:bg-[#F9FAFB]">Completing Soon (5)</button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
        {filtered.map(intern => (
          <div key={intern.id} className="bg-white p-5 rounded-2xl border border-[#E5E5E5] hover:border-[#111111] transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center text-lg font-medium text-[#111111]">
                  {intern.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-medium text-[#111111]">{intern.name}</h3>
                  <p className="text-xs text-[#666666]">{intern.role}</p>
                </div>
              </div>
              <div className={`w-2 h-2 rounded-full ${
                intern.status === 'On Track' ? 'bg-[#059669]' : 
                intern.status === 'Needs Attention' ? 'bg-[#D97706]' : 'bg-[#DC2626]'
              }`} title={intern.status} />
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-[11px] font-mono text-[#666666] mb-1.5">
                <span>Week {intern.weekOut} of {intern.totalWeeks}</span>
                <span>{Math.round((intern.weekOut / intern.totalWeeks) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                <div 
                  className={`h-full ${intern.status === 'On Track' ? 'bg-[#059669]' : 'bg-[#D97706]'}`} 
                  style={{ width: `${(intern.weekOut / intern.totalWeeks) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs mb-4">
              <div className="flex items-center gap-1.5 text-[#666666]">
                <Clock size={14} /> Logbook: {intern.lastLogbookTime}
              </div>
              <div className="flex gap-0.5">
                {[1,2,3].map(i => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= intern.performance ? 'bg-[#111111]' : 'bg-[#E5E5E5]'}`} />
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E5E5] flex justify-between items-center">
              <span className="px-2 py-1 bg-[#F3F4F6] text-[#666666] rounded text-[11px] font-medium">
                Mentor: {intern.mentor.split(' ')[0]}
              </span>
              <button 
                onClick={() => setSelectedIntern(intern)}
                className="text-sm font-medium text-[#111111] hover:underline flex items-center"
              >
                View Details <ChevronRight size={14} className="ml-0.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedIntern && (
        <InternDetailModal intern={selectedIntern} onClose={() => setSelectedIntern(null)} />
      )}
    </div>
  );
}

function InternDetailModal({ intern, onClose }: { intern: Intern, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const TABS = ['Overview', 'Logbook', 'Feedback', 'Performance', 'Tasks'];

  // Mock performance data
  const chartData = {
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
    datasets: [{
      label: 'Performance Rating',
      data: [3.5, 3.8, 4.0, 3.9, 4.2, 4.5],
      borderColor: '#111111',
      tension: 0.3,
    }]
  };

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex justify-end">
      <div className="w-full max-w-4xl bg-[#F7F6F3] h-full overflow-hidden shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="bg-white border-b border-[#E5E5E5] px-8 py-6 shrink-0">
          <div className="flex items-start justify-between mb-6">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center text-xl font-medium text-[#111111]">
                {intern.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="font-instrument text-3xl tracking-tight text-[#111111]">{intern.name}</h2>
                <div className="text-sm text-[#666666] mt-1">{intern.role} · {intern.department}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-0.5 rounded font-mono text-[10px] ${
                    intern.status === 'On Track' ? 'bg-[#D1FAE5] text-[#065F46]' : 'bg-[#FEF9C3] text-[#854D0E]'
                  }`}>
                    {intern.status}
                  </span>
                  <span className="text-[11px] font-mono text-[#999999]">Week {intern.weekOut} of {intern.totalWeeks}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-[#E5E5E5] rounded-lg text-sm font-medium hover:bg-[#F9FAFB] flex items-center gap-2">
                <MessageSquare size={16} /> Contact
              </button>
              <button onClick={onClose} className="p-2 text-[#666666] hover:bg-[#F3F4F6] rounded-full">
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex gap-6">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab ? 'border-[#111111] text-[#111111]' : 'border-transparent text-[#666666] hover:text-[#111111]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {activeTab === 'Overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5]">
                  <h3 className="font-instrument text-xl mb-4">Progress Summary</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Internship Timeline</span>
                    <span className="text-sm font-mono text-[#666666]">{intern.totalWeeks - intern.weekOut} weeks remaining</span>
                  </div>
                  <div className="w-full h-2 bg-[#F3F4F6] rounded-full overflow-hidden mb-6">
                    <div className="h-full bg-[#111111]" style={{ width: `${(intern.weekOut / intern.totalWeeks) * 100}%` }}></div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 border border-[#E5E5E5] rounded-xl bg-[#F9FAFB]">
                      <div className="text-2xl font-mono text-[#111111] mb-1">18</div>
                      <div className="text-xs text-[#666666]">Logbook Entries</div>
                    </div>
                    <div className="p-4 border border-[#E5E5E5] rounded-xl bg-[#F9FAFB]">
                      <div className="text-2xl font-mono text-[#111111] mb-1">24</div>
                      <div className="text-xs text-[#666666]">Tasks Completed</div>
                    </div>
                    <div className="p-4 border border-[#E5E5E5] rounded-xl bg-[#F9FAFB]">
                      <div className="text-2xl font-mono text-[#111111] mb-1 flex items-center">
                        4.2 <Star size={16} className="ml-1 fill-[#F59E0B] text-[#F59E0B]" />
                      </div>
                      <div className="text-xs text-[#666666]">Avg Rating</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5]">
                  <h3 className="font-instrument text-xl mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="mt-1"><FileText size={16} className="text-[#666666]" /></div>
                      <div>
                        <div className="text-sm text-[#111111]">Submitted logbook entry for Week {intern.weekOut}</div>
                        <div className="text-xs font-mono text-[#999999] mt-0.5">2 days ago</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1"><CheckCircle2 size={16} className="text-[#059669]" /></div>
                      <div>
                        <div className="text-sm text-[#111111]">Completed task: API integration</div>
                        <div className="text-xs font-mono text-[#999999] mt-0.5">3 days ago</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1"><MessageSquare size={16} className="text-[#666666]" /></div>
                      <div>
                        <div className="text-sm text-[#111111]">Received feedback from mentor</div>
                        <div className="text-xs font-mono text-[#999999] mt-0.5">5 days ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5]">
                  <h3 className="font-instrument text-xl mb-4">Upcoming Milestones</h3>
                  <div className="space-y-3">
                    <div className="p-3 border border-[#E5E5E5] rounded-xl flex items-start gap-3 bg-[#FEF9C3]/30">
                      <AlertCircle size={16} className="text-[#854D0E] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-[#854D0E]">Mid-term evaluation due</div>
                        <div className="text-xs text-[#854D0E]/80 mt-0.5">In 5 days</div>
                      </div>
                    </div>
                    <div className="p-3 border border-[#E5E5E5] rounded-xl flex items-start gap-3">
                      <Calendar size={16} className="text-[#666666] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-[#111111]">Final Presentation</div>
                        <div className="text-xs text-[#666666] mt-0.5">June 15</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5]">
                  <h3 className="font-instrument text-xl mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left px-3 py-2 text-sm text-[#111111] hover:bg-[#F3F4F6] rounded-md transition-colors">Provide Feedback</button>
                    <button className="w-full text-left px-3 py-2 text-sm text-[#111111] hover:bg-[#F3F4F6] rounded-md transition-colors">Schedule Check-in</button>
                    <button className="w-full text-left px-3 py-2 text-sm text-[#111111] hover:bg-[#F3F4F6] rounded-md transition-colors">Assign Task</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Performance' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5]">
                <h3 className="font-instrument text-xl mb-4">Performance Trend</h3>
                <div className="h-64">
                  <Line 
                    data={chartData} 
                    options={{ 
                      responsive: true, maintainAspectRatio: false,
                      scales: { y: { min: 1, max: 5 } }
                    }} 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5]">
                  <h3 className="font-instrument text-xl mb-4">Strengths</h3>
                  <ul className="list-disc pl-5 text-sm text-[#374151] space-y-2">
                    <li>Quick learner, easily picks up new frameworks.</li>
                    <li>Excellent communication during standups.</li>
                    <li>Strong problem-solving mindset.</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5]">
                  <h3 className="font-instrument text-xl mb-4">Development Areas</h3>
                  <ul className="list-disc pl-5 text-sm text-[#374151] space-y-2">
                    <li>Needs to write more comprehensive unit tests.</li>
                    <li>Time management on larger scope tasks.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Placeholders for other tabs */}
          {['Logbook', 'Feedback', 'Tasks'].includes(activeTab) && (
            <div className="bg-white p-12 rounded-2xl border border-[#E5E5E5] flex flex-col items-center justify-center text-center">
              <FileText size={48} className="text-[#E5E5E5] mb-4" />
              <h3 className="font-instrument text-2xl text-[#111111] mb-2">{activeTab} Interface</h3>
              <p className="text-[#666666] text-sm max-w-md">
                Detailed view for {activeTab.toLowerCase()} is available in the full version of the dashboard.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
