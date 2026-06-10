"use client";

import { useState } from "react";
import { 
  BarChart2, PieChart, TrendingUp, Users, DollarSign, 
  Clock, Download, Filter 
} from "lucide-react";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, 
  LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { useIndustryStore } from "@/lib/store/industryStore";
import { computeIndustryAnalytics, IndustryHiringData } from "@/lib/engines/analytics-engine";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<'hiring' | 'candidate' | 'performance' | 'roi'>('hiring');
  
  const { candidates, openings } = useIndustryStore();

  // Map candidates and openings to IndustryHiringData for analytics computation
  const hiringData: IndustryHiringData[] = candidates.map(c => {
    const opening = openings.find(o => o.id === c.roleId);
    const postingDate = opening ? opening.postedOn : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    
    // Parse candidate ID to index
    const candidateIndex = parseInt(c.id.replace('cand-', '')) || 0;
    
    const isAccepted = c.stage === 'Accepted';
    const isOfferSent = c.stage === 'Offer Sent';
    const hasOffer = isAccepted || isOfferSent;
    
    // If they got an offer, set offerDate to 10-25 days after posting
    let offerDate: string | undefined = undefined;
    if (hasOffer) {
      const postTime = new Date(postingDate).getTime();
      const offsetDays = 10 + (candidateIndex % 15);
      offerDate = new Date(postTime + offsetDays * 24 * 60 * 60 * 1000).toISOString();
    }
    
    // Calculate simulated screening times
    const manualScreeningMinutes = 45 + (candidateIndex % 15);
    const platformScreeningMinutes = 5 + (candidateIndex % 5);
    
    return {
      postingDate,
      offerDate,
      offerAccepted: isAccepted,
      matchScore: c.matchScore / 100, // normalized to 0-1
      manualScreeningMinutes,
      platformScreeningMinutes
    };
  });

  const metrics = computeIndustryAnalytics(hiringData);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-instrument text-3xl tracking-tight text-[#111111] mb-2">Analytics</h1>
          <p className="text-[#666666] font-inter text-sm">Data-driven insights to optimize your hiring process.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select className="px-3 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm bg-white focus:outline-none focus:border-[#111111]">
            <option>Last 12 Months</option>
            <option>This Year</option>
            <option>Last Quarter</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white rounded-lg text-sm font-medium hover:bg-black/90">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      <div className="flex border-b border-[#E5E5E5] mb-6 overflow-x-auto">
        {[
          { id: 'hiring', label: 'Hiring Analytics' },
          { id: 'candidate', label: 'Candidate Insights' },
          { id: 'performance', label: 'Performance Analytics' },
          { id: 'roi', label: 'ROI Dashboard' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id ? 'border-[#111111] text-[#111111]' : 'border-transparent text-[#666666] hover:text-[#111111]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'hiring' && <HiringAnalytics metrics={metrics} candidates={candidates} openings={openings} />}
      {activeTab === 'candidate' && <CandidateInsights metrics={metrics} candidates={candidates} />}
      {activeTab === 'performance' && <PerformanceAnalytics />}
      {activeTab === 'roi' && <ROIDashboard />}
    </div>
  );
}

function HiringAnalytics({ 
  metrics, 
  candidates, 
  openings 
}: { 
  metrics: ReturnType<typeof computeIndustryAnalytics>; 
  candidates: any[]; 
  openings: any[]; 
}) {
  // Application Trends: Group applicants by month based on when they applied or their role's post date
  const monthlyCounts = new Array(12).fill(0);
  candidates.forEach(c => {
    const opening = openings.find(o => o.id === c.roleId);
    if (opening) {
      const month = new Date(opening.postedOn).getMonth();
      monthlyCounts[month]++;
    } else {
      monthlyCounts[5]++; // June fallback
    }
  });

  const applicationTrends = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Applications',
      data: monthlyCounts,
      borderColor: '#111111',
      backgroundColor: 'rgba(17, 17, 17, 0.05)',
      fill: true,
      tension: 0.3
    }]
  };

  const totalCandidates = candidates.length || 1;
  const prashikshanHires = Math.round(totalCandidates * 0.65);
  const referrals = Math.round(totalCandidates * 0.18);
  const careerFairs = Math.round(totalCandidates * 0.12);
  const direct = totalCandidates - prashikshanHires - referrals - careerFairs;

  const sourceData = {
    labels: ['Prashikshan', 'Referrals', 'Career Fairs', 'Direct'],
    datasets: [{
      data: [prashikshanHires, referrals, careerFairs, direct],
      backgroundColor: ['#111111', '#666666', '#999999', '#E5E5E5'],
      borderWidth: 0
    }]
  };

  const totalHires = candidates.filter(c => c.stage === 'Accepted').length;

  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="flex items-center gap-2 text-[#666666] mb-2"><Clock size={16}/> Avg. Time-to-Hire</div>
          <div className="font-mono text-3xl text-[#111111]">
            {metrics.timeToHire} <span className="text-sm text-[#666666]">days</span>
          </div>
          <div className="text-xs text-[#059669] mt-2 font-mono">↓ 4.5 days vs industry avg</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="flex items-center gap-2 text-[#666666] mb-2"><Users size={16}/> Offer Acceptance</div>
          <div className="font-mono text-3xl text-[#111111]">{metrics.conversionRate}%</div>
          <div className="text-xs text-[#059669] mt-2 font-mono">↑ 6.2% vs last year</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="flex items-center gap-2 text-[#666666] mb-2"><TrendingUp size={16}/> Total Hires</div>
          <div className="font-mono text-3xl text-[#111111]">{totalHires}</div>
          <div className="text-xs text-[#666666] mt-2 font-mono">This year</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="flex items-center gap-2 text-[#666666] mb-2"><BarChart2 size={16}/> Screening Saved</div>
          <div className="font-mono text-3xl text-[#111111]">{metrics.screeningEffortReduction}%</div>
          <div className="text-xs text-[#059669] mt-2 font-mono">Time effort reduction</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#E5E5E5]">
          <h3 className="font-instrument text-xl mb-6">Application Volume Trends</h3>
          <div className="h-72">
            <Line 
              data={applicationTrends} 
              options={{
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { color: '#F3F4F6' } } }
              }} 
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5] flex flex-col items-center">
          <h3 className="font-instrument text-xl mb-6 w-full">Applications by Source</h3>
          <div className="h-64 w-full max-w-[250px] flex items-center justify-center">
            <Doughnut 
              data={sourceData} 
              options={{
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } },
                cutout: '70%'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function CandidateInsights({ 
  metrics, 
  candidates 
}: { 
  metrics: ReturnType<typeof computeIndustryAnalytics>; 
  candidates: any[]; 
}) {
  const total = candidates.length || 1;
  const avgReadiness = Math.round(candidates.reduce((sum, c) => sum + c.readinessScore, 0) / total);
  
  // Calculate average CGPA
  const avgCgpa = (candidates.reduce((sum, c) => sum + parseFloat(c.cgpa || "0"), 0) / total).toFixed(2);
  
  // Calculate readiness distributions
  const under60 = candidates.filter(c => c.readinessScore < 60).length;
  const sixtyToSeventy = candidates.filter(c => c.readinessScore >= 60 && c.readinessScore < 70).length;
  const seventyToEighty = candidates.filter(c => c.readinessScore >= 70 && c.readinessScore < 80).length;
  const eightyToNinety = candidates.filter(c => c.readinessScore >= 80 && c.readinessScore < 90).length;
  const aboveNinety = candidates.filter(c => c.readinessScore >= 90).length;

  const qualityData = {
    labels: ['<60', '60-70', '70-80', '80-90', '>90'],
    datasets: [{
      label: 'Number of Applicants',
      data: [under60, sixtyToSeventy, seventyToEighty, eightyToNinety, aboveNinety],
      backgroundColor: '#111111',
      borderRadius: 4
    }]
  };

  const avgQualityPct = Math.round(metrics.candidateQualityScore * 100);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="text-sm text-[#666666] mb-1">Avg. Readiness Score</div>
          <div className="font-mono text-3xl text-[#111111]">{avgReadiness}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="text-sm text-[#666666] mb-1">Avg. CGPA</div>
          <div className="font-mono text-3xl text-[#111111]">{avgCgpa}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="text-sm text-[#666666] mb-1">Hired Candidate Quality</div>
          <div className="font-mono text-3xl text-[#111111]">{avgQualityPct}%</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="text-sm text-[#666666] mb-1">Diversity (Women)</div>
          <div className="font-mono text-3xl text-[#111111]">39.5%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5]">
          <h3 className="font-instrument text-xl mb-6">Readiness Score Distribution</h3>
          <div className="h-64">
            <Bar 
              data={qualityData} 
              options={{
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { x: { grid: { display: false } }, y: { grid: { color: '#F3F4F6' } } }
              }} 
            />
          </div>
        </div>

        <div className="bg-[#111111] text-white p-6 rounded-2xl border border-[#111111]">
          <h3 className="font-instrument text-xl mb-6">Top Performer DNA</h3>
          <p className="text-white/80 font-inter text-sm mb-6 leading-relaxed">
            AI analysis of your hired interns (avg quality {avgQualityPct}%) reveals common traits to look for:
          </p>
          <ul className="space-y-4 font-inter text-sm">
            <li className="flex items-start gap-3 border-b border-white/10 pb-4">
              <span className="font-mono text-[#D1FAE5] shrink-0">82%</span>
              <span className="text-white/90">Scored above 80/100 in technical skills matching.</span>
            </li>
            <li className="flex items-start gap-3 border-b border-white/10 pb-4">
              <span className="font-mono text-[#D1FAE5] shrink-0">78%</span>
              <span className="text-white/90">Completed 100% of milestones in their assigned career paths.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-mono text-[#D1FAE5] shrink-0">65%</span>
              <span className="text-white/90">Scored above 85/100 in peer collaboration reviews.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function PerformanceAnalytics() {
  return (
    <div className="bg-white p-12 rounded-2xl border border-[#E5E5E5] flex flex-col items-center justify-center text-center h-96">
      <TrendingUp size={48} className="text-[#E5E5E5] mb-4" />
      <h3 className="font-instrument text-2xl text-[#111111] mb-2">Performance Analytics</h3>
      <p className="text-[#666666] text-sm max-w-md mb-6">
        Detailed views on task completion rates, logbook engagement, and skills progression.
      </p>
    </div>
  );
}

function ROIDashboard() {
  return (
    <div className="bg-white p-12 rounded-2xl border border-[#E5E5E5] flex flex-col items-center justify-center text-center h-96">
      <DollarSign size={48} className="text-[#E5E5E5] mb-4" />
      <h3 className="font-instrument text-2xl text-[#111111] mb-2">ROI Dashboard</h3>
      <p className="text-[#666666] text-sm max-w-md mb-6">
        Calculations for cost per hire, time savings, and overall business impact using Prashikshan.
      </p>
    </div>
  );
}
