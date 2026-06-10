"use client";

import { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import { Badge } from "@/components/ui/Badge";
import { Calendar as CalendarIcon, Download, Clock, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useMockData } from "@/context/MockDataContext";

export default function Logbook() {
  const { currentUserId, students } = useMockData();
  const student = students.find(s => s.id === currentUserId);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [hours, setHours] = useState('8');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showReportUrl, setShowReportUrl] = useState(false);

  if (student?.internshipStatus !== 'active') {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-center max-w-md mx-auto">
         <div className="w-16 h-16 bg-[#FAFAFA] rounded-xl flex items-center justify-center text-[#999] mb-4 border border-[#E5E5E5]">
            <FileText size={32} />
         </div>
         <h1 className="font-instrument text-[28px] mb-2">Logbook Locked</h1>
         <p className="text-[#666] text-sm mb-6">You need to have an active internship to start recording your logbook entries.</p>
         <button className="bg-[#111111] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-black/90 transition-colors">
            Discover Internships
         </button>
      </div>
    );
  }

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowReportUrl(true);
      toast.success("Final report generated successfully!");
    }, 2500);
  };

  // Mock days with entries
  const entryDays = [new Date(2026, 3, 10), new Date(2026, 3, 11), new Date(2026, 3, 12)];
  
  const css = `
    .rdp { --rdp-cell-size: 40px; --rdp-accent-color: #111; --rdp-background-color: #f3f4f6; margin: 0; }
    .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover { background-color: #111; color: white; }
    .rdp-day_today { font-weight: bold; color: #111; }
    .has-entry { background-color: #F0FDF4; border: 1px solid #DCFCE7; color: #166534; font-weight: 500; }
  `;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <style>{css}</style>
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-instrument text-[32px] leading-tight">Daily Logbook</h1>
          <p className="text-[#666] text-sm mt-1">Record your daily learnings for AICTE & NEP compliance.</p>
        </div>
        
        <div className="flex gap-3 shrink-0">
          <button className="px-4 py-2 text-sm font-medium border border-[#E5E5E5] bg-white rounded-md hover:bg-[#FAFAFA] flex items-center gap-2">
            <Download size={16} /> Weekly Report
          </button>
          <button 
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="px-4 py-2 text-sm font-medium bg-[#111] text-white rounded-md hover:bg-black/90 disabled:opacity-70 flex items-center gap-2"
          >
            {isGenerating ? <><Clock size={16} className="animate-spin" /> Generating...</> : <><FileText size={16} /> Final Report</>}
          </button>
        </div>
      </div>

      {showReportUrl && (
        <div className="bg-[#F0FDF4] border border-[#16A34A] p-4 rounded-lg flex items-center justify-between animate-in slide-in-from-top-2">
           <div className="flex items-center gap-3">
              <CheckCircle2 className="text-[#16A34A]" size={20} />
              <div>
                 <div className="font-medium text-[#166534] text-sm">NEP-Compliant Report Generated</div>
                 <div className="text-xs text-[#166534]/80">Contains executive summary, skills mapped, and mentor evaluations.</div>
              </div>
           </div>
           <button className="bg-[#16A34A] text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-[#166534]">Download PDF</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
         {/* Calendar Sidebar */}
         <div className="md:col-span-4 lg:col-span-3 bg-white border border-[#E5E5E5] rounded-[16px] p-4 shadow-sm flex flex-col items-center">
            <DayPicker
              mode="single"
              selected={date}
              onSelect={setDate}
              modifiers={{ hasEntry: entryDays }}
              className="font-inter"
            />
            <div className="w-full mt-6 pt-4 border-t border-[#E5E5E5]">
               <h4 className="font-medium text-sm mb-3">Legend</h4>
               <div className="space-y-2 text-xs text-[#666]">
                 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#111]"></div> Selected Date</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#F0FDF4] border border-[#DCFCE7]"></div> Log Submitted</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-white border border-[#E5E5E5]"></div> Pending</div>
               </div>
            </div>
         </div>

         {/* Entry Form */}
         <div className="md:col-span-8 lg:col-span-9 bg-white border border-[#E5E5E5] rounded-[16px] p-6 lg:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5E5E5]">
               <div>
                 <div className="text-sm font-medium text-[#666] uppercase tracking-wider mb-1">Entry For</div>
                 <div className="font-instrument text-2xl flex items-center gap-2">
                   <CalendarIcon size={20} /> {date ? format(date, 'EEEE, MMMM do, yyyy') : 'Select a date'}
                 </div>
               </div>
               <Badge variant="warning">Draft</Badge>
            </div>

            <div className="space-y-6">
               <div>
                  <label className="block text-sm font-medium mb-1.5">Hours Worked</label>
                  <input type="number" value={hours} onChange={e=>setHours(e.target.value)} className="w-full md:w-32 px-3 py-2 border border-[#E5E5E5] rounded-md outline-none focus:border-[#111111]" />
               </div>

               <div>
                  <label className="block text-sm font-medium mb-1.5 flex justify-between">
                     Tasks Completed
                     <span className="text-[#999] font-normal text-xs">Rich Text Edit</span>
                  </label>
                  <div className="border border-[#E5E5E5] rounded-md overflow-hidden focus-within:border-[#111111] transition-colors">
                     <div className="bg-[#FAFAFA] border-b border-[#E5E5E5] p-2 flex gap-1">
                        <button className="px-2 py-1 text-sm font-bold hover:bg-[#E5E5E5] rounded">B</button>
                        <button className="px-2 py-1 text-sm italic hover:bg-[#E5E5E5] rounded">I</button>
                        <button className="px-2 py-1 flex items-center hover:bg-[#E5E5E5] rounded"><div className="w-3 h-0.5 bg-black"></div><div className="w-3 h-0.5 bg-black mt-1"></div><div className="w-3 h-0.5 bg-black mt-1"></div></button>
                     </div>
                     <textarea className="w-full h-32 p-3 outline-none resize-y" placeholder="- Implemented the new top navigation bar&#10;- Resolved 3 UI bugs in the settings panel"></textarea>
                  </div>
               </div>

               <div>
                  <label className="block text-sm font-medium mb-1.5">Key Learnings & Skills Applied</label>
                  <textarea className="w-full h-24 p-3 border border-[#E5E5E5] rounded-md outline-none focus:border-[#111111] resize-y" placeholder="Learned how to leverage React Context for mock data simulation."></textarea>
               </div>

               <div>
                  <label className="block text-sm font-medium mb-1.5">Challenges Faced (Optional)</label>
                  <textarea className="w-full h-20 p-3 border border-[#E5E5E5] rounded-md outline-none focus:border-[#111111] resize-y" placeholder=""></textarea>
               </div>

               <div className="pt-4 flex items-center justify-between border-t border-[#E5E5E5]">
                  <div className="flex items-center gap-2 text-xs text-[#666]">
                     <AlertCircle size={14} /> Entries cannot be edited once approved by mentor
                  </div>
                  <div className="flex gap-3">
                     <button className="px-4 py-2 rounded-lg font-medium text-sm text-[#666] hover:bg-[#FAFAFA] hover:text-[#111] transition-colors">
                        Save Draft
                     </button>
                     <button onClick={() => toast.success("Logbook entry submitted for review!")} className="bg-[#111111] text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-black/90 transition-colors">
                        Submit for Review →
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
