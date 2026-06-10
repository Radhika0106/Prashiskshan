"use client";

import { useState } from "react";
import { useMockData } from "@/context/MockDataContext";
import { Badge } from "@/components/ui/Badge";
import { Camera, Mail, Phone, MapPin, Link as LinkIcon, Code, Globe, UploadCloud, FileText, Trash2, Edit2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export default function StudentProfile() {
  const { currentUserId, students, updateStudent } = useMockData();
  const student = students.find(s => s.id === currentUserId);
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(student ? student.name : "");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {'application/pdf': ['.pdf']},
    onDrop: () => {
      toast.success("Document uploaded successfully");
    }
  });

  if (!student) return null;

  const initials = student.name.split(' ').map(n=>n[0]).join('');

  const handleSaveName = () => {
    if (!editedName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    updateStudent(student.id, { name: editedName });
    setIsEditingName(false);
    toast.success("Profile name updated successfully");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white border border-[#E5E5E5] rounded-[16px] overflow-hidden shadow-sm">
         <div className="h-32 bg-gradient-to-r from-[#FAFAFA] to-[#E5E5E5]"></div>
         <div className="px-6 md:px-10 pb-8 relative">
            <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-sm flex items-center justify-center font-instrument text-[40px] text-[#111111] absolute -top-12 z-10">
               {initials}
               <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-[#E5E5E5] rounded-full flex items-center justify-center text-[#666] shadow-sm hover:text-[#111111] transition-colors">
                 <Camera size={14} />
               </button>
            </div>
            
            <div className="pt-16 flex flex-col md:flex-row md:items-start justify-between gap-4">
               <div>
                  <h1 className="font-instrument text-[32px] leading-tight mb-1">{student.name}</h1>
                  <div className="text-[#666]">{student.course} • {student.college}</div>
               </div>
               <div className="text-right flex items-center gap-4">
                  <div className="text-center">
                     <div className="text-[11px] font-medium text-[#666] uppercase tracking-wider mb-1">Career Readiness</div>
                     <div className="font-jetbrains-mono text-[28px] text-[#111111] leading-none">{student.readinessScore}<span className="text-base text-[#999]">/100</span></div>
                  </div>
                  <div className="h-10 w-px bg-[#E5E5E5]"></div>
                  <div className="text-center">
                     <div className="text-[11px] font-medium text-[#666] uppercase tracking-wider mb-1">Profile</div>
                     <div className="font-jetbrains-mono text-[28px] text-[#16A34A] leading-none">{student.profileCompletion}%</div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#E5E5E5]/50 p-1 rounded-lg overflow-x-auto shrink-0 hide-scrollbar">
        {['personal', 'education', 'skills', 'documents', 'settings'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md whitespace-nowrap capitalize transition-colors ${
              activeTab === tab ? 'bg-white text-[#111111] shadow-sm' : 'text-[#666] hover:text-[#111111]'
            }`}
          >
            {tab === 'personal' ? 'Personal Info' : tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white border border-[#E5E5E5] rounded-[16px] p-6 lg:p-10 shadow-sm animate-in fade-in">
         {activeTab === 'personal' && (
            <div className="space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="font-instrument text-[24px]">Personal Information</h3>
                  {!isEditingName ? (
                     <button onClick={() => { setEditedName(student.name); setIsEditingName(true); }} className="text-[#666] hover:text-[#111] transition-colors"><Edit2 size={16} /></button>
                  ) : (
                     <div className="flex gap-3">
                        <button onClick={handleSaveName} className="text-sm font-semibold text-[#16A34A] hover:underline">Save</button>
                        <button onClick={() => setIsEditingName(false)} className="text-sm font-semibold text-[#DC2626] hover:underline">Cancel</button>
                     </div>
                  )}
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div>
                     <label className="text-xs text-[#666] font-medium block mb-1">Full Name</label>
                     {isEditingName ? (
                        <input
                           type="text"
                           value={editedName}
                           onChange={(e) => setEditedName(e.target.value)}
                           className="px-3 py-1.5 border border-[#E5E5E5] rounded-lg text-sm w-full outline-none focus:border-[#111111] font-inter font-medium"
                        />
                     ) : (
                        <div className="font-medium text-[15px]">{student.name}</div>
                     )}
                  </div>
                  <div>
                     <label className="text-xs text-[#666] font-medium block mb-1">Email <Badge variant="success" className="ml-2 py-0">Verified</Badge></label>
                     <div className="flex items-center gap-2 font-medium text-[15px]"><Mail size={16} className="text-[#999]"/> {student.email}</div>
                  </div>
                  <div>
                     <label className="text-xs text-[#666] font-medium block mb-1">Phone Number</label>
                     <div className="flex items-center gap-2 font-medium text-[15px]"><Phone size={16} className="text-[#999]"/> +91 98765 43210</div>
                  </div>
                  <div>
                     <label className="text-xs text-[#666] font-medium block mb-1">Current Location</label>
                     <div className="flex items-center gap-2 font-medium text-[15px]"><MapPin size={16} className="text-[#999]"/> Bangalore, India</div>
                  </div>
               </div>

               <div className="border-t border-[#E5E5E5] pt-8">
                  <h3 className="font-medium text-base mb-6">Online Presence</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     <div className="flex items-center gap-3 p-3 rounded-lg border border-[#E5E5E5] hover:border-[#111] cursor-pointer transition-colors">
                        <LinkIcon size={20} className="text-[#0077B5]" />
                        <span className="text-sm font-medium">LinkedIn</span>
                     </div>
                     <div className="flex items-center gap-3 p-3 rounded-lg border border-[#E5E5E5] hover:border-[#111] cursor-pointer transition-colors">
                        <Code size={20} />
                        <span className="text-sm font-medium">GitHub</span>
                     </div>
                     <div className="flex items-center gap-3 p-3 rounded-lg border border-[#E5E5E5] hover:border-[#111] cursor-pointer transition-colors">
                        <Globe size={20} className="text-[#999]" />
                        <span className="text-sm font-medium">Portfolio</span>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {activeTab === 'education' && (
            <div className="space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="font-instrument text-[24px]">Education</h3>
                  <button className="text-sm font-medium border border-[#E5E5E5] px-3 py-1.5 rounded-md hover:bg-[#FAFAFA]">+ Add Previous</button>
               </div>
               
               <div className="relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-[#E5E5E5]">
                  <div className="relative">
                     <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-[#111111] ring-4 ring-white"></div>
                     <h4 className="font-medium text-lg text-[#111] leading-tight">{student.college}</h4>
                     <div className="text-sm text-[#666] mb-3">{student.course}</div>
                     <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl p-4 inline-block">
                        <div className="grid grid-cols-3 gap-8">
                           <div>
                              <div className="text-xs text-[#666] mb-1">Year</div>
                              <div className="font-jetbrains-mono font-medium">3rd Year</div>
                           </div>
                           <div>
                              <div className="text-xs text-[#666] mb-1">Branch</div>
                              <div className="font-medium">Information Tech</div>
                           </div>
                           <div>
                              <div className="text-xs text-[#666] mb-1">CGPA</div>
                              <div className="font-jetbrains-mono font-medium">8.4<span className="text-[#999] text-sm">/10</span></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {activeTab === 'skills' && (
            <div className="space-y-8">
               <h3 className="font-instrument text-[24px]">Skills & Proficiencies</h3>
               
               <div>
                  <h4 className="text-sm font-medium uppercase tracking-wider text-[#666] mb-4">Technical Skills</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                     {student.skills.map(skill => (
                        <div key={skill.name} className="flex items-center justify-between p-3 border border-[#E5E5E5] rounded-lg">
                           <span className="font-medium text-sm">{skill.name}</span>
                           <div className="flex gap-1">
                              {[1,2,3].map(level => (
                                 <div key={level} className={`w-2 h-2 rounded-full ${level <= skill.level ? 'bg-[#111111]' : 'bg-[#E5E5E5]'}`}></div>
                              ))}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         )}

         {activeTab === 'documents' && (
            <div className="space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="font-instrument text-[24px]">Documents</h3>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-[#E5E5E5] rounded-lg p-4 flex items-center justify-between group">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#FAFAFA] rounded-md flex items-center justify-center text-[#999]"><FileText size={20}/></div>
                        <div>
                           <div className="font-medium text-sm">Resume_ArjunK.pdf</div>
                           <div className="text-xs text-[#666]">Updated 2 days ago • 1.2 MB</div>
                        </div>
                     </div>
                     <button className="text-[#666] hover:text-[#DC2626] transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={18}/></button>
                  </div>
                  <div className="border border-[#E5E5E5] rounded-lg p-4 flex items-center justify-between group">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#FAFAFA] rounded-md flex items-center justify-center text-[#999]"><FileText size={20}/></div>
                        <div>
                           <div className="font-medium text-sm">College_ID_Card.pdf</div>
                           <div className="text-xs text-[#666]">Verified • 450 KB</div>
                        </div>
                     </div>
                  </div>
               </div>

               <div {...getRootProps()} className={`border-2 border-dashed rounded-[12px] p-8 text-center cursor-pointer transition-colors mt-6 ${isDragActive ? 'border-[#111111] bg-[#FAFAFA]' : 'border-[#E5E5E5] hover:border-[#111] hover:bg-[#FAFAFA]'}`}>
                  <input {...getInputProps()} />
                  <UploadCloud className="mx-auto text-[#999] mb-3" size={32} />
                  <div className="font-medium">Upload New Document</div>
                  <div className="text-sm text-[#666] mt-1">Drag and drop PDF files here, or click to browse.</div>
               </div>
            </div>
         )}

         {activeTab === 'settings' && (
            <div className="space-y-8">
               <h3 className="font-instrument text-[24px]">Settings & Preferences</h3>

               <div className="space-y-6 max-w-lg">
                  <div>
                     <h4 className="font-medium mb-3">Email Notifications</h4>
                     <label className="flex items-center justify-between py-2 border-b border-[#E5E5E5] cursor-pointer group">
                        <span className="text-sm text-[#444] group-hover:text-[#111]">Application updates</span>
                        <input type="checkbox" defaultChecked className="accent-[#111111] w-4 h-4 cursor-pointer" />
                     </label>
                     <label className="flex items-center justify-between py-2 border-b border-[#E5E5E5] cursor-pointer group">
                        <span className="text-sm text-[#444] group-hover:text-[#111]">New internship matches</span>
                        <input type="checkbox" defaultChecked className="accent-[#111111] w-4 h-4 cursor-pointer" />
                     </label>
                     <label className="flex items-center justify-between py-2 border-b border-[#E5E5E5] cursor-pointer group">
                        <span className="text-sm text-[#444] group-hover:text-[#111]">Peer session reminders</span>
                        <input type="checkbox" defaultChecked className="accent-[#111111] w-4 h-4 cursor-pointer" />
                     </label>
                  </div>

                  <div>
                     <h4 className="font-medium mb-3 text-red-600">Danger Zone</h4>
                     <button className="text-sm text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 hover:border-red-300 font-medium px-4 py-2 rounded-lg transition-colors w-full sm:w-auto">
                        Delete my account
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
    </div>
  );
}
