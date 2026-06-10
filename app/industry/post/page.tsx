"use client";

import { useState } from "react";
import { RichTextEditor } from "@/components/RichTextEditor";
import { useIndustryStore } from "@/lib/store/industryStore";
import { 
  Sparkles, Plus, Trash2, GripVertical, CheckCircle2, 
  AlertTriangle, Save, Calendar, Building, Clock, MapPin, X
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function PostInternshipPage() {
  const [activeTab, setActiveTab] = useState<'create' | 'templates'>('create');
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="font-instrument text-3xl tracking-tight text-[#111111] mb-2">Post Internship</h1>
          <p className="text-[#666666] font-inter text-sm">Create a new opportunity for students.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E5E5E5] mb-8">
        <button 
          onClick={() => setActiveTab('create')}
          className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'create' ? 'border-[#111111] text-[#111111]' : 'border-transparent text-[#666666] hover:text-[#111111]'
          }`}
        >
          Create New
        </button>
        <button 
          onClick={() => setActiveTab('templates')}
          className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'templates' ? 'border-[#111111] text-[#111111]' : 'border-transparent text-[#666666] hover:text-[#111111]'
          }`}
        >
          Templates
        </button>
      </div>

      {activeTab === 'create' ? <CreateForm /> : <TemplatesList onSelectTemplate={() => setActiveTab('create')} />}
    </div>
  );
}

