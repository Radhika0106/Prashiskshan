"use client";

import { useMockData } from "@/context/MockDataContext";
import { Card, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { Users, Briefcase, FileText, CheckSquare, Clock, AlertCircle } from "lucide-react";

export default function FacultyDashboard() {
  const { students, internships } = useMockData();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="font-instrument text-[32px]">Faculty Dashboard</h1>
        <Badge variant="neutral">Academic Year '25-'26</Badge>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex flex-col justify-between">
          <div>
            <div className="text-sm text-[#666] mb-1">Total Students Enrolled</div>
            <div className="font-jetbrains-mono text-[28px]">{students.length}</div>
          </div>
        </Card>
        <Card className="flex flex-col justify-between">
          <div>
            <div className="text-sm text-[#666] mb-1">Active Internships</div>
            <div className="font-jetbrains-mono text-[28px]">{students.filter(s => s.internshipStatus === 'active').length}</div>
          </div>
        </Card>
        <Card className="flex flex-col justify-between">
          <div>
            <div className="text-sm text-[#666] mb-1">Pending Evaluations</div>
            <div className="font-jetbrains-mono text-[28px] text-[#D97706]">5</div>
          </div>
          <div className="mt-4"><Badge variant="warning">Requires attention</Badge></div>
        </Card>
        <Card className="flex flex-col justify-between">
          <div>
            <div className="text-sm text-[#666] mb-1">Compliance Score</div>
            <div className="font-jetbrains-mono text-[28px]">96%</div>
          </div>
          <div className="mt-4">
            <div className="h-1 w-full bg-[#E5E5E5] rounded-full overflow-hidden">
              <div className="h-full bg-[#16A34A]" style={{ width: `96%` }}></div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex justify-between items-center mb-4">
               <CardTitle className="mb-0">Recent Student Activity</CardTitle>
               <Link href="/faculty/students" className="text-sm text-[#666] hover:text-[#111] hover:underline">View All</Link>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="border-b border-[#E5E5E5]">
                        <th className="pb-3 text-xs font-medium text-[#666] uppercase">Student Name</th>
                        <th className="pb-3 text-xs font-medium text-[#666] uppercase">Internship Role</th>
                        <th className="pb-3 text-xs font-medium text-[#666] uppercase">Last Logbook Entry</th>
                        <th className="pb-3 text-xs font-medium text-[#666] uppercase text-right">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5E5]">
                     {students.map(s => (
                        <tr key={s.id} className="hover:bg-[#FAFAFA] transition-colors cursor-pointer group">
                           <td className="py-3 pr-4">
                              <div className="font-medium text-[15px] text-[#111]">{s.name}</div>
                              <div className="text-[13px] text-[#666]">{s.course}</div>
                           </td>
                           <td className="py-3 px-4">
                              {s.internshipStatus === 'active' ? (
                                 <>
                                    <div className="text-sm">Frontend Intern</div>
                                    <div className="text-[12px] text-[#666]">Razorpay</div>
                                 </>
                              ) : (
                                 <span className="text-[#999] text-sm italic">Searching</span>
                              )}
                           </td>
                           <td className="py-3 px-4">
                              {s.internshipStatus === 'active' ? (
                                 <span className="font-jetbrains-mono text-[12px]">Apr 20, 2026</span>
                              ) : (
                                 <span className="text-[#999]">-</span>
                              )}
                           </td>
                           <td className="py-3 pl-4 text-right">
                              {s.internshipStatus === 'active' ? <Badge variant="success">Active</Badge> : <Badge variant="neutral">Not Joined</Badge>}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          </Card>

          <Card>
            <CardTitle>Pending Actions</CardTitle>
            <div className="space-y-3">
               <div className="flex items-start gap-3 p-3 rounded-lg border border-[#FEF3C7] bg-[#FFFBEB] cursor-pointer hover:border-[#FDE68A] transition-colors">
                  <AlertCircle size={20} className="text-[#D97706] shrink-0 mt-0.5" />
                  <div>
                     <div className="font-medium text-[#D97706]">3 logbook entries awaiting approval</div>
                     <div className="text-sm text-[#D97706]/80 mt-1">Students have submitted weekly reports that require your review and feedback.</div>
                  </div>
               </div>
               <div className="flex items-start gap-3 p-3 rounded-lg border border-[#E5E5E5] hover:border-[#111] transition-colors cursor-pointer">
                  <FileText size={20} className="text-[#666] shrink-0 mt-0.5" />
                  <div>
                     <div className="font-medium">2 final evaluations pending</div>
                     <div className="text-sm text-[#666] mt-1">Mid-term evaluations for B.Tech CS branch are due this week.</div>
                  </div>
               </div>
               <div className="flex items-start gap-3 p-3 rounded-lg border border-[#E5E5E5] hover:border-[#111] transition-colors cursor-pointer">
                  <CheckSquare size={20} className="text-[#666] shrink-0 mt-0.5" />
                  <div>
                     <div className="font-medium">1 internship verification request</div>
                     <div className="text-sm text-[#666] mt-1">Rahul M. has requested verification for a new external internship at Adobe.</div>
                  </div>
               </div>
            </div>
          </Card>
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-6">
          <Card>
            <CardTitle>Upcoming Mentorship</CardTitle>
            <div className="space-y-4">
               <div className="flex items-center justify-between p-3 border border-[#E5E5E5] rounded-lg">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-[#FAFAFA] flex items-center justify-center font-medium">AK</div>
                     <div>
                        <div className="font-medium text-sm">Arjun Kumar</div>
                        <div className="text-xs text-[#666] font-jetbrains-mono mt-0.5">Today, 2:30 PM</div>
                     </div>
                  </div>
                  <button className="text-xs font-medium text-[#2563EB] hover:underline">Join</button>
               </div>
               <div className="flex items-center justify-between p-3 border border-[#E5E5E5] rounded-lg">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-[#FAFAFA] flex items-center justify-center font-medium">PS</div>
                     <div>
                        <div className="font-medium text-sm">Priya Sharma</div>
                        <div className="text-xs text-[#666] font-jetbrains-mono mt-0.5">Tomorrow, 10:00 AM</div>
                     </div>
                  </div>
                  <button className="text-xs font-medium text-[#2563EB] hover:underline">Join</button>
               </div>
            </div>
          </Card>

          <Card>
            <CardTitle>Quick Stats</CardTitle>
            <div className="space-y-4">
               <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
                  <span className="text-sm text-[#666]">Placement Rate</span>
                  <span className="font-medium text-sm">82%</span>
               </div>
               <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
                  <span className="text-sm text-[#666]">Avg. Duration</span>
                  <span className="font-medium text-sm">4 Months</span>
               </div>
               <div>
                  <span className="text-sm text-[#666] mb-2 block">Top Recruiters</span>
                  <div className="flex flex-wrap gap-2">
                     <Badge variant="neutral">Razorpay</Badge>
                     <Badge variant="neutral">Swiggy</Badge>
                     <Badge variant="neutral">TCS</Badge>
                  </div>
               </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
