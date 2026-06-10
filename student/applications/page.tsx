"use client";

import { useState, Fragment } from "react";
import { useMockData } from "@/context/MockDataContext";
import { Badge } from "@/components/ui/Badge";
import { ChevronDown, ChevronUp, Eye, Trash2, Calendar, CheckCircle2, Clock, UploadCloud, MapPin, Video } from "lucide-react";

export default function MyApplications() {
  const { applications, internships, companies, currentUserId } = useMockData();
  const [activeTab, setActiveTab] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const studentApplications = applications.filter(a => a.studentId === currentUserId);
  const tabs = ['All', 'Pending', 'Shortlisted', 'Rejected', 'Accepted'];

  const filteredApps = activeTab === 'All' 
    ? studentApplications 
    : studentApplications.filter(a => a.status === activeTab);

  const toggleExpand = (id: string) => {
    if (expandedId === id) setExpandedId(null);
    else setExpandedId(id);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-instrument text-[32px] leading-tight">My Applications</h1>
          <p className="text-[#666] text-sm mt-1">Track and manage your internship applications.</p>
        </div>
        
        {/* Tabs */}
        <div className="flex bg-[#E5E5E5]/50 p-1 rounded-lg overflow-x-auto shrink-0 hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === tab 
                  ? 'bg-white text-[#111111] shadow-sm' 
                  : 'text-[#666] hover:text-[#111111] hover:bg-[#E5E5E5]/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-[#E5E5E5] rounded-[12px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
                <th className="px-6 py-4 text-xs font-medium text-[#666] uppercase tracking-wider">Role & Company</th>
                <th className="px-6 py-4 text-xs font-medium text-[#666] uppercase tracking-wider">Applied On</th>
                <th className="px-6 py-4 text-xs font-medium text-[#666] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-medium text-[#666] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-3">
                      <Clock size={24} className="text-[#999]" />
                    </div>
                    <div className="font-instrument text-[20px] mb-1">No applications found</div>
                    <div className="text-sm text-[#666]">You haven't applied to any roles in this category yet.</div>
                  </td>
                </tr>
              ) : (
                filteredApps.map(app => {
                  const internship = internships.find(i => i.id === app.internshipId);
                  const company = companies.find(c => c.id === internship?.companyId);
                  const isExpanded = expandedId === app.id;
                  
                  let badgeVariant: 'warning'|'success'|'danger'|'info'|'neutral' = 'neutral';
                  if (app.status === 'Pending') badgeVariant = 'warning';
                  else if (app.status === 'Shortlisted') badgeVariant = 'info';
                  else if (app.status === 'Accepted') badgeVariant = 'success';
                  else if (app.status === 'Rejected') badgeVariant = 'danger';

                  return (
                    <Fragment key={app.id}>
                      <tr 
                        className={`hover:bg-[#FAFAFA] transition-colors cursor-pointer ${isExpanded ? 'bg-[#FAFAFA]' : ''}`}
                        onClick={() => toggleExpand(app.id)}
                      >
                        <td className="px-6 py-4">
                          <div className="font-instrument text-[18px]">{internship?.title}</div>
                          <div className="text-[13px] text-[#666] mt-0.5">{company?.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-jetbrains-mono text-[13px]">{app.appliedOn}</span>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={badgeVariant}>{app.status}</Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                             <button className="p-1.5 text-[#666] hover:text-[#111111] hover:bg-[#E5E5E5] rounded transition-colors" title="View details">
                               <Eye size={18} />
                             </button>
                             {app.status === 'Pending' && (
                               <button className="p-1.5 text-[#666] hover:text-[#DC2626] hover:bg-[#FEF2F2] rounded transition-colors" title="Withdraw application">
                                 <Trash2 size={18} />
                               </button>
                             )}
                             <button className="p-1.5 text-[#999] ml-2">
                               {isExpanded ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                             </button>
                          </div>
                        </td>
                      </tr>
                      {/* Expanded Row Content */}
                      {isExpanded && (
                        <tr className="bg-[#FAFAFA]">
                          <td colSpan={4} className="px-6 pb-6 pt-2 border-b border-[#E5E5E5]">
                            <div className="p-6 bg-white border border-[#E5E5E5] rounded-xl flex flex-col md:flex-row gap-8">
                              
                              {/* Timeline */}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm mb-4">Application Timeline</h4>
                                <div className="space-y-4 relative before:absolute before:inset-0 before:left-2.5 before:w-px before:bg-[#E5E5E5]">
                                  {app.timeline.map((event, i) => (
                                    <div key={i} className="flex gap-4 relative z-10">
                                      <div className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center mt-0.5
                                        ${event.status === 'completed' ? 'bg-[#111111] text-white' : 
                                          event.status === 'current' ? 'bg-white border-2 border-[#111111]' : 
                                          'bg-white border border-[#E5E5E5]'}
                                      `}>
                                        {event.status === 'completed' && <CheckCircle2 size={12} />}
                                      </div>
                                      <div>
                                        <div className={`text-sm ${event.status === 'upcoming' ? 'text-[#999]' : 'font-medium text-[#111111]'}`}>
                                          {event.stage}
                                        </div>
                                        {event.date && (
                                          <div className="font-jetbrains-mono text-[11px] text-[#666] mt-0.5">{event.date}</div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Conditional specific cards */}
                              <div className="flex-1 min-w-0">
                                {app.status === 'Shortlisted' && (
                                  <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-lg p-5">
                                    <h4 className="font-instrument text-xl mb-3 text-[#1E3A8A]">Interview Scheduled</h4>
                                    <div className="space-y-2 mb-4">
                                      <div className="flex items-center gap-2 text-sm text-[#1E3A8A]">
                                        <Calendar size={16}/> <span className="font-medium">Tomorrow, 10:00 AM</span>
                                      </div>
                                      <div className="flex items-center gap-2 text-sm text-[#1E3A8A]">
                                        <Video size={16}/> <span>Virtual (Google Meet)</span>
                                      </div>
                                      <div className="flex items-center gap-2 text-sm text-[#1E3A8A]">
                                        <Eye size={16}/> <span>Interviewer: Sarah K.</span>
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      <button className="bg-white text-[#1E3A8A] border border-[#DBEAFE] px-3 py-1.5 rounded-md text-sm font-medium hover:bg-[#DBEAFE] transition-colors">Add to Calendar</button>
                                      <button className="bg-[#1E3A8A] text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-[#1E3A8A]/90 transition-colors">Join Call</button>
                                    </div>
                                  </div>
                                )}

                                {app.status === 'Accepted' && (
                                  <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-lg p-5">
                                    <h4 className="font-instrument text-xl mb-3 text-[#166534]">Offer Accepted!</h4>
                                    <p className="text-sm text-[#166534] mb-4">Welcome to the team. Please complete your onboarding checklist before the start date.</p>
                                    <button className="bg-[#166534] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#166534]/90 transition-colors w-full flex items-center justify-center gap-2">
                                      Start Onboarding <ChevronDown size={16}/>
                                    </button>
                                  </div>
                                )}

                                {app.status === 'Pending' && (
                                  <div className="bg-[#F7F6F3] border border-[#E5E5E5] rounded-lg p-5">
                                    <h4 className="font-instrument text-xl mb-3 text-[#111]">Application Details</h4>
                                    <div className="space-y-3">
                                       <div>
                                         <div className="text-xs text-[#666] mb-1">Applied for</div>
                                         <div className="text-sm font-medium">{internship?.title}</div>
                                       </div>
                                       <div>
                                         <div className="text-xs text-[#666] mb-1">Company Info</div>
                                         <div className="text-sm">{company?.name} • {internship?.location}</div>
                                       </div>
                                       <div className="pt-2">
                                         <button className="text-sm font-medium flex items-center gap-1.5 hover:underline transition-colors"><UploadCloud size={14} /> View Submitted Resume</button>
                                       </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
