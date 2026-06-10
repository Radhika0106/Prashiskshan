"use client";

import { useInternsStore } from "@/lib/store/internsStore";
import { Search, Filter, Download } from "lucide-react";

export default function FilterBar() {
  const { searchQuery, setSearchQuery, statusFilter, setStatusFilter, deptFilter, setDeptFilter } = useInternsStore();

  return (
    <div className="p-4 border-b border-[#E5E5E5] flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3 w-full md:w-auto flex-1">
        <div className="relative max-w-md w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
          <input
            type="text"
            placeholder="Search by name, company, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#F7F6F3] border border-transparent focus:bg-white focus:border-[#E5E5E5] rounded-[8px] text-[13px] font-inter outline-none transition-all placeholder:text-[#999]"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-white border border-[#E5E5E5] rounded-[8px] px-3 py-2 pr-8 text-[13px] font-inter text-[#444] outline-none cursor-pointer hover:border-[#CCC] transition-colors"
            >
              <option value="All">Status: All</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Upcoming">Upcoming</option>
              <option value="On Hold">On Hold</option>
              <option value="Terminated">Terminated</option>
            </select>
            <Filter size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
          </div>

          <div className="relative hidden sm:block">
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="appearance-none bg-white border border-[#E5E5E5] rounded-[8px] px-3 py-2 pr-8 text-[13px] font-inter text-[#444] outline-none cursor-pointer hover:border-[#CCC] transition-colors"
            >
              <option value="All">Department: All</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="MECH">MECH</option>
            </select>
            <Filter size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
          </div>
        </div>
      </div>

      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E5E5] rounded-[8px] text-[13px] font-inter font-medium text-[#111] hover:bg-[#F7F6F3] transition-colors w-full md:w-auto justify-center">
        <Download size={14} />
        Export All Reports
      </button>
    </div>
  );
}
