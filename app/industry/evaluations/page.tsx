"use client";

import { useState } from "react";
import { useIndustryStore } from "@/lib/store/industryStore";
import { 
  ClipboardList, CheckCircle2, AlertCircle, Clock, 
  Download, Share2, Eye, Star, Filter, Search
} from "lucide-react";

export default function EvaluationsPage() {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <h1 className="font-instrument text-3xl tracking-tight text-[#111111] mb-2">Evaluations</h1>
          <p className="text-[#666666] font-inter text-sm">Manage mid-term and final performance reviews.</p>
        </div>
      </div>

      <div className="flex border-b border-[#E5E5E5] mb-6 shrink-0">
        <button 
          onClick={() => setActiveTab('pending')}
          className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'pending' ? 'border-[#111111] text-[#111111]' : 'border-transparent text-[#666666] hover:text-[#111111]'
          }`}
        >
          Pending
        </button>
        <button 
          onClick={() => setActiveTab('completed')}
          className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'completed' ? 'border-[#111111] text-[#111111]' : 'border-transparent text-[#666666] hover:text-[#111111]'
          }`}
        >
          Completed
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-12">
        {activeTab === 'pending' ? <PendingEvaluations /> : <CompletedEvaluations />}
      </div>
    </div>
  );
}

function PendingEvaluations() {
  const { interns } = useIndustryStore();
  const pending = interns.filter(i => i.status !== 'Completed').slice(0, 4); // Mock data slice

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <select className="px-3 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm bg-white focus:outline-none focus:border-[#111111]">
          <option>All Types</option>
          <option>Mid-term</option>
          <option>Final</option>
        </select>
        <label className="flex items-center gap-2 text-sm text-[#111111] cursor-pointer">
          <input type="checkbox" className="rounded border-[#E5E5E5] text-[#111111] focus:ring-[#111111]" /> Overdue only
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pending.map((intern, i) => (
          <div key={intern.id} className="bg-white p-5 rounded-2xl border border-[#E5E5E5] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="px-2.5 py-1 bg-[#F3F4F6] rounded-md font-mono text-[11px] text-[#374151]">
                  {i % 2 === 0 ? 'Mid-term Eval' : 'Final Eval'}
                </span>
                <div className="flex gap-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#DC2626]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#DC2626]"></div>
                  <div className={`w-1.5 h-1.5 rounded-full ${i===0 ? 'bg-[#DC2626]' : 'bg-[#E5E5E5]'}`}></div>
                </div>
              </div>
              <h3 className="font-instrument text-xl text-[#111111]">{intern.name}</h3>
              <p className="text-sm text-[#666666] mb-4">{intern.role}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <Clock size={14} className={i===0 ? 'text-[#DC2626]' : 'text-[#854D0E]'} />
                <span className={`text-xs font-mono ${i===0 ? 'text-[#DC2626]' : 'text-[#854D0E]'}`}>
                  {i === 0 ? 'Overdue by 2 days' : `Due in ${i*2 + 1} days`}
                </span>
              </div>
            </div>
            
            <button className="w-full py-2 bg-[#111111] text-white rounded-lg text-sm font-medium hover:bg-black/90 transition-colors">
              Complete Evaluation →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompletedEvaluations() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      {/* Aggregate Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="text-sm text-[#666666] mb-1">Total Evaluations</div>
          <div className="font-mono text-3xl text-[#111111]">124</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="text-sm text-[#666666] mb-1">Avg. Rating</div>
          <div className="font-mono text-3xl text-[#111111] flex items-center">
            4.2 <Star size={20} className="ml-2 fill-[#F59E0B] text-[#F59E0B]" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="text-sm text-[#666666] mb-1">Would Recommend</div>
          <div className="font-mono text-3xl text-[#111111]">87%</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-3">
          <select className="px-3 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm bg-white focus:outline-none focus:border-[#111111]">
            <option>All Dates</option>
            <option>Last 30 Days</option>
            <option>Last 6 Months</option>
          </select>
          <select className="px-3 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm bg-white focus:outline-none focus:border-[#111111]">
            <option>All Types</option>
            <option>Mid-term</option>
            <option>Final</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
            <input 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="pl-9 pr-4 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm focus:outline-none focus:border-[#111111] w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-[#E5E5E5] rounded-lg text-sm font-medium hover:bg-[#F9FAFB] bg-white">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E5E5] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-inter">
            <thead className="bg-[#F7F6F3] text-[#666666] font-medium border-b border-[#E5E5E5]">
              <tr>
                <th className="px-6 py-4">Intern</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Completed On</th>
                <th className="px-6 py-4">Overall Rating</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {[1,2,3,4,5].map((item) => (
                <tr key={item} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#111111]">Intern Name {item}</div>
                    <div className="text-xs text-[#666666]">Frontend Intern</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-[#F3F4F6] text-[#374151] rounded-md font-mono text-[11px]">
                      {item % 2 === 0 ? 'Mid-term' : 'Final'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#666666] font-mono text-xs">
                    May 1{item}, 2026
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(star => (
                        <Star key={star} size={14} className={star <= 4 ? "fill-[#111111] text-[#111111]" : "text-[#E5E5E5]"} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button className="p-1.5 text-[#666666] hover:bg-[#E5E5E5] rounded"><Eye size={16} /></button>
                    <button className="p-1.5 text-[#666666] hover:bg-[#E5E5E5] rounded"><Download size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
