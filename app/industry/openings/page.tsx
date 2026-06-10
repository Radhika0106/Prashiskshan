"use client";

import { useState } from "react";
import { useIndustryStore, Opening } from "@/lib/store/industryStore";
import { 
  useReactTable, getCoreRowModel, getFilteredRowModel, 
  getSortedRowModel, getPaginationRowModel, flexRender,
  ColumnDef, SortingState
} from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { 
  Search, Filter, MoreHorizontal, Pencil, Users, 
  Pause, Play, X, Copy, ChevronLeft, ChevronRight,
  TrendingUp, Download, Share2
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ManageOpeningsPage() {
  const { openings, updateOpeningStatus } = useIndustryStore();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOpening, setSelectedOpening] = useState<Opening | null>(null);

  const filteredData = openings.filter(o => statusFilter === 'All' || o.status === statusFilter);

  const columns: ColumnDef<Opening>[] = [
    {
      accessorKey: "title",
      header: "Role Title",
      cell: ({ row }) => (
        <div 
          className="cursor-pointer hover:underline"
          onClick={() => setSelectedOpening(row.original)}
        >
          <div className="font-instrument text-base text-[#111111]">{row.original.title}</div>
          <div className="text-xs text-[#666666] px-2 py-0.5 bg-[#F3F4F6] inline-block rounded mt-1">
            {row.original.department}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "postedOn",
      header: "Posted On",
      cell: ({ row }) => {
        const date = new Date(row.original.postedOn);
        return (
          <div>
            <div className="font-mono text-[13px] text-[#111111]">
              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="text-xs text-[#999999]">
              {formatDistanceToNow(date, { addSuffix: true })}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "applicationsCount",
      header: "Applications",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="font-medium text-[#111111]">{row.original.applicationsCount}</span>
          {row.original.applicationsCount > 0 && (
            <span className="px-1.5 py-0.5 bg-[#DBEAFE] text-[#1E3A8A] rounded-full font-mono text-[10px]">
              ↑ {Math.floor(Math.random() * 5) + 1} new
            </span>
          )}
        </div>
      ),
    },
    {
      id: "filled",
      header: "Filled / Total",
      cell: ({ row }) => {
        const { filled, totalPositions } = row.original;
        const ratio = filled / totalPositions;
        const color = ratio === 1 ? 'bg-[#059669]' : ratio > 0 ? 'bg-[#D97706]' : 'bg-[#DC2626]';
        return (
          <div className="w-24">
            <div className="font-mono text-[13px] text-[#111111] mb-1">{filled} / {totalPositions}</div>
            <div className="h-1.5 w-full bg-[#E5E5E5] rounded-full overflow-hidden">
              <div className={`h-full ${color}`} style={{ width: `${(ratio) * 100}%` }}></div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const s = row.original.status;
        const badgeClasses = 
          s === 'Active' ? 'bg-[#D1FAE5] text-[#065F46]' :
          s === 'Paused' ? 'bg-[#FEF9C3] text-[#854D0E]' :
          'bg-[#F3F4F6] text-[#374151]';
        return <span className={`px-2 py-1 rounded-full font-mono text-[11px] ${badgeClasses}`}>{s}</span>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <button onClick={() => setSelectedOpening(row.original)} className="p-1.5 text-[#666666] hover:bg-[#F3F4F6] rounded" title="View/Edit">
            <Pencil size={16} />
          </button>
          <Link href={`/industry/pipeline?role=${row.original.id}`} className="p-1.5 text-[#666666] hover:bg-[#F3F4F6] rounded" title="View Applications">
            <Users size={16} />
          </Link>
          <button 
            onClick={() => {
              updateOpeningStatus(row.original.id, row.original.status === 'Active' ? 'Paused' : 'Active');
              toast.success(`Opening ${row.original.status === 'Active' ? 'paused' : 'resumed'}`);
            }} 
            className="p-1.5 text-[#666666] hover:bg-[#F3F4F6] rounded" title="Pause/Resume"
          >
            {row.original.status === 'Active' ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button className="p-1.5 text-[#666666] hover:bg-[#F3F4F6] rounded" title="More">
            <MoreHorizontal size={16} />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } }
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-instrument text-3xl tracking-tight text-[#111111] mb-2">Manage Openings</h1>
          <p className="text-[#666666] font-inter text-sm">Track and update your internship postings.</p>
        </div>
        <Link href="/industry/post" className="px-4 py-2 bg-[#111111] text-white rounded-lg text-sm font-medium hover:bg-black/90 transition-colors inline-flex items-center">
          Post New Role
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-t-2xl border border-[#E5E5E5] flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-3">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 border border-[#E5E5E5] rounded-lg font-inter text-sm bg-white focus:outline-none focus:border-[#111111]"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Closed">Closed</option>
          </select>
          <select className="px-3 py-1.5 border border-[#E5E5E5] rounded-lg font-inter text-sm bg-white focus:outline-none focus:border-[#111111]">
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Design</option>
          </select>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
          <input 
            value={globalFilter ?? ''}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder="Search roles..."
            className="pl-9 pr-4 py-1.5 border border-[#E5E5E5] rounded-lg font-inter text-sm focus:outline-none focus:border-[#111111] w-64"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border-x border-b border-[#E5E5E5] rounded-b-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-inter">
            <thead className="bg-[#F7F6F3] text-[#666666] font-medium border-b border-[#E5E5E5]">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-6 py-3 cursor-pointer" onClick={header.column.getToggleSortingHandler()}>
                      <div className="flex items-center gap-1 hover:text-[#111111]">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: ' ↑',
                          desc: ' ↓',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-[#F9FAFB] transition-colors">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
              {table.getRowModel().rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[#666666]">
                    No openings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-[#E5E5E5] flex items-center justify-between">
          <div className="text-sm text-[#666666]">
            Showing {table.getRowModel().rows.length} of {filteredData.length} results
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => table.previousPage()} 
              disabled={!table.getCanPreviousPage()}
              className="p-1 border border-[#E5E5E5] rounded disabled:opacity-50 hover:bg-[#F3F4F6]"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={() => table.nextPage()} 
              disabled={!table.getCanNextPage()}
              className="p-1 border border-[#E5E5E5] rounded disabled:opacity-50 hover:bg-[#F3F4F6]"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Opening Detail Slide-over Modal */}
      {selectedOpening && (
        <div className="fixed inset-0 bg-black/20 z-50 flex justify-end">
          <div 
            className="w-full max-w-2xl bg-white h-full overflow-y-auto shadow-2xl border-l border-[#E5E5E5] animate-in slide-in-from-right duration-300"
          >
            <div className="sticky top-0 bg-white border-b border-[#E5E5E5] px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <button onClick={() => setSelectedOpening(null)} className="p-1.5 text-[#666666] hover:bg-[#F3F4F6] rounded-full">
                  <X size={20} />
                </button>
                <h2 className="font-instrument text-2xl tracking-tight">Role Details</h2>
              </div>
              <button className="px-4 py-1.5 border border-[#E5E5E5] rounded-lg text-sm font-medium hover:bg-[#F9FAFB]">
                Edit Posting
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Header Info */}
              <div>
                <h1 className="font-instrument text-4xl text-[#111111] mb-3">{selectedOpening.title}</h1>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full font-mono text-xs ${
                    selectedOpening.status === 'Active' ? 'bg-[#D1FAE5] text-[#065F46]' :
                    selectedOpening.status === 'Paused' ? 'bg-[#FEF9C3] text-[#854D0E]' :
                    'bg-[#F3F4F6] text-[#374151]'
                  }`}>{selectedOpening.status}</span>
                  <span className="text-sm font-inter text-[#666666]">Posted {formatDistanceToNow(new Date(selectedOpening.postedOn))} ago</span>
                  <span className="text-sm font-inter text-[#666666] px-2 py-0.5 bg-[#F3F4F6] rounded">{selectedOpening.department}</span>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#F7F6F3] p-4 rounded-xl border border-[#E5E5E5]">
                  <div className="text-xs text-[#666666] mb-1">Total Views</div>
                  <div className="font-mono text-xl">{selectedOpening.views}</div>
                </div>
                <div className="bg-[#F7F6F3] p-4 rounded-xl border border-[#E5E5E5]">
                  <div className="text-xs text-[#666666] mb-1">Applications</div>
                  <div className="font-mono text-xl">{selectedOpening.applicationsCount}</div>
                </div>
                <div className="bg-[#F7F6F3] p-4 rounded-xl border border-[#E5E5E5]">
                  <div className="text-xs text-[#666666] mb-1">Conversion</div>
                  <div className="font-mono text-xl">{selectedOpening.views ? Math.round((selectedOpening.applicationsCount / selectedOpening.views) * 100) : 0}%</div>
                </div>
                <div className="bg-[#F7F6F3] p-4 rounded-xl border border-[#E5E5E5]">
                  <div className="text-xs text-[#666666] mb-1">Avg Score</div>
                  <div className="font-mono text-xl">76</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3 pb-6 border-b border-[#E5E5E5]">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm font-medium hover:bg-[#F9FAFB]">
                  <Share2 size={16} /> Share Link
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm font-medium hover:bg-[#F9FAFB]">
                  <Download size={16} /> Download CSV
                </button>
                <button 
                  onClick={() => {
                    updateOpeningStatus(selectedOpening.id, selectedOpening.status === 'Active' ? 'Paused' : 'Active');
                    setSelectedOpening({ ...selectedOpening, status: selectedOpening.status === 'Active' ? 'Paused' : 'Active' });
                    toast.success("Status updated");
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm font-medium hover:bg-[#F9FAFB]"
                >
                  {selectedOpening.status === 'Active' ? <Pause size={16} /> : <Play size={16} />} 
                  {selectedOpening.status === 'Active' ? 'Pause' : 'Resume'}
                </button>
              </div>

              {/* Application Summary Funnel */}
              <div>
                <h3 className="font-instrument text-xl mb-4">Pipeline Summary</h3>
                <div className="flex w-full h-8 rounded-lg overflow-hidden border border-[#E5E5E5]">
                  <div className="bg-[#E5E5E5] h-full flex items-center justify-center text-[10px] font-mono text-[#666666]" style={{ width: '40%' }}>Review (40)</div>
                  <div className="bg-[#DBEAFE] h-full flex items-center justify-center text-[10px] font-mono text-[#1E3A8A]" style={{ width: '30%' }}>Shortlist (30)</div>
                  <div className="bg-[#FEF9C3] h-full flex items-center justify-center text-[10px] font-mono text-[#854D0E]" style={{ width: '20%' }}>Interview (20)</div>
                  <div className="bg-[#D1FAE5] h-full flex items-center justify-center text-[10px] font-mono text-[#065F46]" style={{ width: '10%' }}>Offer (10)</div>
                </div>
              </div>

              {/* Top Applicants Preview */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-instrument text-xl">Top Applicants</h3>
                  <Link href={`/industry/pipeline?role=${selectedOpening.id}`} className="text-sm text-[#111111] hover:underline">View All →</Link>
                </div>
                <div className="space-y-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="flex items-center justify-between p-3 border border-[#E5E5E5] rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center text-sm font-medium">
                          C{i}
                        </div>
                        <div>
                          <div className="font-medium text-sm text-[#111111]">Candidate {i}</div>
                          <div className="text-xs text-[#666666]">Applied 2 days ago</div>
                        </div>
                      </div>
                      <div className="px-2 py-1 bg-[#D1FAE5] text-[#065F46] rounded-full font-mono text-[11px]">
                        9{i}% Match
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
