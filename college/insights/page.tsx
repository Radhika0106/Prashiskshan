"use client";

import { useCollegeData } from "@/context/CollegeDataContext";
import { useState } from "react";
import { 
  Search, Filter, Download, UserPlus, FileText, 
  AlertCircle, MessageSquare, ChevronDown, Award
} from "lucide-react";
import { 
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, 
  Title, Tooltip, Legend, ArcElement, RadialLinearScale,
  PointElement, LineElement, Filler
} from 'chart.js';
import { Bar, Doughnut, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
  ArcElement, RadialLinearScale, PointElement, LineElement, Filler
);

export default function StudentInsights() {
  const [activeTab, setActiveTab] = useState('overview');

  // Chart Data: Histogram
  const histogramData = {
    labels: ['0-20', '21-40', '41-60', '61-80', '81-100'],
    datasets: [{
      label: 'Readiness Score Distribution',
      data: [12, 45, 128, 310, 105],
      backgroundColor: ['#EF4444', '#F97316', '#F59E0B', '#84CC16', '#22C55E'],
      borderRadius: 4,
    }]
  };

  // Chart Data: Donut
  const donutData = {
    labels: ['Completed', 'Active', 'Applied', 'Not Started'],
    datasets: [{
      data: [156, 312, 420, 362],
      backgroundColor: ['#22C55E', '#3B82F6', '#F59E0B', '#E5E5E5'],
      borderWidth: 0,
      cutout: '75%',
    }]
  };

  // Chart Data: Radar
  const radarData = {
    labels: ['Technical', 'Communication', 'Leadership', 'Problem-Solving', 'Collaboration', 'Domain'],
    datasets: [
      {
        label: 'Current Level',
        data: [70, 55, 45, 80, 65, 75],
        backgroundColor: 'rgba(17, 17, 17, 0.2)',
        borderColor: '#111',
        pointBackgroundColor: '#111',
      },
      {
        label: 'Industry Required',
        data: [85, 80, 70, 85, 80, 85],
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: '#999',
        borderDash: [5, 5],
        pointBackgroundColor: '#999',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1400px] mx-auto animate-in fade-in duration-300">
      
      {/* Page Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="font-instrument text-[32px]">Student Insights</h1>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center w-64 bg-white rounded-lg px-3 py-2 border border-[#E5E5E5] focus-within:border-[#111] transition-all">
            <Search size={16} className="text-[#999] mr-2 shrink-0" />
            <input type="text" placeholder="Search by name or roll no..." className="bg-transparent border-none outline-none w-full text-[13px] font-inter" />
          </div>
          <select className="bg-white border border-[#E5E5E5] rounded-lg px-3 py-2 text-[13px] outline-none hover:border-[#111]">
            <option>All Departments</option>
            <option>CSE</option>
            <option>ECE</option>
          </select>
          <select className="bg-white border border-[#E5E5E5] rounded-lg px-3 py-2 text-[13px] outline-none hover:border-[#111]">
            <option>All Years</option>
            <option>4th Year</option>
            <option>3rd Year</option>
          </select>
          <button className="bg-white border border-[#E5E5E5] rounded-lg p-2 text-[#666] hover:text-[#111] hover:border-[#111]">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex border-b border-[#E5E5E5] gap-6">
         {['overview', 'performance matrix', 'at-risk students'].map(tab => (
           <button 
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={`py-3 text-[14px] font-medium capitalize border-b-2 transition-colors ${
               activeTab === tab ? 'border-[#111] text-[#111]' : 'border-transparent text-[#666] hover:text-[#111]'
             }`}
           >
             {tab}
           </button>
         ))}
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in slide-in-from-right-4">
           
           {/* Chart Row */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-white border border-[#E5E5E5] rounded-[12px] shadow-sm p-5">
                 <h3 className="font-instrument text-[20px] mb-4">Readiness Distribution</h3>
                 <div className="h-[200px] w-full">
                   <Bar data={histogramData} options={{...chartOptions, scales: { x: { grid: { display: false } }, y: { grid: { display: false } } }}} />
                 </div>
              </div>

              <div className="bg-white border border-[#E5E5E5] rounded-[12px] shadow-sm p-5">
                 <h3 className="font-instrument text-[20px] mb-4">Skills Gap Analysis</h3>
                 <div className="h-[200px] w-full flex items-center justify-center">
                   <Radar data={radarData} options={{...chartOptions, scales: { r: { ticks: { display: false } } }}} />
                 </div>
              </div>

              <div className="bg-white border border-[#E5E5E5] rounded-[12px] shadow-sm p-5 relative flex flex-col items-center">
                 <h3 className="font-instrument text-[20px] mb-4 self-start">Internship Participation</h3>
                 <div className="h-[180px] w-[180px] relative">
                   <Doughnut data={donutData} options={chartOptions} />
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="font-jetbrains-mono text-2xl text-[#111] leading-none">1,250</span>
                     <span className="text-[10px] text-[#999] uppercase tracking-wider">Eligible</span>
                   </div>
                 </div>
                 <div className="flex gap-4 mt-2 text-[11px] font-medium text-[#666] flex-wrap justify-center">
                    <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>Completed</div>
                    <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span>Active</div>
                    <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>Applied</div>
                 </div>
              </div>

           </div>

           {/* Table Section */}
           <div className="bg-white border border-[#E5E5E5] rounded-[12px] shadow-sm overflow-hidden">
              <div className="p-4 border-b border-[#E5E5E5] flex justify-between items-center bg-[#FAFAFA]">
                 <h3 className="font-medium text-[15px]">Student Directory</h3>
                 <div className="flex gap-2">
                    <button className="text-[12px] font-medium text-[#666] flex items-center gap-1.5 px-3 py-1.5 border border-[#E5E5E5] rounded hover:bg-white hover:text-[#111]">
                       <Download size={14}/> Export CSV
                    </button>
                    <button className="text-[12px] font-medium text-[#666] flex items-center gap-1.5 px-3 py-1.5 border border-[#E5E5E5] rounded hover:bg-white hover:text-[#111]">
                       <FileText size={14}/> Generate Report
                    </button>
                 </div>
              </div>
              
              <div className="overflow-x-auto">
                 <table className="w-full text-left text-[14px]">
                    <thead className="bg-[#F7F6F3] text-[#666] text-[12px] font-medium border-b border-[#E5E5E5]">
                       <tr>
                         <th className="px-6 py-3 font-medium">Name & Roll No.</th>
                         <th className="px-6 py-3 font-medium">Department</th>
                         <th className="px-6 py-3 font-medium">Readiness</th>
                         <th className="px-6 py-3 font-medium">Current Status</th>
                         <th className="px-6 py-3 font-medium text-right">Actions</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E5E5]">
                       
                       <tr className="hover:bg-[#FAFAFA] transition-colors">
                          <td className="px-6 py-4">
                             <div className="font-medium text-[#111]">Priya Sharma</div>
                             <div className="text-[12px] text-[#999] font-jetbrains-mono mt-0.5">CS23001</div>
                          </td>
                          <td className="px-6 py-4 text-[#444]">CSE • 3rd Year</td>
                          <td className="px-6 py-4">
                             <div className="inline-flex flex-col">
                                <span className="font-jetbrains-mono text-[14px] font-medium text-[#16A34A]">92/100</span>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-green-50 text-green-700">Interning</span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                             <button className="text-[#666] hover:text-[#111] p-1.5 rounded transition-colors"><MessageSquare size={16}/></button>
                             <button className="text-[#666] hover:text-[#111] p-1.5 rounded transition-colors border border-[#E5E5E5] text-[12px] font-medium">Profile</button>
                          </td>
                       </tr>

                       <tr className="hover:bg-[#FAFAFA] transition-colors">
                          <td className="px-6 py-4">
                             <div className="font-medium text-[#111]">Rahul Verma</div>
                             <div className="text-[12px] text-[#999] font-jetbrains-mono mt-0.5">EC23045</div>
                          </td>
                          <td className="px-6 py-4 text-[#444]">ECE • 3rd Year</td>
                          <td className="px-6 py-4">
                             <div className="inline-flex flex-col">
                                <span className="font-jetbrains-mono text-[14px] font-medium text-[#DC2626]">38/100</span>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-red-50 text-red-700">Seeking</span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                             <button className="text-[#666] hover:text-[#111] p-1.5 rounded transition-colors"><MessageSquare size={16}/></button>
                             <button className="text-[#666] hover:text-[#111] p-1.5 rounded transition-colors border border-[#E5E5E5] text-[12px] font-medium">Profile</button>
                          </td>
                       </tr>

                       <tr className="hover:bg-[#FAFAFA] transition-colors">
                          <td className="px-6 py-4">
                             <div className="font-medium text-[#111]">Amit Patel</div>
                             <div className="text-[12px] text-[#999] font-jetbrains-mono mt-0.5">ME23089</div>
                          </td>
                          <td className="px-6 py-4 text-[#444]">MECH • 4th Year</td>
                          <td className="px-6 py-4">
                             <div className="inline-flex flex-col">
                                <span className="font-jetbrains-mono text-[14px] font-medium text-[#D97706]">65/100</span>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700">Applied</span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                             <button className="text-[#666] hover:text-[#111] p-1.5 rounded transition-colors"><MessageSquare size={16}/></button>
                             <button className="text-[#666] hover:text-[#111] p-1.5 rounded transition-colors border border-[#E5E5E5] text-[12px] font-medium">Profile</button>
                          </td>
                       </tr>

                    </tbody>
                 </table>
              </div>
              <div className="p-4 border-t border-[#E5E5E5] flex justify-between items-center text-[13px] text-[#666]">
                <div>Showing 1-3 of 1,250 students</div>
                <div className="flex gap-1">
                  <button className="px-3 py-1 border border-[#E5E5E5] rounded hover:bg-[#FAFAFA]" disabled>Prev</button>
                  <button className="px-3 py-1 border border-[#E5E5E5] rounded hover:bg-[#FAFAFA]">Next</button>
                </div>
              </div>
           </div>

        </div>
      )}

      {/* TAB CONTENT: PERFORMANCE MATRIX */}
      {activeTab === 'performance matrix' && (
        <div className="space-y-6 animate-in slide-in-from-right-4">
           {/* Top Performers Grid */}
           <div>
             <div className="flex items-center gap-2 mb-4">
               <Award size={20} className="text-[#16A34A]" />
               <h3 className="font-instrument text-[24px]">Top Performers Spotlight</h3>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
               {[1,2,3,4].map((i) => (
                 <div key={i} className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 shadow-sm text-center relative overflow-hidden group">
                   <div className="w-16 h-16 mx-auto bg-[#F7F6F3] border-2 border-white shadow-sm rounded-full flex items-center justify-center font-instrument text-2xl mb-3">S{i}</div>
                   <div className="font-medium text-[15px]">Student Name {i}</div>
                   <div className="text-[12px] text-[#666] mb-3">CSE • 3rd Year</div>
                   
                   <div className="px-3 py-2 bg-green-50 rounded-lg inline-block mb-4 border border-green-100">
                     <span className="block text-[10px] text-green-700 uppercase tracking-widest font-medium">Readiness</span>
                     <span className="font-jetbrains-mono text-[24px] text-green-700 leading-none">9{i}</span>
                   </div>

                   <button className="w-full py-2 text-[13px] font-medium border border-[#E5E5E5] rounded-lg group-hover:bg-[#111] group-hover:text-white group-hover:border-[#111] transition-colors">
                     View Profile
                   </button>
                 </div>
               ))}
             </div>
           </div>

           {/* Trend Chart placeholder */}
           <div className="bg-white border border-[#E5E5E5] rounded-[12px] shadow-sm p-6 mt-8 border-dashed flex items-center justify-center h-64 text-[#999] text-sm">
             [Interactive Performance Heatmap Canvas Rendered Here]
           </div>
        </div>
      )}

      {/* TAB CONTENT: AT-RISK STUDENTS */}
      {activeTab === 'at-risk students' && (
        <div className="flex gap-6 animate-in slide-in-from-right-4">
          
          {/* Filters Sidebar */}
          <div className="w-64 shrink-0 space-y-6">
             <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 shadow-sm">
                <h3 className="font-medium mb-4">Risk Criteria</h3>
                
                <div className="space-y-3">
                   <label className="flex items-start gap-2 cursor-pointer group">
                     <input type="checkbox" defaultChecked className="mt-1 accent-[#111]" />
                     <span className="text-[13px] text-[#444] group-hover:text-[#111] leading-tight">Readiness Score &lt; 40</span>
                   </label>
                   <label className="flex items-start gap-2 cursor-pointer group">
                     <input type="checkbox" defaultChecked className="mt-1 accent-[#111]" />
                     <span className="text-[13px] text-[#444] group-hover:text-[#111] leading-tight">No internship applications (3mo)</span>
                   </label>
                   <label className="flex items-start gap-2 cursor-pointer group">
                     <input type="checkbox" className="mt-1 accent-[#111]" />
                     <span className="text-[13px] text-[#444] group-hover:text-[#111] leading-tight">Zero peer sessions</span>
                   </label>
                   <label className="flex items-start gap-2 cursor-pointer group">
                     <input type="checkbox" className="mt-1 accent-[#111]" />
                     <span className="text-[13px] text-[#444] group-hover:text-[#111] leading-tight">CGPA &lt; 6.0</span>
                   </label>
                </div>

                <button className="w-full mt-6 py-2 bg-[#111] text-white text-[13px] font-medium rounded-lg">Apply Filters</button>
             </div>

             <div className="bg-[#F7F6F3] border border-[#E5E5E5] rounded-[12px] p-5 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#22C55E]"></div>
                <h3 className="font-medium mb-2 text-[14px]">Success Story</h3>
                <div className="text-[12px] text-[#666] italic leading-relaxed mb-3">
                  "Arjun from MECH raised his score from 38 to 72 after being assigned a priority mentor and taking the Communication lab."
                </div>
                <div className="font-jetbrains-mono text-[10px] text-[#999] uppercase tracking-wider">Intervention Impact</div>
             </div>
          </div>

          {/* At Risk List */}
          <div className="flex-1 bg-white border border-[#E5E5E5] rounded-[12px] shadow-sm overflow-hidden">
             
             <div className="p-4 border-b border-[#E5E5E5] bg-red-50 flex justify-between items-center">
                <div className="flex items-center gap-2 text-red-800">
                  <AlertCircle size={18}/>
                  <span className="font-medium text-[14px]">8 Students require immediate intervention</span>
                </div>
                <button className="text-[13px] font-medium bg-white border border-red-200 text-red-700 px-4 py-1.5 rounded-lg shadow-sm hover:bg-red-50">Bulk Action</button>
             </div>

             <table className="w-full text-left text-[14px]">
                <tbody className="divide-y divide-[#E5E5E5]">
                   {[1,2,3].map(i => (
                     <tr key={i} className="hover:bg-[#FAFAFA] transition-colors">
                        <td className="px-6 py-5">
                           <div className="font-medium text-[#111]">Student Name</div>
                           <div className="text-[12px] text-[#999] mt-0.5">ECE • 2nd Year</div>
                        </td>
                        <td className="px-6 py-5">
                           <div className="flex gap-1.5 flex-wrap">
                              <span className="px-2 py-0.5 bg-red-50 border border-red-100 text-red-600 rounded text-[11px] font-medium">Score: 35</span>
                              <span className="px-2 py-0.5 bg-amber-50 border border-amber-100 text-amber-600 rounded text-[11px] font-medium">0 Apps</span>
                           </div>
                        </td>
                        <td className="px-6 py-5">
                           <div className="text-[12px] text-[#666]">Unassigned</div>
                           <button className="text-[11px] text-[#3B82F6] hover:underline mt-0.5">Assign Mentor</button>
                        </td>
                        <td className="px-6 py-5 text-right">
                           <button className="text-[13px] font-medium border border-[#E5E5E5] bg-white px-3 py-1.5 rounded shadow-sm hover:border-[#111] transition-colors">
                             Create Plan
                           </button>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>

        </div>
      )}

    </div>
  );
}
