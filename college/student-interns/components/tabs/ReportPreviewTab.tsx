"use client";

import { useInternsStore } from "@/lib/store/internsStore";
import { FileText, Download, Save, Mail, FileIcon, Loader2, CheckCircle2 } from "lucide-react";

export default function ReportPreviewTab() {
  const { 
    reportConfig, 
    updateReportConfig, 
    updateReportSections, 
    generateReport, 
    reportGenerating, 
    reportProgress, 
    reportUrl,
    selectedInternId,
    interns
  } = useInternsStore();

  const intern = interns.find(i => i.id === selectedInternId);

  const handleGenerate = () => {
    generateReport();
  };

  const handleDownload = () => {
    if (!intern) return;
    // Mock download logic
    const element = document.createElement("a");
    const file = new Blob(["This is a simulated mock PDF for the internship report."], {type: 'application/pdf'});
    element.href = URL.createObjectURL(file);
    element.download = `${intern.studentName.replace(/\s+/g, '_')}_Internship_Report.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const sections = [
    { key: 'cover', label: 'Cover page with student details' },
    { key: 'executiveSummary', label: 'Executive summary (AI-generated)' },
    { key: 'overview', label: 'Internship overview' },
    { key: 'outcomes', label: 'Learning outcomes (AI-extracted)' },
    { key: 'skillProgression', label: 'Skill progression chart' },
    { key: 'logbook', label: 'Complete logbook entries' },
    { key: 'analytics', label: 'Performance analytics' },
    { key: 'midTerm', label: 'Mid-term evaluation' },
    { key: 'finalEval', label: 'Final evaluation' },
    { key: 'aiInsights', label: 'AI insights and recommendations' },
    { key: 'facultyEndorsement', label: 'Faculty endorsement' },
    { key: 'certificate', label: 'Company certificate' },
    { key: 'appendices', label: 'Appendices (task list, attendance)' },
  ] as const;

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full min-h-[600px] animate-in fade-in duration-300">
      
      {/* Left Pane: PDF Preview (Mock) */}
      <div className="flex-1 bg-[#E5E5E5] rounded-[12px] p-4 lg:p-8 flex items-center justify-center relative overflow-hidden">
        {reportGenerating ? (
          <div className="bg-white rounded-[8px] p-8 shadow-sm flex flex-col items-center justify-center max-w-[300px] text-center w-full">
            <Loader2 size={32} className="text-[#111] animate-spin mb-4" />
            <div className="font-instrument text-[20px] text-[#111] mb-2">Generating Report</div>
            <div className="font-inter text-[13px] text-[#666] mb-4">Running AI analysis and compiling PDF...</div>
            <div className="w-full h-1.5 bg-[#F7F6F3] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#111] transition-all duration-300 ease-out" 
                style={{ width: `${reportProgress}%` }}
              />
            </div>
            <div className="font-jetbrains-mono text-[11px] text-[#999] mt-2">{reportProgress}%</div>
          </div>
        ) : reportUrl ? (
          <div className="bg-white rounded-[8px] p-8 shadow-sm flex flex-col items-center justify-center max-w-[300px] text-center w-full animate-in zoom-in-95">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4 text-green-600">
              <CheckCircle2 size={32} />
            </div>
            <div className="font-instrument text-[20px] text-[#111] mb-2">Report Ready</div>
            <div className="font-inter text-[13px] text-[#666] mb-6">Your comprehensive report has been generated successfully.</div>
            <button 
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 bg-[#111] text-white px-4 py-2.5 rounded-[8px] font-inter text-[13px] font-medium hover:bg-black transition-colors mb-3"
            >
              <Download size={16} />
              Download PDF
            </button>
            <div className="flex items-center gap-3 w-full">
              <button className="flex-1 py-2 border border-[#E5E5E5] rounded-[8px] font-inter text-[12px] text-[#444] hover:bg-[#F7F6F3]">
                Email to Student
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white w-full max-w-[400px] aspect-[1/1.414] shadow-sm rounded flex flex-col p-8 opacity-70">
            {/* Mock PDF Structure */}
            <div className="w-16 h-16 rounded-full bg-[#F7F6F3] mx-auto mb-6 flex items-center justify-center text-[24px]">
              🎓
            </div>
            <div className="h-4 w-3/4 bg-[#F7F6F3] mx-auto mb-8 rounded" />
            
            <div className="space-y-4 flex-1">
              <div className="h-2 w-full bg-[#F7F6F3] rounded" />
              <div className="h-2 w-full bg-[#F7F6F3] rounded" />
              <div className="h-2 w-5/6 bg-[#F7F6F3] rounded" />
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="h-24 bg-[#F7F6F3] rounded" />
                <div className="h-24 bg-[#F7F6F3] rounded" />
              </div>
            </div>

            <div className="mt-8 h-2 w-1/3 bg-[#F7F6F3] mx-auto rounded" />
            <div className="absolute top-4 right-4 bg-black/50 text-white text-[11px] font-jetbrains-mono px-2 py-1 rounded backdrop-blur-sm">
              Live Preview Mode
            </div>
          </div>
        )}
      </div>

      {/* Right Pane: Configuration */}
      <div className="w-full lg:w-[400px] shrink-0 bg-white border border-[#E5E5E5] rounded-[12px] flex flex-col h-full max-h-[600px]">
        <div className="p-5 border-b border-[#E5E5E5] shrink-0">
          <h3 className="font-instrument text-[20px] text-[#111]">Report Configuration</h3>
        </div>
        
        <div className="p-5 overflow-y-auto flex-1 space-y-8 hide-scrollbar">
          
          {/* Report Type */}
          <div>
            <h4 className="font-inter font-medium text-[13px] text-[#111] uppercase tracking-wide mb-3">Report Type</h4>
            <div className="space-y-2">
              {['Comprehensive', 'Summary', 'NEP Compliance', 'Custom'].map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="reportType" 
                    checked={reportConfig.reportType === type}
                    onChange={() => updateReportConfig({ reportType: type as any })}
                    disabled={reportGenerating}
                    className="accent-[#111] w-4 h-4"
                  />
                  <span className="font-inter text-[14px] text-[#444] group-hover:text-[#111]">{type} Report</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div>
            <h4 className="font-inter font-medium text-[13px] text-[#111] uppercase tracking-wide mb-3">Include Sections</h4>
            <div className="space-y-2">
              {sections.map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={reportConfig.sections[key as keyof typeof reportConfig.sections]}
                    onChange={(e) => updateReportSections({ [key]: e.target.checked })}
                    disabled={reportGenerating || reportConfig.reportType !== 'Custom'}
                    className="accent-[#111] w-4 h-4 rounded-sm border-[#E5E5E5] focus:ring-black"
                  />
                  <span className={`font-inter text-[14px] ${reportConfig.reportType !== 'Custom' ? 'text-[#999]' : 'text-[#444] group-hover:text-[#111]'}`}>
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* AI Enhancements */}
          <div>
            <h4 className="font-inter font-medium text-[13px] text-[#111] uppercase tracking-wide mb-3">AI Enhancements</h4>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 border border-[#E5E5E5] rounded-[8px] bg-[#F7F6F3] cursor-pointer">
                <div>
                  <div className="font-inter font-medium text-[13px] text-[#111]">Auto-generate Summaries</div>
                  <div className="font-inter text-[11px] text-[#666]">Use NLP to summarize logbooks</div>
                </div>
                <input type="checkbox" checked={reportConfig.aiEnhancements.autoSummary} onChange={(e) => updateReportConfig({ aiEnhancements: { ...reportConfig.aiEnhancements, autoSummary: e.target.checked } })} className="accent-[#111]" disabled={reportGenerating} />
              </label>
              <label className="flex items-center justify-between p-3 border border-[#E5E5E5] rounded-[8px] bg-[#F7F6F3] cursor-pointer">
                <div>
                  <div className="font-inter font-medium text-[13px] text-[#111]">Skill Extraction</div>
                  <div className="font-inter text-[11px] text-[#666]">Identify skills from text</div>
                </div>
                <input type="checkbox" checked={reportConfig.aiEnhancements.skillExtraction} onChange={(e) => updateReportConfig({ aiEnhancements: { ...reportConfig.aiEnhancements, skillExtraction: e.target.checked } })} className="accent-[#111]" disabled={reportGenerating} />
              </label>
            </div>
          </div>

        </div>

        {/* Action Footer */}
        <div className="p-5 border-t border-[#E5E5E5] shrink-0 bg-white space-y-3">
          <button 
            onClick={handleGenerate}
            disabled={reportGenerating}
            className="w-full flex items-center justify-center gap-2 bg-[#111] text-white px-4 py-3 rounded-[8px] font-inter text-[14px] font-medium hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {reportGenerating ? 'Generating...' : 'Generate & Download →'}
          </button>
          
          <div className="flex gap-3">
            <button disabled={reportGenerating} className="flex-1 flex items-center justify-center gap-2 py-2 border border-[#E5E5E5] rounded-[8px] font-inter text-[12px] text-[#444] hover:bg-[#F7F6F3] transition-colors">
              <Save size={14} />
              Save Config
            </button>
            <button disabled={reportGenerating} className="flex-1 flex items-center justify-center gap-2 py-2 border border-[#E5E5E5] rounded-[8px] font-inter text-[12px] text-[#444] hover:bg-[#F7F6F3] transition-colors">
              <FileIcon size={14} />
              Preview Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
