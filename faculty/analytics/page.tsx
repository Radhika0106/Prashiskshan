"use client";

import { Card, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Download } from "lucide-react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line, Bar, Pie, Radar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, ArcElement, Title, Tooltip, Legend, Filler);

// Chart Options
const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { beginAtZero: true, grid: { color: '#E5E5E5' }, border: { display: false } },
    x: { grid: { display: false }, border: { display: false } }
  }
};

export default function FacultyAnalytics() {
  const placementTrendsData = {
    labels: ['Fall 2024', 'Spring 2025', 'Fall 2025', 'Spring 2026'],
    datasets: [{
      label: 'Placement %',
      data: [65, 72, 80, 85],
      borderColor: '#111111',
      backgroundColor: 'rgba(17, 17, 17, 0.05)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#111111'
    }]
  };

  const topCompaniesData = {
    labels: ['Razorpay', 'Swiggy', 'TCS', 'Adobe', 'Microsoft'],
    datasets: [{
      data: [24, 18, 45, 12, 8],
      backgroundColor: ['#111111', '#444444', '#666666', '#999999', '#CCCCCC'],
      borderRadius: 4
    }]
  };

  const skillGapData = {
    labels: ['React', 'Python', 'System Design', 'Communication', 'UI/UX', 'Cloud'],
    datasets: [
      { label: 'Required by Industry', data: [90, 85, 75, 95, 70, 80], backgroundColor: 'rgba(17, 17, 17, 0.1)', borderColor: '#111111', pointBackgroundColor: '#111111' },
      { label: 'Student Proficiency', data: [75, 80, 45, 70, 65, 50], backgroundColor: 'rgba(37, 99, 235, 0.2)', borderColor: '#2563EB', pointBackgroundColor: '#2563EB' }
    ]
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-instrument text-[32px] leading-tight">Analytics & Insights</h1>
          <p className="text-[#666] text-sm mt-1">Data-driven insights to improve student outcomes.</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium border border-[#E5E5E5] bg-white rounded-md hover:bg-[#FAFAFA] flex items-center gap-2">
          <Download size={16} /> Export PDF Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <Card>
            <CardTitle className="text-xl">Placement Trends</CardTitle>
            <div className="h-64">
               <Line data={placementTrendsData} options={baseOptions} />
            </div>
         </Card>

         <Card>
            <CardTitle className="text-xl">Skill Gap Analysis</CardTitle>
            <div className="text-sm text-[#666] mb-4">Comparing industry requirements vs student proficiency</div>
            <div className="h-[280px] flex justify-center">
               <Radar data={skillGapData} options={{...baseOptions, scales: { r: { beginAtZero: true, max: 100 } }, plugins: { legend: { display: true, position: 'bottom' }}}} />
            </div>
         </Card>

         <Card className="lg:col-span-2">
            <CardTitle className="text-xl">Top Recruiting Companies</CardTitle>
            <div className="h-64">
               <Bar data={topCompaniesData} options={{...baseOptions, indexAxis: 'y'}} />
            </div>
         </Card>

      </div>
    </div>
  );
}
