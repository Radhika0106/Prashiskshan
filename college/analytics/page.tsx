"use client";

import { useState } from "react";
import { 
  BarChart, Download, Calendar, TrendingUp, RefreshCw, AlertTriangle, CheckCircle, ShieldAlert
} from "lucide-react";
import { 
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, 
  LineElement, Title, Tooltip, Legend, Filler 
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useInternsStore } from "@/lib/store/internsStore";
import { computeCollegeAnalytics, CollegeInternData } from "@/lib/engines/analytics-engine";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function AnalyticsReporting() {
  const [timeRange, setTimeRange] = useState('YTD');
  const [isExporting, setIsExporting] = useState(false);
  const { interns } = useInternsStore();

  // Map stores data to the analytics engine format
  const internData: CollegeInternData[] = interns.map(intern => {
    // Determine active internship status
    const hasInternship = intern.status === 'Active' || intern.status === 'Completed';
    
    // Readiness fallback based on performance or status
    let readinessScore = 74;
    if (intern.status === 'Completed') readinessScore = 92;
    if (intern.status === 'Upcoming') readinessScore = 35; // Trigger risk threshold for upcoming

    // Days since last activity mapping
    let daysSinceLastActivity = 2;
    if (intern.status === 'Completed') daysSinceLastActivity = 150;
    if (intern.status === 'Upcoming') daysSinceLastActivity = 30; // stale

    return {
      studentId: intern.id,
      hasInternship,
      hasLogbook: intern.logbookEntriesCount > 0,
      logbookEntries: intern.logbookEntriesCount,
      isEvaluated: intern.midTermEvaluationSubmitted || intern.finalEvaluationSubmitted,
      hoursLogged: intern.hoursLogged,
      requiredHours: 480,
      readinessScore,
      daysSinceLastActivity
    };
  });

  // Calculate dynamic analytics using our engine
  const metrics = computeCollegeAnalytics(internData);

  // Line Chart Data utilizing our computed metrics
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        fill: true,
        label: 'Placement Rate 2026',
        data: [45, 52, 58, 65, 72, metrics.placementRate, metrics.placementRate, metrics.placementRate, metrics.placementRate, metrics.placementRate, metrics.placementRate, metrics.placementRate],
        borderColor: '#111',
        backgroundColor: 'rgba(17, 17, 17, 0.05)',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const, align: 'end' as const, labels: { usePointStyle: true, boxWidth: 6, font: { family: 'inter' } } },
      tooltip: { backgroundColor: '#111', padding: 12, cornerRadius: 8, titleFont: { family: 'inter' }, bodyFont: { family: 'inter' } }
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: '#F3F4F6' }, min: 0, max: 100, ticks: { callback: (val: any) => val + '%' } }
    },
    interaction: { mode: 'index' as const, intersect: false },
  };

  const simulateExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 1500);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1400px] mx-auto animate-in fade-in duration-300 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
           <div className="flex items-center gap-3 mb-1">
             <div className="w-10 h-10 bg-[#111] text-white rounded-lg flex items-center justify-center">
               <BarChart size={20} />
             </div>
             <h1 className="font-instrument text-[32px] leading-none">Advanced Analytics</h1>
           </div>
          <p className="text-[#666] text-[14px] mt-2">Dynamic college-wide assessment, placement, and compliance metrics.</p>
        </div>
        
        <div className="flex gap-2">
           <button onClick={simulateExport} className="flex items-center gap-2 bg-white border border-[#E5E5E5] text-[#111] px-4 py-2 rounded-lg text-[13px] font-medium hover:border-[#111] transition-colors shadow-sm">
             {isExporting ? <RefreshCw size={16} className="animate-spin" /> : <Download size={16}/>} 
             Export Dataset (.csv)
           </button>
        </div>
      </div>

      {/* Analytics Scoreboards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-5 border-[#E5E5E5] bg-white shadow-sm flex flex-col justify-between">
          <div className="text-[12px] text-[#666] font-medium uppercase tracking-wide">NEP Compliance Score</div>
          <div className="font-jetbrains-mono text-[36px] my-2">{metrics.nepComplianceScore}%</div>
          <div className="w-full bg-[#E5E5E5] h-1 rounded-full overflow-hidden">
            <div className="bg-green-600 h-full" style={{ width: `${metrics.nepComplianceScore}%` }}></div>
          </div>
        </Card>

        <Card className="p-5 border-[#E5E5E5] bg-white shadow-sm flex flex-col justify-between">
          <div className="text-[12px] text-[#666] font-medium uppercase tracking-wide">Institutional Placement Rate</div>
          <div className="font-jetbrains-mono text-[36px] my-2">{metrics.placementRate}%</div>
          <div className="w-full bg-[#E5E5E5] h-1 rounded-full overflow-hidden">
            <div className="bg-black h-full" style={{ width: `${metrics.placementRate}%` }}></div>
          </div>
        </Card>

        <Card className="p-5 border-[#E5E5E5] bg-white shadow-sm flex flex-col justify-between">
          <div className="text-[12px] text-[#666] font-medium uppercase tracking-wide">Average Student Readiness</div>
          <div className="font-jetbrains-mono text-[36px] my-2">{metrics.avgReadinessScore}%</div>
          <div className="w-full bg-[#E5E5E5] h-1 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full" style={{ width: `${metrics.avgReadinessScore}%` }}></div>
          </div>
        </Card>

        <Card className="p-5 border-[#E5E5E5] bg-white shadow-sm flex flex-col justify-between">
          <div className="text-[12px] text-[#666] font-medium uppercase tracking-wide">At-Risk Students Flagged</div>
          <div className="font-jetbrains-mono text-[36px] my-2 text-red-600">{metrics.atRiskStudents.length}</div>
          <div className="text-[11px] text-[#666]">Requires attention</div>
        </Card>
      </div>

      {/* Main Chart Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-[#E5E5E5] rounded-[16px] shadow-sm overflow-hidden lg:col-span-2">
           <div className="p-6 border-b border-[#E5E5E5] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#FAFAFA]">
              <div>
                 <h3 className="font-medium text-[16px] flex items-center gap-2">Placement Trajectory <TrendingUp size={16} className="text-green-500" /></h3>
                 <p className="text-[12px] text-[#666]">Comparing current year cohort vs previous year</p>
              </div>
           </div>

           <div className="p-6 h-[320px]">
              <Line data={lineChartData} options={chartOptions} />
           </div>
        </div>

        {/* At Risk List Panel */}
        <div className="bg-white border border-[#E5E5E5] rounded-[16px] shadow-sm p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-instrument text-[22px] flex items-center gap-1.5 text-red-600 mb-2">
              <AlertTriangle size={20}/> At-Risk Alerts
            </h3>
            <p className="text-[13px] text-[#666] mb-4">Students flagged due to low readiness, missing logbook schedules, or stale activity logs.</p>
            
            <div className="space-y-3">
              {metrics.atRiskStudents.map(studentId => {
                const intern = interns.find(i => i.id === studentId);
                if (!intern) return null;
                return (
                  <div key={studentId} className="p-3 border border-red-100 bg-red-50/50 rounded-lg flex justify-between items-start">
                    <div>
                      <div className="font-medium text-sm text-[#111]">{intern.studentName}</div>
                      <div className="text-[11px] text-[#666]">{intern.rollNumber} • {intern.department}</div>
                      <div className="text-[11px] text-red-700 font-medium mt-1">
                        {intern.status === 'Upcoming' ? 'Low readiness score (<40)' : 'Missing regular logs'}
                      </div>
                    </div>
                    <Badge variant="danger">Risk</Badge>
                  </div>
                );
              })}
              {metrics.atRiskStudents.length === 0 && (
                <div className="text-center py-8 text-[#999] italic border border-dashed rounded-lg">
                  No at-risk students flagged.
                </div>
              )}
            </div>
          </div>
          <button className="w-full mt-4 py-2 border border-red-200 text-red-700 bg-red-50/50 rounded-lg text-xs font-semibold hover:bg-red-50 transition-colors">
            Notify Advisors
          </button>
        </div>
      </div>

      {/* Correlation Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         
         <div className="bg-white border border-[#E5E5E5] rounded-[16px] shadow-sm p-6">
            <h3 className="font-instrument text-[22px] mb-4">Correlation Analysis</h3>
            <p className="text-[13px] text-[#666] mb-6">Our model analyzes variables that most strongly influence student placement and readiness scores.</p>
            
            <div className="space-y-4">
               <div>
                  <div className="flex justify-between text-[13px] font-medium mb-1">
                    <span>Mentorship Sessions vs Placement</span>
                    <span className="text-green-600">Strong (+0.82)</span>
                  </div>
                  <div className="h-2 w-full bg-[#E5E5E5] rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[82%]"></div>
                  </div>
               </div>

               <div>
                  <div className="flex justify-between text-[13px] font-medium mb-1">
                    <span>Attendance Rate vs Readiness</span>
                    <span className="text-green-600">Moderate (+0.65)</span>
                  </div>
                  <div className="h-2 w-full bg-[#E5E5E5] rounded-full overflow-hidden">
                    <div className="h-full bg-green-400 w-[65%]"></div>
                  </div>
               </div>
            </div>
         </div>

         <div className="bg-white border border-[#E5E5E5] border-dashed rounded-[16px] p-6 bg-[#FAFAFA] flex flex-col items-center justify-center text-center">
            <CheckCircle size={32} className="text-green-500 mb-4" />
            <h3 className="font-medium text-[#111] mb-2">UGC & NEP Compliance Status</h3>
            <p className="text-[13px] text-[#666] max-w-sm mb-6">Your institution satisfies core credit structures and digitized credit transfers to the Academic Bank of Credits.</p>
            <Badge variant="success">Fully Compliant</Badge>
         </div>

      </div>

    </div>
  );
}
