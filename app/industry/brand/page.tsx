"use client";

import { useState } from "react";
import { RichTextEditor } from "@/components/RichTextEditor";
import { 
  Layout, Eye, Pencil, CheckCircle2, Upload, GripVertical, 
  Trash2, Plus, Globe, Building, Award, Check, Users
} from "lucide-react";
import { toast } from "sonner";

export default function BrandPage() {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col pb-12">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-instrument text-3xl tracking-tight text-[#111111] mb-2">Brand Page</h1>
          <p className="text-[#666666] font-inter text-sm">Design your public profile to attract top student talent.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex border border-[#E5E5E5] rounded-lg overflow-hidden bg-white">
            <button 
              onClick={() => setIsPreview(false)}
              className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${!isPreview ? 'bg-[#111111] text-white' : 'text-[#666666] hover:bg-[#F9FAFB]'}`}
            >
              <Pencil size={14} /> Edit Mode
            </button>
            <button 
              onClick={() => setIsPreview(true)}
              className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${isPreview ? 'bg-[#111111] text-white' : 'text-[#666666] hover:bg-[#F9FAFB]'}`}
            >
              <Eye size={14} /> Preview as Student
            </button>
          </div>
          <button 
            onClick={() => toast.success("Brand page published successfully!")}
            className="px-6 py-2 bg-[#111111] text-white rounded-lg text-sm font-medium hover:bg-black/90 transition-colors"
          >
            Publish Changes
          </button>
        </div>
      </div>

      {isPreview ? <PreviewMode /> : <EditMode />}
    </div>
  );
}

function EditMode() {
  const [about, setAbout] = useState("We are building the future of finance.");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        
        {/* Header Section */}
        <section className="bg-white p-6 rounded-2xl border border-[#E5E5E5] space-y-6">
          <h2 className="font-instrument text-2xl tracking-tight">Header Section</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#111111] mb-2">Company Logo</label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-[#E5E5E5] flex items-center justify-center bg-[#F9FAFB] cursor-pointer hover:border-[#111111] transition-colors">
                  <Upload size={24} className="text-[#999999]" />
                </div>
                <div className="text-sm text-[#666666]">
                  <p>Recommended size: 256x256px.</p>
                  <p>Format: JPG, PNG, or SVG.</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111111] mb-1">Company Tagline</label>
              <input 
                type="text" 
                defaultValue="Building the future of finance"
                className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm focus:outline-none focus:border-[#111111]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111111] mb-2">Header Banner Image</label>
              <div className="w-full h-32 rounded-xl border-2 border-dashed border-[#E5E5E5] flex flex-col items-center justify-center bg-[#F9FAFB] cursor-pointer hover:border-[#111111] transition-colors">
                <Upload size={24} className="text-[#999999] mb-2" />
                <span className="text-sm font-medium text-[#666666]">Upload Banner (1200x400px)</span>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-white p-6 rounded-2xl border border-[#E5E5E5] space-y-6">
          <h2 className="font-instrument text-2xl tracking-tight">About Us</h2>
          <RichTextEditor value={about} onChange={setAbout} />
        </section>

        {/* Perks Section */}
        <section className="bg-white p-6 rounded-2xl border border-[#E5E5E5] space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-instrument text-2xl tracking-tight">Why Join Us</h2>
            <button className="text-sm font-medium text-[#111111] flex items-center gap-1 hover:underline">
              <Plus size={16} /> Add Perk
            </button>
          </div>
          
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 border border-[#E5E5E5] rounded-xl bg-[#F9FAFB]">
                <GripVertical size={20} className="text-[#999999] cursor-grab" />
                <div className="w-10 h-10 bg-white border border-[#E5E5E5] rounded-lg flex items-center justify-center">
                  <Award size={18} className="text-[#111111]" />
                </div>
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <input type="text" defaultValue={i===1 ? "Fast-paced growth" : i===2 ? "Mentorship program" : "Flexible hours"} className="px-3 py-1.5 border border-[#E5E5E5] rounded-md text-sm focus:outline-none focus:border-[#111111] bg-white"/>
                  <input type="text" defaultValue="Description text here..." className="px-3 py-1.5 border border-[#E5E5E5] rounded-md text-sm focus:outline-none focus:border-[#111111] bg-white text-[#666666]"/>
                </div>
                <button className="p-2 text-[#999999] hover:text-[#DC2626] transition-colors"><Trash2 size={16}/></button>
              </div>
            ))}
          </div>
        </section>

        {/* Target Profiles Section */}
        <section className="bg-white p-6 rounded-2xl border border-[#E5E5E5] space-y-6">
          <h2 className="font-instrument text-2xl tracking-tight">What We&apos;re Looking For</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['Frontend Developers', 'Backend Developers', 'Full-stack Developers', 'Data Scientists', 'Designers', 'Product Managers'].map((role, i) => (
              <label key={role} className="flex items-center gap-2 text-sm text-[#111111] cursor-pointer p-2 border border-[#E5E5E5] rounded-lg hover:bg-[#F9FAFB]">
                <input type="checkbox" defaultChecked={i < 3} className="rounded border-[#E5E5E5] text-[#111111] focus:ring-[#111111]" />
                {role}
              </label>
            ))}
          </div>
        </section>

      </div>

      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5]">
          <h3 className="font-instrument text-xl mb-4 tracking-tight">Profile Completeness</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">80% Complete</span>
            <span className="text-sm font-mono text-[#666666]">4/5 steps</span>
          </div>
          <div className="w-full h-2 bg-[#F3F4F6] rounded-full overflow-hidden mb-6">
            <div className="h-full bg-[#111111]" style={{ width: '80%' }}></div>
          </div>
          
          <ul className="space-y-3 font-inter text-sm text-[#374151]">
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#059669]" /> Logo uploaded</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#059669]" /> About section filled</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#059669]" /> Perks added</li>
            <li className="flex items-center gap-2 text-[#999999]"><div className="w-4 h-4 border-2 border-[#E5E5E5] rounded-full" /> Culture photos uploaded</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#059669]" /> Testimonials added</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5] space-y-4">
          <h3 className="font-instrument text-xl tracking-tight">Statistics Display</h3>
          <div>
            <label className="block text-sm font-medium text-[#111111] mb-1">Founded</label>
            <input type="text" defaultValue="2014" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#111111] mb-1">Team Size</label>
            <select className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm bg-white">
              <option>50-200</option>
              <option>200-1000</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#111111] mb-1">Funding Stage</label>
            <select className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm bg-white">
              <option>Series B</option>
              <option>Series C</option>
              <option>Public</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
}

