"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Camera, Mic, Settings, CheckCircle2, ChevronLeft, Wifi, AlertCircle
} from "lucide-react";

function InterviewSetupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const interviewType = searchParams.get('type') || 'technical';

  // Step state (mocking the checks)
  const [micChecked, setMicChecked] = useState(false);
  const [camChecked, setCamChecked] = useState(false);
  
  // Environment checklist
  const [envChecks, setEnvChecks] = useState({
    quiet: false,
    lighting: false,
    notes: false,
    phone: false
  });

  // Settings
  const [language, setLanguage] = useState("English");
  const [pacing, setPacing] = useState("Medium");
  const [feedback, setFeedback] = useState("Real-time");
  const [difficulty, setDifficulty] = useState("Medium");
  const [recordEnabled, setRecordEnabled] = useState(true);

  // Simulate checking devices
  useEffect(() => {
    const timer = setTimeout(() => {
      setCamChecked(true);
      setMicChecked(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const allEnvChecked = Object.values(envChecks).every(Boolean);

  const handleStart = () => {
    router.push(`/student/interviews/live?type=${interviewType}&diff=${difficulty}&pace=${pacing}`);
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <Link href="/student/interviews" className="inline-flex items-center text-[#666] hover:text-[#111] mb-6 text-sm transition-colors">
        <ChevronLeft size={16} className="mr-1" />
        Back to Selection
      </Link>

      <div className="mb-8">
        <h1 className="font-instrument text-[32px] text-[#111111] leading-tight mb-2">
          Pre-Interview Checklist
        </h1>
        <p className="font-inter text-[16px] text-[#666666]">
          Ensure your setup is ready before starting the practice session.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Step 1: Device Check */}
        <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">
          <div className="bg-[#F7F6F3] px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between">
            <h2 className="font-medium text-[#111] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#111] text-white flex items-center justify-center text-xs font-mono">1</span>
              Webcam & Microphone
            </h2>
            {(camChecked && micChecked) && (
              <span className="text-[#059669] flex items-center gap-1 text-sm"><CheckCircle2 size={16} /> Ready</span>
            )}
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Video Check */}
            <div>
              <div className="aspect-video bg-[#111] rounded-lg mb-3 relative overflow-hidden flex items-center justify-center">
                {camChecked ? (
                  <div className="text-white/50 flex flex-col items-center">
                    <Camera size={32} className="mb-2" />
                    <span className="text-sm">Camera Active</span>
                  </div>
                ) : (
                  <div className="text-white/50 flex flex-col items-center">
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white/80 rounded-full animate-spin mb-2"></div>
                    <span className="text-sm">Accessing Camera...</span>
                  </div>
                )}
                {/* Mock user video placeholder could go here */}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#111] font-medium flex items-center gap-2"><Camera size={16} className="text-[#666]" /> FaceTime HD Camera</span>
              </div>
            </div>

            {/* Audio Check */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="h-12 bg-[#F3F4F6] rounded-lg mb-3 flex items-center px-4 overflow-hidden">
                  <Mic size={16} className="text-[#666] mr-3" />
                  <div className="flex-1 flex items-end gap-0.5 h-6">
                    {/* Simulated audio meter */}
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="w-full bg-[#111] rounded-t-sm transition-all duration-75"
                        style={{ height: micChecked ? `${Math.random() * 80 + 20}%` : '10%' }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#111] font-medium flex items-center gap-2"><Mic size={16} className="text-[#666]" /> Default Microphone</span>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#ECFDF5] text-[#059669] rounded-full font-mono text-[11px] border border-[#A7F3D0]">
                  <Wifi size={12} />
                  Excellent connection
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={recordEnabled} 
                    onChange={(e) => setRecordEnabled(e.target.checked)}
                    className="accent-[#111111]"
                  />
                  <span className="text-sm text-[#666]">Enable recording for post-interview review</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Environment */}
        <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">
          <div className="bg-[#F7F6F3] px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between">
            <h2 className="font-medium text-[#111] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#111] text-white flex items-center justify-center text-xs font-mono">2</span>
              Environment Setup
            </h2>
            {allEnvChecked && (
              <span className="text-[#059669] flex items-center gap-1 text-sm"><CheckCircle2 size={16} /> Ready</span>
            )}
          </div>
          
          <div className="p-6">
            <p className="text-sm text-[#666] mb-4">Find a quiet space. Sit upright. Have water nearby.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'quiet', label: 'Quiet environment' },
                { id: 'lighting', label: 'Good lighting' },
                { id: 'notes', label: 'Notebook & pen ready' },
                { id: 'phone', label: 'Phone on silent' },
              ].map((item) => (
                <label 
                  key={item.id} 
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${envChecks[item.id as keyof typeof envChecks] ? 'bg-[#F7F6F3] border-[#111]' : 'border-[#E5E5E5] hover:bg-[#F9FAFB]'}`}
                >
                  <input 
                    type="checkbox" 
                    checked={envChecks[item.id as keyof typeof envChecks]} 
                    onChange={(e) => setEnvChecks({...envChecks, [item.id]: e.target.checked})}
                    className="accent-[#111111] w-4 h-4"
                  />
                  <span className={`text-sm ${envChecks[item.id as keyof typeof envChecks] ? 'text-[#111] font-medium' : 'text-[#666]'}`}>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Step 3: Settings */}
        <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">
          <div className="bg-[#F7F6F3] px-6 py-4 border-b border-[#E5E5E5]">
            <h2 className="font-medium text-[#111] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#111] text-white flex items-center justify-center text-xs font-mono">3</span>
              Interview Settings
            </h2>
          </div>
          
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-[#666] mb-1.5">Interview Language</label>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-[#F7F6F3] border border-[#E5E5E5] rounded-lg px-3 py-2 text-sm text-[#111] outline-none focus:border-[#111] transition-colors appearance-none"
              >
                <option value="English">English</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#666] mb-1.5">Question Pacing</label>
              <div className="flex gap-4">
                {['Slow', 'Medium', 'Fast'].map(pace => (
                  <label key={pace} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="pacing" 
                      checked={pacing === pace} 
                      onChange={() => setPacing(pace)}
                      className="accent-[#111111]"
                    />
                    <span className="text-sm text-[#111]">{pace}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#666] mb-1.5">Difficulty</label>
              <div className="flex gap-4">
                {['Easy', 'Medium', 'Hard'].map(diff => (
                  <label key={diff} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="difficulty" 
                      checked={difficulty === diff} 
                      onChange={() => setDifficulty(diff)}
                      className="accent-[#111111]"
                    />
                    <span className="text-sm text-[#111]">{diff}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#666] mb-1.5">Feedback Style</label>
              <div className="flex gap-4">
                {['Real-time', 'End of interview'].map(style => (
                  <label key={style} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="feedback" 
                      checked={feedback === style} 
                      onChange={() => setFeedback(style)}
                      className="accent-[#111111]"
                    />
                    <span className="text-sm text-[#111]">{style}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between pt-4">
          <p className="text-xs text-[#999] flex items-center gap-1">
            <AlertCircle size={14} /> Close other applications to ensure smooth performance.
          </p>
          <button 
            onClick={handleStart}
            disabled={!camChecked || !micChecked}
            className="bg-[#111111] text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-[#333333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Start Interview <span>→</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default function InterviewSetupPage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto pb-12 pt-12 flex justify-center"><span className="text-sm text-[#666]">Loading setup...</span></div>}>
      <InterviewSetupContent />
    </Suspense>
  );
}
