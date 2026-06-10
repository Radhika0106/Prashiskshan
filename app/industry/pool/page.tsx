"use client";

import { useState } from "react";
import { useIndustryStore } from "@/lib/store/industryStore";
import { 
  Database, Search, Filter, Mail, Plus, MoreHorizontal, 
  Tag, Download, Users, Briefcase
} from "lucide-react";

export default function TalentPoolPage() {
  const { candidates } = useIndustryStore();
  const pool = candidates.slice(0, 42); // Mock talent pool subset

  const [search, setSearch] = useState("");
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  const segments = [
    { name: "Frontend Developers", count: 18 },
    { name: "Data Science", count: 8 },
    { name: "Returning Candidates", count: 4 },
  ];

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedCandidates(pool.map(c => c.id));
    else setSelectedCandidates([]);
  };

  const handleSelect = (id: string) => {
    if (selectedCandidates.includes(id)) setSelectedCandidates(selectedCandidates.filter(c => c !== id));
    else setSelectedCandidates([...selectedCandidates, id]);
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col pb-12">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-instrument text-3xl tracking-tight text-[#111111] mb-2">Talent Pool</h1>
          <p className="text-[#666666] font-inter text-sm">Your private database of saved candidates.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-[#E5E5E5] rounded-lg text-sm font-medium hover:bg-[#F9FAFB] bg-white">
            <Plus size={16} /> Add Candidate
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="text-sm text-[#666666] mb-1">Total in Pool</div>
          <div className="font-mono text-3xl text-[#111111]">420</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="text-sm text-[#666666] mb-1">Added This Month</div>
          <div className="font-mono text-3xl text-[#111111]">45</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="text-sm text-[#666666] mb-1">Segments Created</div>
          <div className="font-mono text-3xl text-[#111111]">12</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="text-sm text-[#666666] mb-1">Recent Hires from Pool</div>
          <div className="font-mono text-3xl text-[#111111]">8</div>
        </div>
      </div>

      {/* Segments */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-[#111111] mr-2">Segments:</span>
        <button className="px-3 py-1.5 bg-[#111111] text-white border border-[#111111] rounded-full text-xs font-medium">
          All Candidates
        </button>
        {segments.map(s => (
          <button key={s.name} className="px-3 py-1.5 bg-white text-[#666666] border border-[#E5E5E5] rounded-full text-xs font-medium hover:bg-[#F9FAFB]">
            {s.name} ({s.count})
          </button>
        ))}
        <button className="px-3 py-1.5 bg-white text-[#666666] border border-dashed border-[#E5E5E5] rounded-full text-xs font-medium hover:bg-[#F9FAFB] flex items-center gap-1">
          <Plus size={12} /> Create Segment
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-t-2xl border border-[#E5E5E5] flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-3">
          {selectedCandidates.length > 0 ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{selectedCandidates.length} selected</span>
              <div className="h-4 w-px bg-[#E5E5E5]"></div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#111111] text-white rounded-lg text-sm font-medium hover:bg-black/90">
                <Mail size={14} /> Email Campaign
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5E5E5] text-[#111111] rounded-lg text-sm font-medium hover:bg-[#F9FAFB]">
                <Tag size={14} /> Add Tags
              </button>
            </div>
          ) : (
            <>
              <select className="px-3 py-1.5 border border-[#E5E5E5] rounded-lg font-inter text-sm bg-white focus:outline-none focus:border-[#111111]">
                <option>All Skills</option>
                <option>React</option>
                <option>Python</option>
              </select>
              <select className="px-3 py-1.5 border border-[#E5E5E5] rounded-lg font-inter text-sm bg-white focus:outline-none focus:border-[#111111]">
                <option>Experience Level</option>
                <option>Entry</option>
                <option>Intermediate</option>
              </select>
            </>
          )}
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
          <input 
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search pool..."
            className="pl-9 pr-4 py-1.5 border border-[#E5E5E5] rounded-lg font-inter text-sm focus:outline-none focus:border-[#111111] w-64"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border-x border-b border-[#E5E5E5] rounded-b-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-inter">
            <thead className="bg-[#F7F6F3] text-[#666666] font-medium border-b border-[#E5E5E5]">
              <tr>
                <th className="px-6 py-3 w-12">
                  <input 
                    type="checkbox" 
                    checked={selectedCandidates.length === pool.length}
                    onChange={handleSelectAll}
                    className="rounded border-[#E5E5E5] text-[#111111] focus:ring-[#111111]" 
                  />
                </th>
                <th className="px-6 py-3">Candidate</th>
                <th className="px-6 py-3">Skills</th>
                <th className="px-6 py-3">Source</th>
                <th className="px-6 py-3">Tags</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {pool.map((c, i) => (
                <tr key={c.id} className={`hover:bg-[#F9FAFB] transition-colors ${selectedCandidates.includes(c.id) ? 'bg-[#F9FAFB]' : ''}`}>
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      checked={selectedCandidates.includes(c.id)}
                      onChange={() => handleSelect(c.id)}
                      className="rounded border-[#E5E5E5] text-[#111111] focus:ring-[#111111]" 
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center text-xs font-medium text-[#111111]">
                        {c.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium text-[#111111] hover:underline cursor-pointer">{c.name}</div>
                        <div className="text-xs text-[#666666]">{c.college}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {c.tags.map(t => (
                        <span key={t} className="px-1.5 py-0.5 bg-[#F3F4F6] text-[#666666] border border-[#E5E5E5] rounded font-inter text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-[#666666] flex flex-col gap-0.5">
                      <span>Applied: {c.roleTitle}</span>
                      <span className="font-mono text-[10px] text-[#999999]">{c.appliedAgo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {i % 3 === 0 && <span className="px-2 py-0.5 bg-[#FEF9C3] text-[#854D0E] rounded font-mono text-[10px]">High Potential</span>}
                    {i % 4 === 0 && <span className="px-2 py-0.5 bg-[#DBEAFE] text-[#1E3A8A] rounded font-mono text-[10px] ml-1">Revisit in 6mo</span>}
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button className="p-1.5 text-[#666666] hover:bg-[#E5E5E5] rounded" title="Add to Opening"><Briefcase size={16} /></button>
                    <button className="p-1.5 text-[#666666] hover:bg-[#E5E5E5] rounded" title="Send Email"><Mail size={16} /></button>
                    <button className="p-1.5 text-[#666666] hover:bg-[#E5E5E5] rounded"><MoreHorizontal size={16} /></button>
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
