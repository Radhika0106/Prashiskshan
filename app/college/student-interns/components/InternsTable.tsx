"use client";

import { useInternsStore } from "@/lib/store/internsStore";
import { Eye, FileText, MoreHorizontal, MapPin, Star } from "lucide-react";
import { format, differenceInWeeks } from "date-fns";

export default function InternsTable() {
  const { interns, searchQuery, statusFilter, deptFilter, setSelectedIntern } = useInternsStore();

  const filteredInterns = interns.filter((intern) => {
    const matchesSearch = 
      intern.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intern.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intern.roleTitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || intern.status === statusFilter;
    const matchesDept = deptFilter === 'All' || intern.department === deptFilter;

    return matchesSearch && matchesStatus && matchesDept;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Completed': return 'bg-gray-100 text-gray-700';
      case 'Upcoming': return 'bg-blue-100 text-blue-700';
      case 'On Hold': return 'bg-yellow-100 text-yellow-700';
      case 'Terminated': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (filteredInterns.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-[#F7F6F3] rounded-full flex items-center justify-center mb-4">
          <FileText size={32} className="text-[#999]" strokeWidth={1} />
        </div>
        <h3 className="font-instrument text-[20px] text-[#111]">No student interns yet</h3>
        <p className="font-inter text-[14px] text-[#666] mt-1">Students will appear here once they start internships<br/>through the platform.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
            <th className="px-5 py-3 text-[12px] font-inter font-medium text-[#666] uppercase tracking-wider">Student</th>
            <th className="px-5 py-3 text-[12px] font-inter font-medium text-[#666] uppercase tracking-wider">Internship Details</th>
            <th className="px-5 py-3 text-[12px] font-inter font-medium text-[#666] uppercase tracking-wider">Duration</th>
            <th className="px-5 py-3 text-[12px] font-inter font-medium text-[#666] uppercase tracking-wider">Status</th>
            <th className="px-5 py-3 text-[12px] font-inter font-medium text-[#666] uppercase tracking-wider">Performance</th>
            <th className="px-5 py-3 text-[12px] font-inter font-medium text-[#666] uppercase tracking-wider">Last Activity</th>
            <th className="px-5 py-3 text-[12px] font-inter font-medium text-[#666] uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInterns.map((intern) => (
            <tr 
              key={intern.id} 
              className="border-b border-[#E5E5E5] hover:bg-[#F7F6F3] transition-colors cursor-pointer group"
              onClick={() => setSelectedIntern(intern.id)}
            >
              <td className="px-5 py-4 align-top">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#111] text-white flex items-center justify-center font-inter text-[12px] shrink-0">
                    {intern.avatarInitials}
                  </div>
                  <div>
                    <div className="font-inter font-medium text-[14px] text-[#111]">{intern.studentName}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-inter text-[12px] text-[#666]">{intern.rollNumber}</span>
                      <span className="font-jetbrains-mono text-[10px] bg-[#E5E5E5] text-[#444] px-1.5 py-0.5 rounded uppercase tracking-wider">
                        {intern.department}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              
              <td className="px-5 py-4 align-top">
                <div className="font-inter font-medium text-[14px] text-[#111]">{intern.companyName}</div>
                <div className="font-inter text-[13px] text-[#666] mt-0.5">{intern.roleTitle}</div>
                <div className="flex items-center gap-1 mt-1 text-[#999]">
                  <MapPin size={12} />
                  <span className="font-inter text-[12px]">{intern.location}</span>
                </div>
              </td>

              <td className="px-5 py-4 align-top">
                <div className="font-jetbrains-mono text-[13px] text-[#111]">
                  {format(new Date(intern.startDate), 'MMM d')} → {format(new Date(intern.endDate), 'MMM d')}
                </div>
                <div className="font-inter text-[12px] text-[#666] mt-1">{intern.durationWeeks} weeks total</div>
                
                {intern.status === 'Active' && (
                  <div className="mt-2 w-full max-w-[120px] h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#111]" 
                      style={{ width: `${Math.min(100, (differenceInWeeks(new Date(), new Date(intern.startDate)) / intern.durationWeeks) * 100)}%` }}
                    />
                  </div>
                )}
              </td>

              <td className="px-5 py-4 align-top">
                <span className={`inline-block px-2.5 py-1 rounded-full font-inter text-[12px] font-medium ${getStatusColor(intern.status)}`}>
                  {intern.status}
                </span>
              </td>

              <td className="px-5 py-4 align-top">
                {intern.performanceRating > 0 ? (
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-[#111] fill-[#111]" />
                    <span className="font-jetbrains-mono text-[14px] font-medium text-[#111]">{intern.performanceRating}</span>
                  </div>
                ) : (
                  <span className="font-inter text-[12px] bg-[#F7F6F3] text-[#666] px-2 py-1 rounded">Pending eval</span>
                )}
              </td>

              <td className="px-5 py-4 align-top">
                <div className={`font-jetbrains-mono text-[12px] ${intern.lastActivity.includes('warning') ? 'text-red-500' : 'text-[#666]'}`}>
                  {intern.lastActivity}
                </div>
              </td>

              <td className="px-5 py-4 align-top text-right">
                <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                  <button 
                    onClick={() => setSelectedIntern(intern.id)}
                    className="p-1.5 text-[#666] hover:text-[#111] hover:bg-[#E5E5E5] rounded transition-colors"
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedIntern(intern.id);
                      // In a real app we might auto-switch to report tab here
                    }}
                    className="p-1.5 text-[#666] hover:text-[#111] hover:bg-[#E5E5E5] rounded transition-colors"
                    title="Quick Report"
                  >
                    <FileText size={16} />
                  </button>
                  <button 
                    className="p-1.5 text-[#666] hover:text-[#111] hover:bg-[#E5E5E5] rounded transition-colors"
                    title="More options"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
