"use client";

import { Intern } from "@/lib/store/internsStore";
import { Sparkles, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip 
} from "recharts";

export default function AnalyticsTab({ intern }: { intern: Intern }) {
  const { analytics } = intern;

  if (analytics.skillProgression.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-white border border-[#E5E5E5] rounded-full flex items-center justify-center mb-4">
          <TrendingUp size={24} className="text-[#999]" strokeWidth={1.5} />
        </div>
        <h3 className="font-instrument text-[20px] text-[#111]">No analytics data</h3>
        <p className="font-inter text-[14px] text-[#666] mt-1">Not enough data points collected to generate analytics.</p>
      </div>
    );
  }

  const chartData = analytics.weeklyTrend.map((score, index) => ({
    name: `W${index + 1}`,
    score
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6">
          <h3 className="font-instrument text-[20px] text-[#111] mb-6">Skill Progression</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={analytics.skillProgression}>
                <PolarGrid stroke="#E5E5E5" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#666', fontSize: 11, fontFamily: 'Inter' }} />
                <Radar name="Start" dataKey="start" stroke="#999" fill="#999" fillOpacity={0.2} />
                <Radar name="End" dataKey="end" stroke="#111" fill="#111" fillOpacity={0.5} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E5E5', fontFamily: 'Inter', fontSize: '12px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#999] opacity-40" />
              <span className="font-inter text-[12px] text-[#666]">Start of internship</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#111] opacity-60" />
              <span className="font-inter text-[12px] text-[#666]">Current</span>
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6">
          <h3 className="font-instrument text-[20px] text-[#111] mb-6">Weekly Performance Trend</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 11, fontFamily: 'Inter' }} dy={10} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 11, fontFamily: 'Inter' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', borderRadius: '8px', border: 'none', color: '#fff', fontFamily: 'Inter', fontSize: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="score" stroke="#111" strokeWidth={2} dot={{ r: 4, fill: '#111' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
            <span className="font-inter text-[12px] text-[#666]">Score based on logbook consistency, mentor ratings, and AI analysis</span>
          </div>
        </div>
      </div>

      {/* Middle Row: Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-inter font-medium text-[14px] text-[#111]">Task Completion</h4>
            <CheckCircle size={16} className="text-[#666]" />
          </div>
          <div className="flex items-end gap-3 mb-2">
            <span className="font-jetbrains-mono text-[32px] font-medium text-[#111] leading-none">
              {Math.round((analytics.taskStats.completed / analytics.taskStats.total) * 100)}%
            </span>
            <span className="font-inter text-[13px] text-[#666] pb-1">
              {analytics.taskStats.completed} of {analytics.taskStats.total}
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#F7F6F3] rounded-full overflow-hidden mt-4">
            <div 
              className="h-full bg-[#111]" 
              style={{ width: `${(analytics.taskStats.completed / analytics.taskStats.total) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-inter font-medium text-[14px] text-[#111]">On-Time Rate</h4>
            <Clock size={16} className="text-[#666]" />
          </div>
          <div className="flex items-end gap-3">
            <span className="font-jetbrains-mono text-[32px] font-medium text-[#111] leading-none">
              {analytics.taskStats.onTimeRate}%
            </span>
            <span className="font-inter text-[13px] text-[#666] pb-1">tasks on schedule</span>
          </div>
          <div className="font-inter text-[12px] text-[#666] mt-4 pt-4 border-t border-[#E5E5E5]">
            Avg. completion time: <strong className="text-[#111]">{analytics.taskStats.avgTimeDays} days</strong>
          </div>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-inter font-medium text-[14px] text-[#111]">Logbook Consistency</h4>
            <Sparkles size={16} className="text-[#666]" />
          </div>
          <div className="flex items-end gap-3">
            <span className="font-jetbrains-mono text-[32px] font-medium text-[#111] leading-none">High</span>
          </div>
          <div className="font-inter text-[12px] text-[#666] mt-4 pt-4 border-t border-[#E5E5E5]">
            AI reflection depth score indicates deep learning and self-awareness.
          </div>
        </div>
      </div>

      {/* Bottom Row: AI Insights */}
      <div className="bg-[#F7F6F3] border border-[#E5E5E5] rounded-[12px] p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-bl-full pointer-events-none opacity-50" />
        <div className="flex items-center gap-2 mb-6">
          <Sparkles size={18} className="text-[#111]" />
          <h3 className="font-instrument text-[20px] text-[#111]">AI-Generated Insights</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div>
            <h4 className="font-inter font-medium text-[13px] text-[#111] uppercase tracking-wide mb-3">Strengths</h4>
            <ul className="space-y-3">
              {analytics.insights.filter(i => i.type === 'Strength').map(insight => (
                <li key={insight.id} className="bg-white p-3 rounded-[8px] border border-[#E5E5E5] shadow-sm">
                  <div className="font-inter text-[13px] text-[#444]">{insight.text}</div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-inter font-medium text-[13px] text-[#111] uppercase tracking-wide mb-3">Growth Opportunities</h4>
            <ul className="space-y-3">
              {analytics.insights.filter(i => i.type === 'Opportunity').map(insight => (
                <li key={insight.id} className="bg-white p-3 rounded-[8px] border border-[#E5E5E5] shadow-sm">
                  <div className="font-inter text-[13px] text-[#444]">{insight.text}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
