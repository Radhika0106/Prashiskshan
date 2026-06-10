"use client";

import { useState } from "react";
import { User, CreditCard, Bell, Blocks, Save, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useMockData } from "@/context/MockDataContext";

export default function SettingsPage() {
  const { industryUser, updateIndustryUser, companies, updateCompany } = useMockData();
  const company = companies[0];
  
  const [activeTab, setActiveTab] = useState<'profile' | 'billing' | 'notifications' | 'integrations'>('profile');
  const [firstName, setFirstName] = useState(industryUser.firstName);
  const [lastName, setLastName] = useState(industryUser.lastName);
  const [companyName, setCompanyName] = useState(company ? company.name : "");

  const handleSave = () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast.error("First name and Last name cannot be empty");
      return;
    }
    updateIndustryUser({ firstName, lastName });
    if (company && companyName.trim()) {
      updateCompany(company.id, { name: companyName });
    }
    toast.success("Profile updated successfully");
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col pb-12">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-instrument text-3xl tracking-tight text-[#111111] mb-2">Settings</h1>
          <p className="text-[#666666] font-inter text-sm">Manage your personal preferences and workspace configuration.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-1">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'profile' ? 'bg-[#111111] text-white' : 'text-[#666666] hover:bg-[#F3F4F6]'
            }`}
          >
            <User size={18} /> My Profile
          </button>
          <button 
            onClick={() => setActiveTab('billing')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'billing' ? 'bg-[#111111] text-white' : 'text-[#666666] hover:bg-[#F3F4F6]'
            }`}
          >
            <CreditCard size={18} /> Billing & Plan
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'notifications' ? 'bg-[#111111] text-white' : 'text-[#666666] hover:bg-[#F3F4F6]'
            }`}
          >
            <Bell size={18} /> Notifications
          </button>
          <button 
            onClick={() => setActiveTab('integrations')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'integrations' ? 'bg-[#111111] text-white' : 'text-[#666666] hover:bg-[#F3F4F6]'
            }`}
          >
            <Blocks size={18} /> Integrations
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-[#E5E5E5]">
            
            {activeTab === 'profile' && (
              <div className="p-8">
                <h2 className="font-instrument text-2xl tracking-tight mb-6">Personal Profile</h2>
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-full bg-[#F3F4F6] flex items-center justify-center text-xl font-medium text-[#111111] uppercase">
                    {(firstName[0] || 'K')}{(lastName[0] || 'K')}
                  </div>
                  <div>
                    <button className="px-4 py-2 border border-[#E5E5E5] rounded-lg text-sm font-medium hover:bg-[#F9FAFB] mb-2">
                      Change Avatar
                    </button>
                    <p className="text-xs text-[#666666]">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-1">First Name</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm focus:outline-none focus:border-[#111111]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-1">Last Name</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm focus:outline-none focus:border-[#111111]" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#111111] mb-1">Company Name</label>
                    <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm focus:outline-none focus:border-[#111111]" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#111111] mb-1">Email Address</label>
                    <input type="email" defaultValue={industryUser.email} disabled className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm bg-[#F9FAFB] text-[#666666]" />
                    <p className="text-xs text-[#666666] mt-1">To change your email address, contact support.</p>
                  </div>
                </div>

                <hr className="border-[#E5E5E5] my-8" />
                
                <h3 className="font-instrument text-xl mb-4">Change Password</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-1">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm focus:outline-none focus:border-[#111111]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-1">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm focus:outline-none focus:border-[#111111]" />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2 bg-[#111111] text-white rounded-lg text-sm font-medium hover:bg-black/90"
                  >
                    <Save size={16} /> Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="p-8">
                <h2 className="font-instrument text-2xl tracking-tight mb-6">Billing & Plan</h2>
                
                <div className="p-6 border border-[#111111] rounded-xl bg-[#F9FAFB] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-lg text-[#111111]">Enterprise Plan</h3>
                      <span className="px-2 py-0.5 bg-[#111111] text-white rounded font-mono text-[10px]">CURRENT</span>
                    </div>
                    <p className="text-sm text-[#666666]">Unlimited postings, premium candidate access, API integrations.</p>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-2xl text-[#111111]">$499<span className="text-sm text-[#666666]">/mo</span></div>
                    <button className="text-sm font-medium text-[#111111] hover:underline mt-1">Change Plan</button>
                  </div>
                </div>

                <h3 className="font-instrument text-xl mb-4">Payment Method</h3>
                <div className="flex items-center justify-between p-4 border border-[#E5E5E5] rounded-xl mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-[#F3F4F6] rounded flex items-center justify-center border border-[#E5E5E5]">
                      <span className="font-mono text-[10px] font-bold">VISA</span>
                    </div>
                    <div>
                      <div className="font-medium text-sm text-[#111111]">Visa ending in 4242</div>
                      <div className="text-xs text-[#666666]">Expires 12/28</div>
                    </div>
                  </div>
                  <button className="text-sm font-medium text-[#111111] hover:underline">Edit</button>
                </div>

                <h3 className="font-instrument text-xl mb-4">Billing History</h3>
                <table className="w-full text-left text-sm font-inter">
                  <thead className="bg-[#F7F6F3] text-[#666666] font-medium border-b border-[#E5E5E5]">
                    <tr>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5E5]">
                    {['May 1, 2026', 'Apr 1, 2026', 'Mar 1, 2026'].map((date) => (
                      <tr key={date}>
                        <td className="px-4 py-3 text-[#111111]">{date}</td>
                        <td className="px-4 py-3 font-mono">$499.00</td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1 text-[11px] font-mono text-[#059669]">
                            <CheckCircle2 size={12} /> Paid
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button className="text-[#111111] hover:underline text-xs">Download PDF</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="p-8">
                <h2 className="font-instrument text-2xl tracking-tight mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-3 border-b border-[#E5E5E5]">
                    <div>
                      <h4 className="font-medium text-[#111111]">New Applications</h4>
                      <p className="text-sm text-[#666666]">When a student applies to one of your active roles.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-[#E5E5E5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#111111]"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-[#E5E5E5]">
                    <div>
                      <h4 className="font-medium text-[#111111]">Intern Logbook Updates</h4>
                      <p className="text-sm text-[#666666]">When an assigned intern submits a weekly logbook.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-[#E5E5E5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#111111]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-[#E5E5E5]">
                    <div>
                      <h4 className="font-medium text-[#111111]">Daily Summary</h4>
                      <p className="text-sm text-[#666666]">A daily digest of activity across your workspace.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-[#E5E5E5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#111111]"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="p-8">
                <h2 className="font-instrument text-2xl tracking-tight mb-2">Integrations</h2>
                <p className="text-[#666666] text-sm mb-6">Connect Prashikshan with your existing tools.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 border border-[#E5E5E5] rounded-xl flex items-start justify-between bg-[#F9FAFB]">
                    <div>
                      <h4 className="font-medium text-[#111111] mb-1">Slack</h4>
                      <p className="text-xs text-[#666666] mb-3">Get notifications directly in your team channels.</p>
                      <button className="px-3 py-1.5 border border-[#E5E5E5] bg-white rounded text-xs font-medium hover:bg-[#F3F4F6]">Connect</button>
                    </div>
                    <div className="w-10 h-10 bg-white rounded-lg border border-[#E5E5E5] flex items-center justify-center font-bold text-[#111111]">S</div>
                  </div>
                  
                  <div className="p-5 border border-[#E5E5E5] rounded-xl flex items-start justify-between bg-white border-[#111111]">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-[#111111]">Google Calendar</h4>
                        <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
                      </div>
                      <p className="text-xs text-[#666666] mb-3">Sync interviews automatically.</p>
                      <button className="px-3 py-1.5 border border-[#E5E5E5] bg-white rounded text-xs font-medium text-[#DC2626] hover:bg-[#FEF2F2]">Disconnect</button>
                    </div>
                    <div className="w-10 h-10 bg-white rounded-lg border border-[#E5E5E5] flex items-center justify-center font-bold text-[#111111]">G</div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
