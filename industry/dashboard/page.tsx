"use client";

import { useIndustryStore } from "@/lib/store/industryStore";
import { 
  Briefcase, Users, UserCheck, TrendingUp, Database, 
  ArrowRight, Sparkles, Plus, Inbox, Calendar, Send,
  Eye, Star, X
} from "lucide-react";
import Link from "next/link";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function IndustryDashboardOverview() {
  const { openings, candidates, interns } = useIndustryStore();

  const activeOpenings = openings.filter(o => o.status === 'Active');
  const totalApplications = candidates.length;
  const unreviewedApps = candidates.filter(c => c.stage === 'New Applications').length;
  const activeInterns = interns.filter(i => i.weekOut < i.totalWeeks);
  
  // Application Funnel mock data
  const funnelData = {
    labels: ['Posted', 'Applied', 'Reviewed', 'Shortlisted', 'Interviewed', 'Offered', 'Accepted'],
    datasets: [
      {
        label: 'Candidates',
        data: [150, 120, 80, 40, 25, 10, 8],
        backgroundColor: [
          '#F3F4F6', '#F3F4F6', '#DBEAFE', '#DBEAFE', '#DBEAFE', '#D1FAE5', '#D1FAE5'
        ],
        borderRadius: 4,
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="font-instrument text-3xl tracking-tight text-[#111111] mb-2">Overview</h1>
        <p className="text-[#666666] font-inter text-sm">Monitor your talent pipeline and active internships.</p>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Active Openings */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center">
              <Briefcase size={16} className="text-[#666666]" />
            </div>
            <div className="px-2 py-0.5 bg-[#DBEAFE] text-[#1E3A8A] rounded-full font-mono text-[11px]">
              ↑ 3 new
            </div>
          </div>
          <div className="font-mono text-3xl text-[#111111] mb-1">{activeOpenings.length}</div>
          <div className="text-[#666666] font-inter text-[13px]">Active Openings</div>
        </div>

        {/* Total Applications */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center">
              <Users size={16} className="text-[#666666]" />
            </div>
            {unreviewedApps > 0 && (
              <div className="px-2 py-0.5 bg-[#FEF9C3] text-[#854D0E] rounded-full font-mono text-[11px]">
                {unreviewedApps} unreviewed
              </div>
            )}
          </div>
          <div className="font-mono text-3xl text-[#111111] mb-1">{totalApplications}</div>
          <div className="text-[#666666] font-inter text-[13px]">Total Applications</div>
        </div>

        {/* Current Interns */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center">
              <UserCheck size={16} className="text-[#666666]" />
            </div>
            <div className="px-2 py-0.5 bg-[#F3F4F6] text-[#374151] rounded-full font-mono text-[11px]">
              2 completing soon
            </div>
          </div>
          <div className="font-mono text-3xl text-[#111111] mb-1">{activeInterns.length}</div>
          <div className="text-[#666666] font-inter text-[13px]">Current Interns</div>
        </div>

        {/* Placement Success */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center">
              <TrendingUp size={16} className="text-[#666666]" />
            </div>
          </div>
          <div className="font-mono text-3xl text-[#111111] mb-1">68%</div>
          <div className="text-[#666666] font-inter text-[13px]">Conversion Rate</div>
        </div>

        {/* Talent Pool */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5] flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-4">
              <Database size={16} className="text-[#666666]" />
            </div>
            <div className="font-mono text-3xl text-[#111111] mb-1">420</div>
            <div className="text-[#666666] font-inter text-[13px]">Candidates in Pool</div>
          </div>
          <Link href="/industry/pool" className="text-sm font-medium hover:underline inline-flex items-center mt-2">
            Explore Pool <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column (60%) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Application Funnel */}
          <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5]">
            <h2 className="font-instrument text-2xl tracking-tight mb-6">Application Funnel</h2>
            <div className="h-64">
              <Bar 
                data={funnelData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false }
                  },
                  scales: {
                    y: { beginAtZero: true, grid: { display: false } },
                    x: { grid: { display: false } }
                  }
                }}
              />
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
            <div className="p-6 border-b border-[#E5E5E5] flex items-center justify-between">
              <h2 className="font-instrument text-2xl tracking-tight">Recent Applications</h2>
              <Link href="/industry/pipeline" className="text-sm font-medium hover:underline inline-flex items-center">
                View All <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-inter">
                <thead className="bg-[#F7F6F3] text-[#666666] font-medium border-b border-[#E5E5E5]">
                  <tr>
                    <th className="px-6 py-3">Candidate</th>
                    <th className="px-6 py-3">Applied For</th>
                    <th className="px-6 py-3">Score</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  {candidates.slice(0, 5).map(c => (
                    <tr key={c.id} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-[#111111]">{c.name}</div>
                        <div className="text-xs text-[#666666]">{c.college}</div>
                      </td>
                      <td className="px-6 py-4 text-[#666666]">{c.roleTitle}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full font-mono text-[11px] ${
                          c.readinessScore > 75 ? 'bg-[#D1FAE5] text-[#065F46]' : 
                          c.readinessScore > 60 ? 'bg-[#FEF9C3] text-[#854D0E]' : 
                          'bg-[#F3F4F6] text-[#374151]'
                        }`}>
                          {c.readinessScore}/100
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <button className="p-1.5 text-[#666666] hover:bg-[#E5E5E5] rounded"><Eye size={16} /></button>
                        <button className="p-1.5 text-[#666666] hover:bg-[#E5E5E5] rounded"><Star size={16} /></button>
                        <button className="p-1.5 text-[#666666] hover:bg-[#E5E5E5] rounded"><X size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Candidates */}
          <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5]">
            <h2 className="font-instrument text-2xl tracking-tight mb-6">Top Matches This Week</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {candidates.filter(c => c.matchScore > 85).slice(0, 3).map(c => (
                <div key={c.id} className="border border-[#E5E5E5] rounded-xl p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-[#F3F4F6] rounded-full flex items-center justify-center font-inter font-medium text-lg mb-3">
                    {c.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div className="font-medium text-[#111111]">{c.name}</div>
                  <div className="text-xs text-[#666666] mb-1">{c.roleTitle}</div>
                  <div className="text-[11px] text-[#999999] mb-3">{c.college}</div>
                  <div className="px-2 py-1 bg-[#D1FAE5] text-[#065F46] rounded-full font-mono text-[11px] mb-4">
                    {c.matchScore}% match
                  </div>
                  <div className="w-full flex gap-2">
                    <button className="flex-1 py-1.5 border border-[#E5E5E5] rounded-md text-xs font-medium hover:bg-[#F9FAFB]">View</button>
                    <button className="flex-1 py-1.5 bg-[#111111] text-white rounded-md text-xs font-medium hover:bg-black/90">Invite</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (40%) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI Insights */}
          <div className="bg-[#111111] text-white p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={20} className="text-[#D1FAE5]" />
              <h2 className="font-instrument text-2xl tracking-tight">Smart insights</h2>
            </div>
            <div className="space-y-6">
              <div className="pb-4 border-b border-white/10">
                <p className="font-inter text-sm text-white/80 leading-relaxed mb-3">
                  Candidates from IIT Delhi show 31% higher task completion rates in your engineering roles.
                </p>
                <Link href="/industry/post" className="text-sm font-medium text-[#D1FAE5] hover:underline flex items-center">
                  Target recruitment there <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
              <div className="pb-4 border-b border-white/10">
                <p className="font-inter text-sm text-white/80 leading-relaxed mb-3">
                  Your frontend roles take avg. 12 days to fill vs. industry avg. 8 days.
                </p>
                <Link href="/industry/pipeline" className="text-sm font-medium text-[#D1FAE5] hover:underline flex items-center">
                  Optimize screening process <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
              <div>
                <p className="font-inter text-sm text-white/80 leading-relaxed mb-3">
                  87% of top performers had cloud certifications before joining.
                </p>
                <Link href="/industry/post" className="text-sm font-medium text-[#D1FAE5] hover:underline flex items-center">
                  Add as requirement <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Link href="/industry/post" className="bg-white border border-[#E5E5E5] p-5 rounded-xl flex flex-col items-center justify-center text-center hover:border-[#111111] transition-colors">
              <Plus size={24} className="text-[#111111] mb-2" />
              <span className="font-medium text-sm">Post New Role</span>
            </Link>
            <Link href="/industry/pipeline" className="bg-white border border-[#E5E5E5] p-5 rounded-xl flex flex-col items-center justify-center text-center hover:border-[#111111] transition-colors">
              <Inbox size={24} className="text-[#111111] mb-2" />
              <span className="font-medium text-sm">Review Apps</span>
            </Link>
            <Link href="/industry/pipeline" className="bg-white border border-[#E5E5E5] p-5 rounded-xl flex flex-col items-center justify-center text-center hover:border-[#111111] transition-colors">
              <Calendar size={24} className="text-[#111111] mb-2" />
              <span className="font-medium text-sm">Schedule</span>
            </Link>
            <Link href="/industry/pipeline" className="bg-white border border-[#E5E5E5] p-5 rounded-xl flex flex-col items-center justify-center text-center hover:border-[#111111] transition-colors">
              <Send size={24} className="text-[#111111] mb-2" />
              <span className="font-medium text-sm">Send Offer</span>
            </Link>
          </div>

          {/* Intern Snapshot */}
          <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-instrument text-2xl tracking-tight">Intern Snapshot</h2>
              <Link href="/industry/interns" className="text-sm font-medium hover:underline">See All</Link>
            </div>
            <div className="space-y-4">
              {interns.slice(0, 4).map(intern => (
                <div key={intern.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center text-xs font-medium">
                      {intern.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-sm text-[#111111]">{intern.name}</div>
                      <div className="text-xs text-[#666666]">{intern.role}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="font-mono text-[11px] text-[#666666] mb-1">Wk {intern.weekOut}/{intern.totalWeeks}</div>
                    <div className="flex gap-0.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${intern.performance >= 1 ? 'bg-[#059669]' : 'bg-[#E5E5E5]'}`} />
                      <div className={`w-1.5 h-1.5 rounded-full ${intern.performance >= 2 ? 'bg-[#059669]' : 'bg-[#E5E5E5]'}`} />
                      <div className={`w-1.5 h-1.5 rounded-full ${intern.performance >= 3 ? 'bg-[#059669]' : 'bg-[#E5E5E5]'}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
