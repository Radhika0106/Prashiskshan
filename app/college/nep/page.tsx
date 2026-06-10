"use client";

import { useCollegeData } from "@/context/CollegeDataContext";
import { useInternsStore } from "@/lib/store/internsStore";
import { getComplianceChecklist } from "@/lib/engines/compliance-engine";
import { 
  CheckCircle, FileText, Download, Target, Users, BookOpen, AlertCircle, ShieldAlert, Award
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default function NEPCompliance() {
  const { stats, courses } = useCollegeData();
  const { interns } = useInternsStore();
  
  const nepCoreCourses = courses.filter(c => c.isComplianceCore).length;
  const totalCourses = courses.length;
  const compliancePercentage = Math.round((nepCoreCourses / totalCourses) * 100);

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1240px] mx-auto animate-in fade-in duration-300 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h1 className="font-instrument text-[32px] leading-none mb-1">NEP 2020 Compliance Dashboard</h1>
          <p className="text-[#666] text-[14px]">Track institutional and internship alignment with UGC credit structures and compliance rules.</p>
        </div>
        
        <button className="flex items-center gap-2 bg-[#111] text-white px-5 py-2.5 rounded-lg text-[13px] font-medium hover:bg-black/90 transition-colors shadow-sm">
          <Download size={16}/> Export UGC Audit log
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         
         <div className="bg-white border border-[#E5E5E5] rounded-[16px] p-6 shadow-sm flex flex-col justify-between">
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
               <Target size={20} className="text-blue-500" />
               <h3 className="font-medium text-[15px]">Curriculum Alignment</h3>
             </div>
             <span className="text-[12px] font-jetbrains-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded">Tier 1</span>
           </div>
           
           <div className="flex items-end gap-3 mb-2">
             <div className="font-jetbrains-mono text-[42px] leading-none text-[#111]">{compliancePercentage}%</div>
             <div className="text-[13px] text-[#666] mb-1">Core mapping</div>
           </div>

           <div className="w-full bg-[#E5E5E5] h-1.5 rounded-full overflow-hidden mt-2">
             <div className="bg-blue-500 h-full" style={{ width: `${compliancePercentage}%` }}></div>
           </div>
         </div>

         <div className="bg-white border border-[#E5E5E5] rounded-[16px] p-6 shadow-sm flex flex-col justify-between">
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
               <BookOpen size={20} className="text-purple-500" />
               <h3 className="font-medium text-[15px]">ABC Framework</h3>
             </div>
             <span className="text-[12px] font-jetbrains-mono bg-purple-50 text-purple-700 px-2 py-0.5 rounded">Active</span>
           </div>
           
           <div className="flex items-end gap-3 mb-2">
             <div className="font-jetbrains-mono text-[42px] leading-none text-[#111]">100%</div>
             <div className="text-[13px] text-[#666] mb-1">Students enrolled</div>
           </div>

           <div className="text-[11px] text-[#666] bg-[#FAFAFA] p-2 border border-[#E5E5E5] rounded flex items-center gap-2">
             <CheckCircle size={12} className="text-green-500 shrink-0"/> All {stats.totalStudents} Academic Bank of Credit IDs generated
           </div>
         </div>

         <div className="bg-white border border-[#E5E5E5] rounded-[16px] p-6 shadow-sm flex flex-col justify-between">
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
               <Users size={20} className="text-amber-500" />
               <h3 className="font-medium text-[15px]">Holistic Electives</h3>
             </div>
             <span className="text-[12px] font-jetbrains-mono bg-amber-50 text-amber-700 px-2 py-0.5 rounded">Attention</span>
           </div>
           
           <div className="flex items-end gap-3 mb-2">
             <div className="font-jetbrains-mono text-[42px] leading-none text-[#111]">12%</div>
             <div className="text-[13px] text-[#666] mb-1">Cross-enrollment</div>
           </div>

           <div className="text-[11px] text-[#666] bg-amber-50/50 p-2 border border-amber-100 rounded flex items-start gap-2">
             <AlertCircle size={12} className="text-amber-500 shrink-0 mt-0.5"/> Target is 30%. Increase elective choices for students.
           </div>
         </div>

      </div>

      {/* Intern Compliance Status Table (UGC audits) */}
      <div className="bg-white border border-[#E5E5E5] rounded-[16px] overflow-hidden shadow-sm">
        <div className="p-6 border-b border-[#E5E5E5] flex justify-between items-center bg-[#FAFAFA]/50">
          <div>
            <h2 className="font-instrument text-[24px]">Internship Credit & Compliance Audits</h2>
            <p className="text-[#666] text-[13px] mt-1">Real-time credit mapping based on logged hours (1 credit per 120 hours, max 4 credits).</p>
          </div>
          <Badge variant="neutral">UGC Credit Framework</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA] text-[11px] uppercase tracking-wider text-[#666] font-medium">
                <th className="p-4 pl-6">Student Intern</th>
                <th className="p-4">Company & Role</th>
                <th className="p-4">Hours Logged</th>
                <th className="p-4">Logbook Entries</th>
                <th className="p-4 text-center">Evaluations (M / F)</th>
                <th className="p-4 text-center">Certificate Status</th>
                <th className="p-4 text-center">Credits Earned</th>
                <th className="p-4 pr-6 text-right">NEP Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5] text-[14px]">
              {interns.map(intern => {
                // Run compliance rules using compliance engine
                const checklist = getComplianceChecklist({
                  hoursLogged: intern.hoursLogged,
                  logbookEntries: intern.logbookEntriesCount,
                  midTermEvaluationSubmitted: intern.midTermEvaluationSubmitted,
                  finalEvaluationSubmitted: intern.finalEvaluationSubmitted,
                  certificateIssued: intern.certificateIssued,
                  internshipWeeks: intern.durationWeeks
                });

                return (
                  <tr key={intern.id} className="hover:bg-[#FAFAFA]/50 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="font-medium text-[#111]">{intern.studentName}</div>
                      <div className="text-[12px] text-[#666]">{intern.rollNumber} • {intern.department}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-[#111]">{intern.companyName}</div>
                      <div className="text-[12px] text-[#666]">{intern.roleTitle}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium font-jetbrains-mono">
                        {intern.hoursLogged} <span className="text-[12px] text-[#999]">/ 480 hrs</span>
                      </div>
                      <div className="w-24 bg-[#E5E5E5] h-1 rounded-full overflow-hidden mt-1">
                        <div className="bg-[#111] h-full" style={{ width: `${Math.min(100, (intern.hoursLogged / 480) * 100)}%` }}></div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium font-jetbrains-mono">
                        {intern.logbookEntriesCount} <span className="text-[12px] text-[#999]">/ 12 wk</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium mr-1.5 ${intern.midTermEvaluationSubmitted ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        M
                      </span>
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium ${intern.finalEvaluationSubmitted ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        F
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {checklist.certificateIssued.eligible ? (
                        <span className="text-green-600 font-medium flex items-center justify-center gap-1 text-[13px]">
                          <Award size={14}/> Eligible
                        </span>
                      ) : (
                        <span className="text-red-500 font-medium flex items-center justify-center gap-1 text-[13px]">
                          <ShieldAlert size={14}/> Pending
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center font-bold text-[#111] font-jetbrains-mono">
                      {checklist.creditsEarned}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      {checklist.overallStatus === 'COMPLIANT' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[12px] font-medium bg-green-50 text-green-700 border border-green-200">
                          Compliant
                        </span>
                      )}
                      {checklist.overallStatus === 'PARTIAL' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[12px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                          Partial
                        </span>
                      )}
                      {checklist.overallStatus === 'NON_COMPLIANT' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[12px] font-medium bg-red-50 text-red-700 border border-red-200">
                          Non-Compliant
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
