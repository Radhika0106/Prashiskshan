"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { TrendingUp, Clock, Zap, Download, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { LearningPath } from "@/lib/engines/types";

// Mock heatmap data (last 3 months)
const today = new Date();
const HEATMAP_DATA = Array.from({ length: 90 }).map((_, i) => {
  const date = new Date(today);
  date.setDate(date.getDate() - i);
  const count = Math.random() > 0.6 ? Math.floor(Math.random() * 4) + 1 : 0;
  return { date, count };
});

export default function AnalyticsTab({ path }: { path: LearningPath }) {
  const PROGRESS_DATA = [
    { name: 'Start', progress: 0 },
    { name: 'Match Check', progress: Math.round((path.gapAnalysis.matchedSkills.length / path.gapAnalysis.requiredSkills.length) * 100) },
    { name: 'Current Week', progress: Math.round((path.gapAnalysis.matchedSkills.length / path.gapAnalysis.requiredSkills.length) * 100) + 5 },
  ];

  const SKILL_DATA = [
    {
      name: 'Path Skills',
      acquired: path.gapAnalysis.matchedSkills.length,
      remaining: path.gapAnalysis.gapSkills.length,
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-6 border-[#E5E5E5] bg-white shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#1D4ED8]">
              <TrendingUp size={20} />
            </div>
            <div className="text-[14px] text-[#666] font-medium uppercase tracking-wide">Velocity</div>
          </div>
          <div className="font-jetbrains-mono text-[32px] mb-2">1.8 <span className="text-[14px] text-[#666]">tasks/wk</span></div>
          <div className="text-[13px] text-[#16A34A] flex items-center gap-1 font-medium">
            Steady learning pace
          </div>
        </Card>

        <Card className="p-6 border-[#E5E5E5] bg-white shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center text-[#DC2626]">
              <Clock size={20} />
            </div>
            <div className="text-[14px] text-[#666] font-medium uppercase tracking-wide">Estimated Path Duration</div>
          </div>
          <div className="font-jetbrains-mono text-[32px] mb-2">{path.estimatedWeeks} <span className="text-[14px] text-[#666]">weeks</span></div>
          <div className="text-[13px] text-[#666]">
            Total duration adjusted for skill profile
          </div>
        </Card>

        <Card className="p-6 border-[#E5E5E5] bg-white shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#FFFBEB] flex items-center justify-center text-[#D97706]">
              <Zap size={20} />
            </div>
            <div className="text-[14px] text-[#666] font-medium uppercase tracking-wide">Skills Acquired</div>
          </div>
          <div className="font-jetbrains-mono text-[32px] mb-2">{path.gapAnalysis.matchedSkills.length} <span className="text-[14px] text-[#666]">skills</span></div>
          <div className="text-[13px] text-[#666]">
            {path.gapAnalysis.gapSkills.length} skills remaining
          </div>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="p-6 border-[#E5E5E5] bg-[#FAFAFA] shadow-sm">
        <div className="flex items-start gap-4">
          <div className="mt-1"><Sparkles size={20} className="text-[#111]" /></div>
          <div>
            <h3 className="font-medium text-[#111] mb-2 text-[16px]">AI Progress Analysis</h3>
            <p className="text-[14px] text-[#666] leading-relaxed mb-4">
              Your learning roadmap is set to {path.estimatedWeeks} weeks. The gap analysis identified {path.gapAnalysis.gapSkills.length} key skills you need to target. 
              Since you already possess {path.gapAnalysis.matchedSkills.length} skills (including {path.gapAnalysis.matchedSkills.slice(0, 2).join(' & ')}), your baseline path duration was reduced.
            </p>
            <div className="bg-white p-3 border border-[#E5E5E5] rounded-lg inline-block shadow-sm">
              <span className="font-medium text-[13px]">Suggested action:</span>
              <span className="text-[13px] text-[#666] ml-2">Begin Phase 1 materials to target your next skills: {path.gapAnalysis.gapSkills.slice(0, 2).join(', ')}.</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Progress Over Time */}
        <Card className="p-6 border-[#E5E5E5] bg-white shadow-sm">
          <h3 className="font-instrument text-[24px] mb-6">Progress Over Time</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PROGRESS_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E5E5', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
                  itemStyle={{ color: '#111', fontSize: '13px', fontWeight: 500 }}
                  formatter={(value: any) => [`${value}%`, 'Completion']}
                />
                <Line type="monotone" dataKey="progress" stroke="#111111" strokeWidth={3} dot={{ r: 4, fill: '#111' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Skill Acquisition */}
        <Card className="p-6 border-[#E5E5E5] bg-white shadow-sm">
          <h3 className="font-instrument text-[24px] mb-6">Skill Balance Match</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SKILL_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E5E5" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#111' }} />
                <RechartsTooltip 
                  cursor={{ fill: '#F7F6F3' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E5E5' }}
                />
                <Bar dataKey="acquired" name="Acquired Skills" stackId="a" fill="#111111" />
                <Bar dataKey="remaining" name="Skills to Learn" stackId="a" fill="#E5E5E5" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Completion Patterns */}
      <Card className="p-6 border-[#E5E5E5] bg-white overflow-x-auto shadow-sm">
        <div className="flex items-center justify-between mb-8 min-w-[600px]">
          <h3 className="font-instrument text-[24px]">Activity Patterns</h3>
          <div className="flex items-center gap-2 text-[12px] text-[#666]">
            Less
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-[#F7F6F3]"></div>
              <div className="w-3 h-3 rounded-sm bg-[#D1D5DB]"></div>
              <div className="w-3 h-3 rounded-sm bg-[#9CA3AF]"></div>
              <div className="w-3 h-3 rounded-sm bg-[#4B5563]"></div>
              <div className="w-3 h-3 rounded-sm bg-[#111111]"></div>
            </div>
            More
          </div>
        </div>
        
        <div className="min-w-[600px]">
          <CalendarHeatmap
            startDate={new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000)}
            endDate={today}
            values={HEATMAP_DATA}
            classForValue={(value) => {
              if (!value || value.count === 0) return 'color-empty';
              return `color-scale-${Math.min(value.count, 4)}`;
            }}
            showWeekdayLabels={true}
          />
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          .react-calendar-heatmap text { font-size: 10px; fill: #999; }
          .react-calendar-heatmap .color-empty { fill: #F7F6F3; }
          .react-calendar-heatmap .color-scale-1 { fill: #D1D5DB; }
          .react-calendar-heatmap .color-scale-2 { fill: #9CA3AF; }
          .react-calendar-heatmap .color-scale-3 { fill: #4B5563; }
          .react-calendar-heatmap .color-scale-4 { fill: #111111; }
          .react-calendar-heatmap rect { rx: 2; ry: 2; }
        `}} />
      </Card>

    </div>
  );
}
