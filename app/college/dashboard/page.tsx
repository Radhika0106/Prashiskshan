"use client";

import { useCollegeData } from "@/context/CollegeDataContext";
import { 
  Users, Briefcase, Award, TrendingUp, AlertTriangle, 
  Sparkles, FileText, Calendar, Plus, Upload, CheckCircle2,
  Clock, CheckSquare, Bell, UserPlus, BookOpen
} from "lucide-react";
import { useState } from "react";
import { 
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, 
  Title, Tooltip, Legend 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function CollegeDashboard() {
  const { stats, recommendations } = useCollegeData();
  const [activePerfTab, setActivePerfTab] = useState('department');

  // Chart Data Setup
  const departmentChartData = {
    labels: ['CSE', 'ECE', 'MECH', 'CIVIL', 'MBA'],
    datasets: [
      {
        label: 'Avg Readiness Score',
        data: [82, 75, 68, 62, 85],
        backgroundColor: (context: any) => {
          const value = context.dataset.data[context.dataIndex];
          if (value > 75) return '#22C55E'; // Success
          if (value >= 60) return '#F59E0B'; // Amber
          return '#EF4444'; // Danger
        },
        borderRadius: 4,
        barThickness: 24,
      }
    ]
  };

  const chartOptions = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#111',
        titleFont: { family: 'Inter' },
        bodyFont: { family: 'Inter' },
        padding: 10,
        cornerRadius: 8,
      }
    },
    scales: {
      x: { grid: { display: false }, max: 100 },
      y: { grid: { display: false } }
    }
  };

  // Circular progress style calc
  const calcProgress = (value: number) => {
    return {
      background: `conic-gradient(${value > 75 ? '#22C55E' : value > 60 ? '#F59E0B' : '#EF4444'} ${value}%, #E5E5E5 ${value}%)`
    };
  };

  return (
    <div className="p-4 md:p-8 space-y-8 pb-20 max-w-[1400px] mx-auto animate-in fade-in duration-300">
      
      {/* 1. Hero Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-[13px] font-medium text-[#666] mb-2 uppercase tracking-wide">Total Students</div>
          <div className="font-jetbrains-mono text-[32px] text-[#111] leading-none mb-1">{stats.totalStudents}</div>
          <div className="text-[13px] text-[#666] mb-3">Across all departments</div>
          <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[11px] font-jetbrains-mono px-2 py-0.5 rounded">
            <TrendingUp size={12} /> 12% from last year
          </div>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-[13px] font-medium text-[#666] mb-2 uppercase tracking-wide">Active Internships</div>
          <div className="font-jetbrains-mono text-[32px] text-[#111] leading-none mb-1">{stats.interningStudents}</div>
          <div className="text-[13px] text-[#666] mb-3">out of {stats.eligibleStudents} eligible</div>
          <div className="w-full bg-[#E5E5E5] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#111] h-full" style={{ width: `${(stats.interningStudents/stats.eligibleStudents)*100}%` }}></div>
          </div>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="text-[13px] font-medium text-[#666] mb-2 uppercase tracking-wide">Avg. Readiness</div>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-jetbrains-mono text-[32px] text-[#111] leading-none">{stats.avgReadinessScore}</span>
              <span className="font-jetbrains-mono text-[16px] text-[#999]">/100</span>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={calcProgress(stats.avgReadinessScore)}>
              <div className="w-10 h-10 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-[13px] font-medium text-[#666] mb-2 uppercase tracking-wide">Faculty Members</div>
          <div className="font-jetbrains-mono text-[32px] text-[#111] leading-none mb-1">54</div>
          <div className="text-[13px] text-[#666] mb-3">Active faculty</div>
          <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[11px] font-jetbrains-mono px-2 py-0.5 rounded">
            <AlertTriangle size={12} /> 12 pending evaluations
          </div>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-[13px] font-medium text-[#666] mb-2 uppercase tracking-wide">Placement Rate</div>
          <div className="font-jetbrains-mono text-[32px] text-[#22C55E] leading-none mb-1">{stats.placementRate}%</div>
          <div className="text-[13px] text-[#666] mb-2">Target: 85%</div>
          <div className="w-full bg-[#E5E5E5] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#22C55E] h-full" style={{ width: `${stats.placementRate}%` }}></div>
          </div>
        </div>

      </div>

      {/* 2. Main Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* LEFT COLUMN (60%) */}
        <div className="lg:col-span-3 space-y-8">
           
           {/* Performance Overview */}
           <div className="bg-white border border-[#E5E5E5] rounded-[12px] shadow-sm overflow-hidden">
             <div className="px-6 py-5 border-b border-[#E5E5E5] flex items-center justify-between">
               <h2 className="font-instrument text-[24px]">Student Performance Overview</h2>
             </div>
             
             {/* Tabs */}
             <div className="flex border-b border-[#E5E5E5] px-2 bg-[#FAFAFA]">
                {['department', 'year', 'course'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActivePerfTab(tab)}
                    className={`px-4 py-3 text-[13px] font-medium capitalize border-b-2 transition-colors ${
                      activePerfTab === tab ? 'border-[#111] text-[#111]' : 'border-transparent text-[#666] hover:text-[#111]'
                    }`}
                  >
                    {tab}-wise
                  </button>
                ))}
             </div>

             <div className="p-6 h-[300px]">
                {activePerfTab === 'department' && (
                  <Bar options={chartOptions} data={departmentChartData} />
                )}
                {activePerfTab !== 'department' && (
                  <div className="h-full flex items-center justify-center text-[#999] font-inter text-sm border-2 border-dashed border-[#E5E5E5] rounded-xl">
                    Select Department tab to view demo analytics
                  </div>
                )}
             </div>
           </div>

           {/* Alerts & Action Items */}
           <div className="bg-white border border-[#E5E5E5] rounded-[12px] shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                 <Bell size={20} className="text-[#111]" />
                 <h2 className="font-instrument text-[24px]">Alerts & Actions</h2>
              </div>

              <div className="space-y-3">
                 <div className="p-4 rounded-xl border border-red-200 bg-red-50 flex items-start justify-between group transition-colors hover:bg-red-100">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span className="font-medium text-red-900 text-[14px]">High Priority</span>
                      </div>
                      <div className="text-[14px] text-red-800 ml-4">8 students with readiness score &lt;40 need intervention</div>
                    </div>
                    <button className="text-[13px] bg-white border border-red-200 text-red-700 px-3 py-1.5 rounded-lg shadow-sm hover:bg-red-50 font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">View Students</button>
                 </div>

                 <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 flex items-start justify-between group transition-colors hover:bg-amber-100">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span className="font-medium text-amber-900 text-[14px]">Medium Priority</span>
                      </div>
                      <div className="text-[14px] text-amber-800 ml-4">Faculty evaluations due in 3 days (12 pending)</div>
                    </div>
                    <button className="text-[13px] bg-white border border-amber-200 text-amber-700 px-3 py-1.5 rounded-lg shadow-sm hover:bg-amber-50 font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Send Reminder</button>
                 </div>

                 <div className="p-4 rounded-xl border border-blue-200 bg-blue-50 flex items-start justify-between group transition-colors hover:bg-blue-100">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span className="font-medium text-blue-900 text-[14px]">Information</span>
                      </div>
                      <div className="text-[14px] text-blue-800 ml-4">Monthly compliance report ready for download</div>
                    </div>
                    <button className="text-[13px] bg-blue-600 border border-blue-600 text-white px-3 py-1.5 rounded-lg shadow-sm hover:bg-blue-700 font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Download</button>
                 </div>
              </div>
           </div>

           {/* Recent Activity */}
           <div className="bg-white border border-[#E5E5E5] rounded-[12px] shadow-sm p-6">
              <h2 className="font-instrument text-[24px] mb-6">Recent Activity</h2>
              
              <div className="relative border-l border-[#E5E5E5] ml-3 space-y-8 pb-4">
                 <div className="relative pl-6">
                    <div className="absolute -left-[13px] top-1 w-[26px] h-[26px] bg-white border border-[#E5E5E5] rounded-full flex items-center justify-center text-[#666]">
                      <Briefcase size={12} />
                    </div>
                    <div className="font-medium text-[14px] text-[#111]">12 students completed internships this week</div>
                    <div className="font-jetbrains-mono text-[11px] text-[#999] mt-1">2h ago</div>
                 </div>

                 <div className="relative pl-6">
                    <div className="absolute -left-[13px] top-1 w-[26px] h-[26px] bg-white border border-[#E5E5E5] rounded-full flex items-center justify-center text-[#666]">
                      <Users size={12} />
                    </div>
                    <div className="font-medium text-[14px] text-[#111]">New partnership: Razorpay (15 internship slots)</div>
                    <div className="font-jetbrains-mono text-[11px] text-[#999] mt-1">5h ago</div>
                 </div>

                 <div className="relative pl-6">
                    <div className="absolute -left-[13px] top-1 w-[26px] h-[26px] bg-white border border-[#E5E5E5] rounded-full flex items-center justify-center text-[#666]">
                      <BookOpen size={12} />
                    </div>
                    <div className="font-medium text-[14px] text-[#111]">Curriculum review: CSE Department submitted</div>
                    <div className="font-jetbrains-mono text-[11px] text-[#999] mt-1">3d ago</div>
                 </div>
              </div>

              <button className="w-full mt-4 py-2 text-[13px] font-medium text-[#666] hover:text-[#111] transition-colors border border-[#E5E5E5] rounded-lg border-dashed">
                View All Activity →
              </button>
           </div>
        </div>


        {/* RIGHT COLUMN (40%) */}
        <div className="lg:col-span-2 space-y-8">
           
           {/* AI Insights Widget */}
           <div className="bg-[#111] rounded-[16px] p-6 text-white overflow-hidden relative shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={20} className="text-yellow-400" />
                  <h2 className="font-instrument text-[24px]">Smart Insights</h2>
                </div>
                <div className="text-[13px] text-[#999] mb-6">AI-generated from your institutional data</div>

                <div className="space-y-4">
                  {recommendations.slice(0, 3).map(rec => (
                    <div key={rec.id} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-[12px] p-4 hover:bg-white/15 transition-colors">
                      <div className="flex gap-3">
                         <Sparkles size={16} className="text-yellow-400 shrink-0 mt-1" />
                         <div>
                            <div className="text-[14px] text-white/90 leading-relaxed mb-2">{rec.reasoning}</div>
                            <button className="text-[13px] text-indigo-300 font-medium hover:text-indigo-200 transition-colors">
                              {rec.actionLabel}
                            </button>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 py-2.5 bg-white text-[#111] text-[13px] font-medium rounded-lg hover:bg-white/90 transition-colors shadow-sm">
                  View All Insights →
                </button>
              </div>
           </div>

           {/* Quick Actions Grid */}
           <div className="grid grid-cols-2 gap-3">
              <button className="bg-white border border-[#E5E5E5] rounded-[12px] p-4 flex flex-col items-center justify-center gap-2 hover:bg-[#F7F6F3] transition-colors hover:border-[#111] group">
                 <div className="w-10 h-10 bg-[#FAFAFA] border border-[#E5E5E5] rounded-full flex items-center justify-center text-[#666] group-hover:bg-white group-hover:text-[#111] transition-colors"><UserPlus size={18} /></div>
                 <span className="text-[13px] font-medium text-[#111]">Add Student</span>
              </button>
              <button className="bg-white border border-[#E5E5E5] rounded-[12px] p-4 flex flex-col items-center justify-center gap-2 hover:bg-[#F7F6F3] transition-colors hover:border-[#111] group">
                 <div className="w-10 h-10 bg-[#FAFAFA] border border-[#E5E5E5] rounded-full flex items-center justify-center text-[#666] group-hover:bg-white group-hover:text-[#111] transition-colors"><FileText size={18} /></div>
                 <span className="text-[13px] font-medium text-[#111]">Create Report</span>
              </button>
              <button className="bg-white border border-[#E5E5E5] rounded-[12px] p-4 flex flex-col items-center justify-center gap-2 hover:bg-[#F7F6F3] transition-colors hover:border-[#111] group">
                 <div className="w-10 h-10 bg-[#FAFAFA] border border-[#E5E5E5] rounded-full flex items-center justify-center text-[#666] group-hover:bg-white group-hover:text-[#111] transition-colors"><Calendar size={18} /></div>
                 <span className="text-[13px] font-medium text-[#111]">Schedule Event</span>
              </button>
              <button className="bg-white border border-[#E5E5E5] rounded-[12px] p-4 flex flex-col items-center justify-center gap-2 hover:bg-[#F7F6F3] transition-colors hover:border-[#111] group">
                 <div className="w-10 h-10 bg-[#FAFAFA] border border-[#E5E5E5] rounded-full flex items-center justify-center text-[#666] group-hover:bg-white group-hover:text-[#111] transition-colors"><Upload size={18} /></div>
                 <span className="text-[13px] font-medium text-[#111]">Bulk Upload</span>
              </button>
           </div>

           {/* Upcoming Events */}
           <div className="bg-white border border-[#E5E5E5] rounded-[12px] shadow-sm p-6 flex flex-col h-full">
              <h2 className="font-instrument text-[24px] mb-6">Upcoming Events</h2>
              
              <div className="space-y-4 flex-1">
                 <div className="flex items-start justify-between pb-4 border-b border-[#E5E5E5]">
                    <div>
                       <div className="font-medium text-[14px] text-[#111] mb-1">Razorpay Placement Drive</div>
                       <div className="font-jetbrains-mono text-[11px] text-[#666] flex items-center gap-2">
                         <Clock size={12}/> Tomorrow, 10:00 AM
                       </div>
                    </div>
                    <div className="text-[10px] font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded tracking-wide uppercase">Placement Drive</div>
                 </div>

                 <div className="flex items-start justify-between pb-4 border-b border-[#E5E5E5]">
                    <div>
                       <div className="font-medium text-[14px] text-[#111] mb-1">NEP Alignment Workshop</div>
                       <div className="font-jetbrains-mono text-[11px] text-[#666] flex items-center gap-2">
                         <Clock size={12}/> Oct 15, 2:00 PM
                       </div>
                    </div>
                    <div className="text-[10px] font-medium bg-purple-50 text-purple-700 px-2 py-1 rounded tracking-wide uppercase">Training</div>
                 </div>

                 <div className="flex items-start justify-between pb-4">
                    <div>
                       <div className="font-medium text-[14px] text-[#111] mb-1">HOD Monthly Review</div>
                       <div className="font-jetbrains-mono text-[11px] text-[#666] flex items-center gap-2">
                         <Clock size={12}/> Oct 18, 11:30 AM
                       </div>
                    </div>
                    <div className="text-[10px] font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded tracking-wide uppercase">Review Meeting</div>
                 </div>
              </div>

              <button className="text-[13px] font-medium text-[#111] hover:underline mt-4 text-left">
                View Calendar →
              </button>
           </div>

        </div>
      </div>
    </div>
  );
}
