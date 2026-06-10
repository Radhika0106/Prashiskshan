"use client";

import { useState } from "react";
import { Users, Plus, Shield, Mail, MoreHorizontal, CheckCircle2, UserPlus, Search } from "lucide-react";
import { toast } from "sonner";

export default function TeamPage() {
  const [showInviteModal, setShowInviteModal] = useState(false);

  const team = [
    { id: 1, name: "Kashyap Khajuria", email: "kashyap@techcorp.com", role: "Account Owner", status: "Active", avatar: "KK" },
    { id: 2, name: "Sarah Chen", email: "sarah@techcorp.com", role: "Hiring Manager", status: "Active", avatar: "SC" },
    { id: 3, name: "Mike Johnson", email: "mike@techcorp.com", role: "Intern Mentor", status: "Active", avatar: "MJ" },
    { id: 4, name: "Emily Davis", email: "emily@techcorp.com", role: "Intern Mentor", status: "Pending", avatar: "ED" },
  ];

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col pb-12">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-instrument text-3xl tracking-tight text-[#111111] mb-2">Team Management</h1>
          <p className="text-[#666666] font-inter text-sm">Manage access levels and invite team members.</p>
        </div>
        
        <button 
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white rounded-lg text-sm font-medium hover:bg-black/90"
        >
          <UserPlus size={16} /> Invite Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="flex items-center gap-3 mb-2">
            <Shield size={20} className="text-[#111111]" />
            <h3 className="font-medium text-[#111111]">Account Owner</h3>
          </div>
          <p className="text-sm text-[#666666] mb-4">Full access, billing, and team management.</p>
          <div className="text-2xl font-mono text-[#111111]">1</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="flex items-center gap-3 mb-2">
            <Users size={20} className="text-[#111111]" />
            <h3 className="font-medium text-[#111111]">Hiring Manager</h3>
          </div>
          <p className="text-sm text-[#666666] mb-4">Post roles, review candidates, conduct interviews.</p>
          <div className="text-2xl font-mono text-[#111111]">1</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="flex items-center gap-3 mb-2">
            <Users size={20} className="text-[#111111]" />
            <h3 className="font-medium text-[#111111]">Intern Mentor</h3>
          </div>
          <p className="text-sm text-[#666666] mb-4">View assigned interns, provide feedback.</p>
          <div className="text-2xl font-mono text-[#111111]">2</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E5E5] rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-[#E5E5E5] flex justify-between items-center bg-[#F9FAFB]">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
            <input 
              placeholder="Search team..."
              className="pl-9 pr-4 py-1.5 border border-[#E5E5E5] rounded-lg font-inter text-sm focus:outline-none focus:border-[#111111] w-64 bg-white"
            />
          </div>
          <select className="px-3 py-1.5 border border-[#E5E5E5] rounded-lg font-inter text-sm bg-white focus:outline-none focus:border-[#111111]">
            <option>All Roles</option>
            <option>Account Owner</option>
            <option>Hiring Manager</option>
            <option>Intern Mentor</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-inter">
            <thead className="bg-[#F7F6F3] text-[#666666] font-medium border-b border-[#E5E5E5]">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {team.map((member) => (
                <tr key={member.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center text-xs font-medium text-[#111111]">
                        {member.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-[#111111]">{member.name}</div>
                        <div className="text-xs text-[#666666]">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-[#F3F4F6] text-[#374151] rounded-md font-mono text-[11px]">
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {member.status === 'Active' ? (
                      <span className="flex items-center gap-1.5 text-xs text-[#059669]">
                        <CheckCircle2 size={14} /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs text-[#D97706]">
                        <Mail size={14} /> Invite Sent
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    {member.role !== 'Account Owner' && (
                      <button className="p-1.5 text-[#666666] hover:bg-[#E5E5E5] rounded"><MoreHorizontal size={16} /></button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-[#E5E5E5]">
              <h2 className="font-instrument text-2xl tracking-tight">Invite Team Member</h2>
              <p className="text-sm text-[#666666] mt-1">Send an invitation link to join your company workspace.</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#111111] mb-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="colleague@company.com"
                  className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm focus:outline-none focus:border-[#111111]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111111] mb-1">Role</label>
                <select className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm bg-white focus:outline-none focus:border-[#111111]">
                  <option>Hiring Manager</option>
                  <option>Intern Mentor</option>
                  <option>Account Owner</option>
                </select>
                <p className="text-xs text-[#666666] mt-2">Hiring Managers can post jobs and review candidates. Mentors can only view assigned interns.</p>
              </div>
            </div>
            <div className="p-4 bg-[#F9FAFB] border-t border-[#E5E5E5] flex justify-end gap-3">
              <button 
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 text-sm font-medium text-[#666666] hover:text-[#111111]"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  toast.success("Invitation sent successfully!");
                  setShowInviteModal(false);
                }}
                className="px-4 py-2 bg-[#111111] text-white rounded-lg text-sm font-medium hover:bg-black/90"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