function PreviewMode() {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
      {/* Banner */}
      <div className="h-48 bg-[#111111] relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200&h=400')] bg-cover bg-center opacity-40"></div>
      </div>
      
      {/* Header Info */}
      <div className="px-8 pb-8 relative">
        <div className="flex items-end justify-between">
          <div className="flex gap-6 items-end -mt-12 relative z-10">
            <div className="w-24 h-24 bg-white rounded-2xl border-4 border-white shadow-sm flex items-center justify-center font-instrument text-3xl">
              TC
            </div>
            <div className="pb-2">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="font-instrument text-4xl text-[#111111]">Tech Corp Inc.</h1>
                <span className="px-2 py-0.5 bg-[#ECFDF5] text-[#059669] rounded-full font-mono text-[11px] border border-[#A7F3D0] flex items-center gap-1">
                  Verified Partner <Check size={10} />
                </span>
              </div>
              <p className="text-[#666666] font-inter">Building the future of finance.</p>
            </div>
          </div>
          <button className="px-6 py-2 bg-[#111111] text-white rounded-lg text-sm font-medium mb-2 hover:bg-black/90">
            View Openings
          </button>
        </div>

        {/* Stats Strip */}
        <div className="flex gap-8 mt-8 pb-8 border-b border-[#E5E5E5]">
          <div>
            <div className="text-xs text-[#666666] mb-1">Founded</div>
            <div className="font-mono text-lg text-[#111111]">2014</div>
          </div>
          <div>
            <div className="text-xs text-[#666666] mb-1">Team Size</div>
            <div className="font-mono text-lg text-[#111111]">200-1000</div>
          </div>
          <div>
            <div className="text-xs text-[#666666] mb-1">Funding</div>
            <div className="font-mono text-lg text-[#111111]">Series B</div>
          </div>
          <div>
            <div className="text-xs text-[#666666] mb-1">Location</div>
            <div className="font-mono text-lg text-[#111111]">Bangalore, India</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="font-instrument text-2xl tracking-tight mb-4">About Us</h2>
              <div className="prose prose-sm font-inter text-[#374151] max-w-none">
                <p>We are building the future of finance. Our mission is to democratize access to financial services globally. As an intern, you will work on real production systems that serve millions of users daily. We value curiosity, extreme ownership, and a bias for action.</p>
              </div>
            </section>

            <section>
              <h2 className="font-instrument text-2xl tracking-tight mb-4">Why Join Us</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex gap-3 p-4 bg-[#F7F6F3] rounded-xl border border-[#E5E5E5]">
                  <Award size={20} className="text-[#111111] shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm text-[#111111] mb-1">Fast-paced growth</h4>
                    <p className="text-xs text-[#666666]">Learn more in 3 months than you would in a year elsewhere.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 bg-[#F7F6F3] rounded-xl border border-[#E5E5E5]">
                  <Users size={20} className="text-[#111111] shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm text-[#111111] mb-1">Mentorship program</h4>
                    <p className="text-xs text-[#666666]">1:1 pairing with senior engineers and product leaders.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <div className="p-6 bg-[#F9FAFB] rounded-2xl border border-[#E5E5E5]">
              <h3 className="font-instrument text-xl tracking-tight mb-4">Looking For</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-white border border-[#E5E5E5] text-[#374151] rounded-md font-inter text-[12px]">Frontend Developers</span>
                <span className="px-2 py-1 bg-white border border-[#E5E5E5] text-[#374151] rounded-md font-inter text-[12px]">Backend Developers</span>
                <span className="px-2 py-1 bg-white border border-[#E5E5E5] text-[#374151] rounded-md font-inter text-[12px]">Product Managers</span>
              </div>
            </div>

            <div className="p-6 bg-[#F9FAFB] rounded-2xl border border-[#E5E5E5]">
              <h3 className="font-instrument text-xl tracking-tight mb-4">Links</h3>
              <div className="space-y-3 text-sm">
                <a href="#" className="flex items-center gap-2 text-[#666666] hover:text-[#111111]"><Globe size={16} /> techcorp.com</a>
                <a href="#" className="flex items-center gap-2 text-[#666666] hover:text-[#111111]">LinkedIn</a>
                <a href="#" className="flex items-center gap-2 text-[#666666] hover:text-[#111111]">Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
