"use client";

import { useState } from "react";
import { useCollegeData } from "@/context/CollegeDataContext";
import { User, Bell, Lock, Save } from "lucide-react";
import { toast } from "sonner";

export default function FacultySettings() {
  const { currentFaculty, updateFaculty } = useCollegeData();
  const [activeTab, setActiveTab] = useState('profile');

  const [name, setName] = useState(currentFaculty ? currentFaculty.name : "");
  const [designation, setDesignation] = useState(currentFaculty ? currentFaculty.designation : "Prof.");
  const [department, setDepartment] = useState(currentFaculty ? currentFaculty.department : "CSE");

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    if (currentFaculty) {
      updateFaculty(currentFaculty.id, {
        name,
        designation: designation as any,
        department
      });
      toast.success("Profile updated successfully");
    }
  };

  const initials = name.split(' ').map(n => n[0]).join('');

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1000px] mx-auto animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2 shrink-0">
        <div>
           <h1 className="font-instrument text-[32px] leading-none mb-1">Faculty Settings</h1>
           <p className="text-[#666] text-[14px]">Manage your academic profile and preferences.</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 bg-[#111] text-white px-5 py-2 rounded-lg text-[13px] font-medium hover:bg-black/90 transition-colors">
          <Save size={16}/> Save Changes
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start mt-8">
         
         {/* Settings Nav Sidebar */}
         <div className="w-full md:w-64 shrink-0 flex flex-col gap-1">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-medium transition-colors ${
                activeTab === 'profile' ? 'bg-[#FAFAFA] text-[#111] border border-[#E5E5E5]' : 'text-[#666] hover:bg-[#FAFAFA] hover:text-[#111] border border-transparent'
              }`}
            >
               <User size={18}/> Academic Profile
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-medium transition-colors ${
                activeTab === 'notifications' ? 'bg-[#FAFAFA] text-[#111] border border-[#E5E5E5]' : 'text-[#666] hover:bg-[#FAFAFA] hover:text-[#111] border border-transparent'
              }`}
            >
               <Bell size={18}/> Notifications
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-medium transition-colors ${
                activeTab === 'security' ? 'bg-[#FAFAFA] text-[#111] border border-[#E5E5E5]' : 'text-[#666] hover:bg-[#FAFAFA] hover:text-[#111] border border-transparent'
              }`}
            >
               <Lock size={18}/> Security
            </button>
         </div>

         {/* Content Area */}
         <div className="flex-1 bg-white border border-[#E5E5E5] rounded-[16px] shadow-sm overflow-hidden min-h-[500px] w-full">
            
            {activeTab === 'profile' && (
              <div className="animate-in fade-in duration-200">
                <div className="p-6 border-b border-[#E5E5E5] bg-[#FAFAFA]">
                  <h2 className="font-medium text-[16px]">Academic Information</h2>
                </div>
                
                <div className="p-6 space-y-6">
                   <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-[#111] rounded-full flex items-center justify-center font-instrument text-2xl text-white uppercase">
                        {initials}
                      </div>
                      <button className="px-4 py-2 text-[13px] font-medium border border-[#E5E5E5] rounded-lg hover:border-[#111] transition-colors">Change Avatar</button>
                      <button className="px-4 py-2 text-[13px] font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">Remove</button>
                   </div>

                   <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
                      <div className="space-y-1.5 col-span-2">
                         <label className="text-[13px] font-medium text-[#111]">Full Name</label>
                         <input 
                           type="text" 
                           value={name} 
                           onChange={(e) => setName(e.target.value)} 
                           className="w-full h-10 px-3 text-[14px] bg-white border border-[#E5E5E5] rounded-lg outline-none focus:border-[#111]" 
                         />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[13px] font-medium text-[#111]">Designation</label>
                         <select 
                           value={designation} 
                           onChange={(e) => setDesignation(e.target.value as any)} 
                           className="w-full h-10 px-3 text-[14px] bg-white border border-[#E5E5E5] rounded-lg outline-none focus:border-[#111]"
                         >
                           <option value="Prof.">Professor</option>
                           <option value="Assoc. Prof.">Associate Professor</option>
                           <option value="Asst. Prof.">Assistant Professor</option>
                         </select>
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[13px] font-medium text-[#111]">Department</label>
                         <input 
                           type="text" 
                           value={department} 
                           onChange={(e) => setDepartment(e.target.value)} 
                           className="w-full h-10 px-3 text-[14px] bg-white border border-[#E5E5E5] rounded-lg outline-none focus:border-[#111]" 
                         />
                      </div>
                      <div className="space-y-1.5 col-span-2">
                         <label className="text-[13px] font-medium text-[#111]">Email Address</label>
                         <input type="email" defaultValue={currentFaculty?.email} className="w-full h-10 px-3 text-[14px] bg-white border border-[#E5E5E5] rounded-lg outline-none text-[#666] bg-[#FAFAFA]" disabled />
                      </div>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="animate-in fade-in duration-200">
                <div className="p-6 border-b border-[#E5E5E5] bg-[#FAFAFA]">
                  <h2 className="font-medium text-[16px]">Notification Preferences</h2>
                </div>
                
                <div className="p-6 divide-y divide-[#E5E5E5]">
                   <div className="py-4 flex items-center justify-between">
                     <div>
                       <div className="font-medium text-[14px] text-[#111] mb-1">Mentees Logbook Alerts</div>
                       <div className="text-[13px] text-[#666]">Receive immediate notifications when mentees submit weekly reports.</div>
                     </div>
                     <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#111]"></div>
                     </label>
                   </div>
                   <div className="py-4 flex items-center justify-between">
                     <div>
                       <div className="font-medium text-[14px] text-[#111] mb-1">Evaluation Reminders</div>
                       <div className="text-[13px] text-[#666]">Notify when mid-term or final evaluations are due.</div>
                     </div>
                     <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#111]"></div>
                     </label>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="p-20 text-center text-[#999] animate-in fade-in duration-200">
                 [ Security settings and credential management ]
              </div>
            )}

         </div>

      </div>
    </div>
  );
}
