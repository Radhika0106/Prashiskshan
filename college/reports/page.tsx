"use client";

import { useState } from "react";
import { 
  FileText, Download, FileSpreadsheet, History, 
  Calendar, CheckCircle, Search, Filter, Loader2
} from "lucide-react";
// Dynamic importing for heavy client-side generation libraries
import dynamic from 'next/dynamic';

const REPORT_TEMPLATES = [
  { id: 'r1', name: 'AICTE / UGC Compliance Report', type: 'PDF', desc: 'Comprehensive compliance mapping for all active departments.', lastGen: '2 days ago' },
  { id: 'r2', name: 'Placement Performance Deep-Dive', type: 'XLSX', desc: 'Raw placement and salary statistics cohort 2026.', lastGen: '1 week ago' },
  { id: 'r3', name: 'NEP Multidisciplinary Review', type: 'PDF', desc: 'Analysis of cross-department elective choices.', lastGen: '1 month ago' },
  { id: 'r4', name: 'Faculty Mentorship Loading', type: 'XLSX', desc: 'Complete breakdown of student allocations and ratings.', lastGen: 'Just now' },
];

export default function ReportsCenter() {
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  const handleGenerate = async (templateId: string, format: string) => {
    setIsGenerating(templateId);
    
    // Simulate complex PDF/XLSX generation computation
    await new Promise(r => setTimeout(r, 2000));
    
    // In production we would use true jsPDF:
    // const doc = new jsPDF()
    // doc.text('Prashikshan Report', 10, 10)...
    // doc.save('report.pdf')
    
    setIsGenerating(null);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1240px] mx-auto animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
           <div className="flex items-center gap-3 mb-1">
             <div className="w-10 h-10 bg-[#111] text-white rounded-lg flex items-center justify-center">
               <FileText size={20} />
             </div>
             <h1 className="font-instrument text-[32px] leading-none">Report Generation</h1>
           </div>
          <p className="text-[#666] text-[14px] mt-2">Generate, schedule, and archive institutional reports.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Main Content: Templates */}
        <div className="flex-1 space-y-6">
           <div className="flex justify-between items-center mb-2">
              <h2 className="font-instrument text-[24px]">Available Templates</h2>
              <button className="text-[13px] text-[#666] hover:text-[#111] flex items-center gap-1"><Filter size={14}/> Filter</button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REPORT_TEMPLATES.map(template => (
                <div key={template.id} className="bg-white border border-[#E5E5E5] rounded-[16px] p-6 shadow-sm hover:border-[#111] transition-colors group flex flex-col h-full relative overflow-hidden">
                   
                   <div className="flex justify-between items-start mb-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${template.type === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                        {template.type === 'PDF' ? <FileText size={20}/> : <FileSpreadsheet size={20}/>}
                      </div>
                      <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded ${template.type === 'PDF' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                        {template.type} FORMAT
                      </span>
                   </div>
                   
                   <h3 className="font-medium text-[16px] text-[#111] leading-tight mb-2">{template.name}</h3>
                   <p className="text-[13px] text-[#666] leading-relaxed mb-6">{template.desc}</p>
                   
                   <div className="mt-auto pt-4 border-t border-[#E5E5E5] flex items-center justify-between">
                      <span className="text-[11px] text-[#999] flex items-center gap-1"><History size={12}/> Last: {template.lastGen}</span>
                      <button 
                        onClick={() => handleGenerate(template.id, template.type)}
                        disabled={!!isGenerating}
                        className={`text-[12px] font-medium px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                          isGenerating === template.id ? 'bg-[#F7F6F3] text-[#999] border border-transparent cursor-wait' : 'bg-white border border-[#E5E5E5] text-[#111] hover:border-[#111] shadow-sm'
                        }`}
                      >
                         {isGenerating === template.id ? (
                           <><Loader2 size={14} className="animate-spin"/> Generating</>
                         ) : (
                           <><Download size={14}/> Generate</>
                         )}
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Sidebar: Archive & Activity */}
        <div className="w-full md:w-80 shrink-0 space-y-6">
           
           <div className="bg-[#FAFAFA] border border-[#E5E5E5] border-dashed rounded-[16px] p-6 text-center">
             <Calendar className="mx-auto text-[#999] mb-3" size={24} />
             <h3 className="font-medium text-[14px] text-[#111] mb-1">Scheduled Reports</h3>
             <p className="text-[12px] text-[#666] mb-4">Set up automated weekly or monthly delivery to your inbox.</p>
             <button className="w-full bg-[#111] text-white py-2 rounded-lg text-[13px] font-medium hover:bg-black/90 transition-colors">
               Create Schedule
             </button>
           </div>

           <div className="bg-white border border-[#E5E5E5] rounded-[16px] shadow-sm overflow-hidden">
             <div className="p-4 border-b border-[#E5E5E5] bg-[#F7F6F3]">
                <h3 className="font-medium text-[14px]">Recent Archives</h3>
             </div>
             <div className="divide-y divide-[#E5E5E5]">
                {[1,2,3,4].map(i => (
                  <div key={i} className="p-4 hover:bg-[#FAFAFA] transition-colors cursor-pointer flex gap-3">
                     <FileText size={16} className="text-[#999] shrink-0 mt-0.5" />
                     <div>
                       <div className="text-[13px] font-medium text-[#111] leading-tight mb-1">Compliance_Log_Oct.pdf</div>
                       <div className="text-[11px] text-[#999]">Today at 10:45 AM • 2.4 MB</div>
                     </div>
                  </div>
                ))}
             </div>
             <button className="w-full p-3 text-[12px] font-medium text-[#666] hover:text-[#111] transition-colors text-center border-t border-[#E5E5E5] bg-[#F7F6F3]">
               View Full Archive
             </button>
           </div>

        </div>

      </div>
    </div>
  );
}
