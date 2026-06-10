"use client";

import { useInternsStore } from "@/lib/store/internsStore";
import StatsRow from "./components/StatsRow";
import FilterBar from "./components/FilterBar";
import InternsTable from "./components/InternsTable";
import StudentDetailModal from "./components/StudentDetailModal";

export default function StudentInternsPage() {
  const { selectedInternId } = useInternsStore();

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-full pb-20 relative">
      <header className="mb-8">
        <h1 className="font-instrument text-[32px] text-[#111] leading-tight">Student Interns</h1>
        <p className="font-inter text-[15px] text-[#666] mt-1">Track and generate reports for students on internships</p>
      </header>

      <div className="flex flex-col gap-6">
        <StatsRow />
        
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] overflow-hidden flex flex-col">
          <FilterBar />
          <InternsTable />
        </div>
      </div>

      {selectedInternId && <StudentDetailModal />}
    </div>
  );
}