function CreateForm() {
  const router = useRouter();
  const { addOpening } = useIndustryStore();
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [description, setDescription] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  
  const handlePost = () => {
    toast.success("Internship posted successfully!");
    addOpening({
      id: `role-${Date.now()}`,
      title: title || 'New Internship',
      department,
      postedOn: new Date().toISOString(),
      applicationsCount: 0,
      filled: 0,
      totalPositions: 1,
      status: 'Active',
      views: 0
    });
    setTimeout(() => {
      router.push('/industry/openings');
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
      {/* Form Content */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Basic Information */}
        <section className="bg-white p-6 rounded-2xl border border-[#E5E5E5] space-y-6">
          <h2 className="font-instrument text-2xl tracking-tight">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#111111] mb-1">Job Title</label>
              <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g., Frontend Development Intern"
                className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#111111] font-inter text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#111111] mb-1">Department</label>
                <select 
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#111111] font-inter text-sm bg-white"
                >
                  {['Engineering', 'Marketing', 'Design', 'Product', 'Data', 'HR', 'Operations', 'Finance'].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111111] mb-1">Role Level</label>
                <select className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#111111] font-inter text-sm bg-white">
                  <option>Entry Level (1st/2nd year)</option>
                  <option>Intermediate (3rd year)</option>
                  <option>Advanced (Final year)</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Job Description */}
        <section className="bg-white p-6 rounded-2xl border border-[#E5E5E5] space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-instrument text-2xl tracking-tight">Job Description</h2>
            <button className="text-[13px] font-medium text-[#111111] border border-[#E5E5E5] rounded-md px-3 py-1.5 flex items-center hover:bg-[#F9FAFB]">
              <Sparkles size={14} className="mr-1.5 text-[#111111]" /> Generate with AI
            </button>
          </div>
          <div>
            <RichTextEditor value={description} onChange={setDescription} />
          </div>
        </section>

        {/* Responsibilities */}
        <section className="bg-white p-6 rounded-2xl border border-[#E5E5E5] space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-instrument text-2xl tracking-tight">Responsibilities</h2>
            <button className="text-[13px] font-medium text-[#111111] border border-[#E5E5E5] rounded-md px-3 py-1.5 flex items-center hover:bg-[#F9FAFB]">
              <Sparkles size={14} className="mr-1.5 text-[#111111]" /> Suggest
            </button>
          </div>
          <div>
            <RichTextEditor value={responsibilities} onChange={setResponsibilities} />
          </div>
        </section>

        {/* Requirements */}
        <section className="bg-white p-6 rounded-2xl border border-[#E5E5E5] space-y-6">
          <h2 className="font-instrument text-2xl tracking-tight">Requirements</h2>
          
          <div>
            <label className="block text-sm font-medium text-[#111111] mb-2">Skills Required</label>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 border border-[#E5E5E5] bg-[#F7F6F3] rounded-full text-sm font-medium flex items-center gap-1">
                React <button><X size={12}/></button>
              </span>
              <span className="px-3 py-1 border border-[#E5E5E5] bg-[#F7F6F3] rounded-full text-sm font-medium flex items-center gap-1">
                TypeScript <button><X size={12}/></button>
              </span>
            </div>
            <div className="relative">
              <input type="text" placeholder="Add a skill..." className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm focus:outline-none focus:border-[#111111]"/>
              <button className="absolute right-2 top-2 text-[#666666] hover:text-[#111111]"><Plus size={18}/></button>
            </div>
          </div>
        </section>

        {/* Logistics */}
        <section className="bg-white p-6 rounded-2xl border border-[#E5E5E5] space-y-6">
          <h2 className="font-instrument text-2xl tracking-tight">Logistics</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#111111] mb-1">Duration</label>
              <select className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm bg-white">
                <option>2-3 months</option>
                <option>3-6 months</option>
                <option>6+ months</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#111111] mb-1">Start Date</label>
              <select className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm bg-white">
                <option>Immediate</option>
                <option>Flexible</option>
                <option>Specific Date</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#111111] mb-1">Work Mode</label>
              <select className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm bg-white">
                <option>Remote</option>
                <option>On-site</option>
                <option>Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#111111] mb-1">Location</label>
              <select className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm bg-white">
                <option>Any Location</option>
                <option>Bangalore</option>
                <option>Mumbai</option>
              </select>
            </div>
          </div>
        </section>

      </div>

      {/* Right Sidebar - Preview & Actions */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-6">
          
          {/* Live Preview Card */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
            <div className="p-4 bg-[#F7F6F3] border-b border-[#E5E5E5]">
              <div className="text-xs font-medium text-[#666666] uppercase tracking-wider mb-1">Live Preview</div>
              <h3 className="font-instrument text-xl">{title || 'Role Title'}</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-[#F3F4F6] rounded-md font-mono text-[11px] text-[#374151]">{department}</span>
                <span className="px-2 py-1 bg-[#F3F4F6] rounded-md font-mono text-[11px] text-[#374151]">Remote</span>
              </div>
              <div className="space-y-2 font-inter text-sm text-[#666666]">
                <div className="flex items-center gap-2"><Building size={14}/> Tech Corp Inc.</div>
                <div className="flex items-center gap-2"><Clock size={14}/> 3-6 months</div>
                <div className="flex items-center gap-2"><MapPin size={14}/> Anywhere</div>
              </div>
              <button disabled className="w-full py-2 bg-[#E5E5E5] text-[#999999] rounded-lg font-medium text-sm mt-4">Apply Now</button>
            </div>
          </div>

          {/* Quality Check (Stub) */}
          <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
            <h3 className="font-instrument text-lg mb-3">Posting Quality Check</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#059669] shrink-0 mt-0.5"/>
                <span className="text-sm font-inter text-[#374151]">Clear job title</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-[#854D0E] shrink-0 mt-0.5"/>
                <span className="text-sm font-inter text-[#374151]">Description is very short. Longer descriptions get more applicants.</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] p-4 z-40 md:left-64 flex justify-between items-center px-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button className="px-4 py-2 text-sm font-medium text-[#666666] hover:text-[#111111]">Save as Draft</button>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-[#E5E5E5] rounded-lg text-sm font-medium hover:bg-[#F9FAFB]">Preview</button>
          <button onClick={handlePost} className="px-6 py-2 bg-[#111111] text-white rounded-lg text-sm font-medium hover:bg-black/90 transition-colors">
            Post Internship →
          </button>
        </div>
      </div>
    </div>
  );
}

function TemplatesList({ onSelectTemplate }: { onSelectTemplate: () => void }) {
  const templates = [
    { title: "Software Engineering Intern", department: "Engineering", uses: 12 },
    { title: "Marketing Intern", department: "Marketing", uses: 5 },
    { title: "Product Design Intern", department: "Design", uses: 8 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <button 
        onClick={onSelectTemplate}
        className="h-full min-h-[160px] border-2 border-dashed border-[#E5E5E5] rounded-2xl flex flex-col items-center justify-center text-[#666666] hover:border-[#111111] hover:text-[#111111] transition-colors bg-[#F9FAFB]"
      >
        <Plus size={32} className="mb-2" />
        <span className="font-medium">Create New Template</span>
      </button>

      {templates.map((t, i) => (
        <div key={i} className="bg-white p-5 rounded-2xl border border-[#E5E5E5] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-instrument text-xl">{t.title}</h3>
            </div>
            <span className="px-2 py-1 bg-[#F3F4F6] rounded-md font-mono text-[11px] text-[#374151]">
              {t.department}
            </span>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-xs text-[#999999] font-mono">Used {t.uses} times</span>
            <button onClick={onSelectTemplate} className="text-sm font-medium text-[#111111] hover:underline">
              Use Template
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
