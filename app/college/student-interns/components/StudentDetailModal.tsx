"use client";

import { useState } from "react";
import { useInternsStore } from "@/lib/store/internsStore";
import { X, Star } from "lucide-react";
import OverviewTab from "./tabs/OverviewTab";
import LogbookTab from "./tabs/LogbookTab";
import EvaluationsTab from "./tabs/EvaluationsTab";
import AnalyticsTab from "./tabs/AnalyticsTab";
import ReportPreviewTab from "./tabs/ReportPreviewTab";

type Tab = 'Overview' | 'Logbook' | 'Evaluations' | 'Performance Analytics' | 'Report Preview';

const TABS: Tab[] = ['Overview', 'Logbook', 'Evaluations', 'Performance Analytics', 'Report Preview'];

export default function StudentDetailModal() {
  const { interns, selectedInternId, setSelectedIntern } = useInternsStore();
  const [activeTab, setActiveTab] = useState<Tab>('Overview');

  const intern = interns.find(i => i.id === selectedInternId);

  if (!intern) return null;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Completed': return 'bg-gray-100 text-gray-700';
      case 'Upcoming': return 'bg-blue-100 text-blue-700';
      case 'On Hold': return 'bg-yellow-100 text-yellow-700';
      case 'Terminated': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm">
      <div 
        className="w-full max-w-6xl h-full max-h-[90vh] bg-[#F7F6F3] rounded-[16px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="bg-white px-8 py-6 border-b border-[#E5E5E5] shrink-0 relative">
          <button 
            onClick={() => setSelectedIntern(null)}
            className="absolute top-6 right-8 p-2 text-[#999] hover:text-[#111] hover:bg-[#F7F6F3] rounded-full transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mr-12">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-[#111] text-white flex items-center justify-center font-instrument text-[32px] shrink-0">
                {intern.avatarInitials}
              </div>
              <div>
                <h2 className="font-instrument text-[32px] text-[#111] leading-none mb-2">{intern.studentName}</h2>
                <div className="flex items-center gap-3">
                  <span className="font-inter text-[14px] text-[#666]">{intern.rollNumber}</span>
                  <span className="w-1 h-1 rounded-full bg-[#CCC]" />
                  <span className="font-jetbrains-mono text-[12px] bg-[#E5E5E5] text-[#444] px-2 py-0.5 rounded uppercase tracking-wider">
                    {intern.department}
                  </span>
                </div>
                
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="font-inter font-medium text-[16px] text-[#111]">
                    {intern.roleTitle} <span className="font-normal text-[#666]">at</span> {intern.companyName}
                  </div>
                  <span className="hidden sm:inline w-1 h-1 rounded-full bg-[#CCC]" />
                  <div className="font-jetbrains-mono text-[13px] text-[#666]">
                    {new Date(intern.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} → {new Date(intern.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} ({intern.durationWeeks} weeks)
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
              <div className="flex items-center gap-4">
                {intern.performanceRating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star size={24} className="text-[#111] fill-[#111]" />
                    <span className="font-jetbrains-mono text-[24px] font-medium text-[#111]">{intern.performanceRating}</span>
                  </div>
                )}
                <span className={`inline-block px-3 py-1.5 rounded-full font-inter text-[13px] font-medium ${getStatusColor(intern.status)}`}>
                  {intern.status}
                </span>
              </div>
              
              <button 
                onClick={() => setActiveTab('Report Preview')}
                className="bg-[#111] text-white px-6 py-2.5 rounded-[8px] font-inter text-[14px] font-medium hover:bg-black transition-colors"
              >
                Generate Full Report →
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white px-8 border-b border-[#E5E5E5] shrink-0 overflow-x-auto hide-scrollbar">
          <div className="flex items-center gap-8 min-w-max">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  py-4 font-inter text-[14px] font-medium border-b-2 transition-colors
                  ${activeTab === tab 
                    ? 'border-[#111] text-[#111]' 
                    : 'border-transparent text-[#666] hover:text-[#111] hover:border-[#CCC]'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {activeTab === 'Overview' && <OverviewTab intern={intern} />}
          {activeTab === 'Logbook' && <LogbookTab intern={intern} />}
          {activeTab === 'Evaluations' && <EvaluationsTab intern={intern} />}
          {activeTab === 'Performance Analytics' && <AnalyticsTab intern={intern} />}
          {activeTab === 'Report Preview' && <ReportPreviewTab />}
        </div>
      </div>
    </div>
  );
}
