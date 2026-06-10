"use client";

import { useState } from "react";
import { 
  Briefcase, Search, Plus, Calendar, ExternalLink, 
  MapPin, CheckCircle, Clock, Building, Users
} from "lucide-react";

// Mock Data for CRM
const PIPELINE = [
  { id: 'c1', name: 'Google India', status: 'Active MoU', type: 'Tech', contact: 'HR Lead - Campus', interns: 12 },
  { id: 'c2', name: 'Razorpay', status: 'Placement Drive', type: 'FinTech', contact: 'Talent Acquisition', slots: 15, date: 'Tomorrow, 10:00 AM' },
  { id: 'c3', name: 'Tata Motors', status: 'Negotiating', type: 'Manufacturing', contact: 'VP Engineering',  },
  { id: 'c4', name: 'Infosys', status: 'Active MoU', type: 'IT Services', contact: 'Campus Lead', interns: 45 },
  { id: 'c5', name: 'Stripe', status: 'Initial Contact', type: 'FinTech', contact: 'Recruitment Eng', },
];

export default function IndustryPartnerships() {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1400px] mx-auto h-[min(calc(100vh-4rem),900px)] flex flex-col animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2 shrink-0">
        <div>
           <div className="flex items-center gap-3 mb-1">
             <div className="w-10 h-10 bg-[#111] text-white rounded-lg flex items-center justify-center">
               <Building size={20} />
             </div>
             <h1 className="font-instrument text-[32px] leading-none">Industry Partnerships</h1>
           </div>
          <p className="text-[#666] text-[14px] mt-2">Manage placement drives, track MoUs, and build relationships.</p>
        </div>
        
        <div className="bg-[#E5E5E5]/50 p-1 rounded-[10px] flex gap-1">
          <button 
            onClick={() => setActiveTab('pipeline')}
            className={`px-6 py-2 rounded-[8px] text-[13px] font-medium transition-all ${
              activeTab === 'pipeline' ? 'bg-white text-[#111] shadow-sm' : 'text-[#666] hover:text-[#111]'
            }`}
          >
            Engagement Pipeline
          </button>
          <button 
            onClick={() => setActiveTab('drives')}
            className={`px-6 py-2 rounded-[8px] text-[13px] font-medium transition-all ${
              activeTab === 'drives' ? 'bg-white text-[#111] shadow-sm' : 'text-[#666] hover:text-[#111]'
            }`}
          >
            Placement Drives
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center shrink-0">
         <div className="flex items-center w-full max-w-sm bg-white rounded-lg px-3 py-2 border border-[#E5E5E5] focus-within:border-[#111] transition-all shadow-sm">
           <Search size={16} className="text-[#999] mr-2 shrink-0" />
           <input 
             type="text" 
             placeholder="Search partners..." 
             value={searchQuery}
             onChange={e => setSearchQuery(e.target.value)}
             className="bg-transparent border-none outline-none w-full text-[13px] font-inter" 
           />
         </div>
         <button className="flex items-center gap-2 bg-[#111] text-white px-4 py-2 rounded-lg text-[13px] font-medium hover:bg-black/90 transition-colors">
           <Plus size={16}/> Add Partner
         </button>
      </div>

      {activeTab === 'pipeline' && (
        <div className="flex-1 min-h-0 flex gap-6 overflow-x-auto pb-4 pt-2">
           
           {/* Columns */}
           {['Initial Contact', 'Negotiating', 'Active MoU'].map((stage, idx) => (
              <div key={stage} className="flex-shrink-0 w-[340px] flex flex-col bg-[#E5E5E5]/40 rounded-[16px] border border-[#E5E5E5] overflow-hidden">
                 <div className="p-4 border-b border-[#E5E5E5] bg-[#F7F6F3] flex justify-between items-center shrink-0">
                    <h3 className="font-medium text-[15px] flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-gray-400' : idx === 1 ? 'bg-amber-500' : 'bg-green-500'}`}></div> 
                      {stage.toUpperCase()}
                    </h3>
                    <span className="font-jetbrains-mono bg-[#E5E5E5] text-[#666] text-[11px] px-2 py-0.5 rounded">
                      {PIPELINE.filter(p => p.status === stage).length}
                    </span>
                 </div>
                 
                 <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {PIPELINE.filter(p => p.status === stage && p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(company => (
                       <div key={company.id} className="bg-white border border-[#E5E5E5] rounded-[12px] p-4 cursor-pointer hover:border-[#111] transition-colors shadow-sm group">
                          <div className="flex justify-between items-start mb-2">
                             <div className="w-10 h-10 rounded bg-[#F7F6F3] flex items-center justify-center font-instrument text-lg text-[#111]">
                               {company.name[0]}
                             </div>
                             <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">{company.type}</span>
                          </div>
                          <h4 className="font-medium text-[16px] mb-1">{company.name}</h4>
                          <div className="text-[12px] text-[#666] mb-4 flex items-center gap-1.5"><Users size={12}/> {company.contact}</div>
                          
                          {company.interns && (
                            <div className="pt-3 border-t border-[#E5E5E5] flex items-center justify-between">
                              <span className="text-[11px] text-[#999] uppercase tracking-wider font-medium">Active Interns</span>
                              <span className="font-jetbrains-mono text-[14px] text-green-700 bg-green-50 px-2 rounded">{company.interns}</span>
                            </div>
                          )}
                       </div>
                    ))}
                 </div>
              </div>
           ))}
        </div>
      )}

      {activeTab === 'drives' && (
        <div className="flex-1 min-h-0 bg-white border border-[#E5E5E5] rounded-[16px] overflow-hidden shadow-sm flex flex-col">
           <div className="overflow-x-auto flex-1">
             <table className="w-full text-left text-[14px]">
                <thead className="text-[#666] text-[12px] font-medium border-b border-[#E5E5E5] bg-[#F7F6F3]">
                   <tr>
                     <th className="px-6 py-4 font-medium">Company</th>
                     <th className="px-6 py-4 font-medium">Schedule</th>
                     <th className="px-6 py-4 font-medium">Slots/Roles</th>
                     <th className="px-6 py-4 font-medium">Status</th>
                     <th className="px-6 py-4 font-medium text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                   {PIPELINE.filter(p => p.status === 'Placement Drive').map(comp => (
                     <tr key={comp.id} className="hover:bg-[#FAFAFA] transition-colors">
                        <td className="px-6 py-5">
                           <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded bg-[#111] text-white flex items-center justify-center font-instrument text-xl">{comp.name[0]}</div>
                             <div>
                               <div className="font-medium text-[#111]">{comp.name}</div>
                               <div className="text-[12px] text-[#666]">{comp.type}</div>
                             </div>
                           </div>
                        </td>
                        <td className="px-6 py-5">
                           <div className="flex items-center gap-2 text-[13px] text-[#444] font-medium">
                             <Calendar size={14} className="text-[#999]"/> {comp.date?.split(',')[0]}
                           </div>
                           <div className="flex items-center gap-2 text-[12px] text-[#999] mt-1">
                             <Clock size={12}/> {comp.date?.split(',')[1]}
                           </div>
                        </td>
                        <td className="px-6 py-5">
                           <div className="font-jetbrains-mono text-[15px] font-medium text-[#111]">{comp.slots}</div>
                           <div className="text-[11px] text-[#999] uppercase tracking-wider">Openings</div>
                        </td>
                        <td className="px-6 py-5">
                           <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wide">
                             Upcoming
                           </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                           <button className="text-[12px] font-medium border border-[#E5E5E5] bg-white px-3 py-1.5 rounded shadow-sm hover:border-[#111] transition-colors">
                             Manage Drive
                           </button>
                        </td>
                     </tr>
                   ))}
                   {PIPELINE.filter(p => p.status === 'Placement Drive').length === 0 && (
                     <tr><td colSpan={5} className="px-6 py-10 text-center text-[#999] italic">No active placement drives scheduled.</td></tr>
                   )}
                </tbody>
             </table>
           </div>
        </div>
      )}
    </div>
  );
}
