"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Upload, X, Clock, Check } from "lucide-react";

/* ---------- OTP Input ---------- */
function OTPInput({ onComplete }: { onComplete: () => void }) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(t);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleChange = (i: number, val: string) => {
    const char = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = char;
    setDigits(next);
    if (char && i < 5) refs.current[i + 1]?.focus();
    if (next.every(d => d !== "") && next.join("").length === 6) {
      setTimeout(onComplete, 200);
    }
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const data = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = ["", "", "", "", "", ""];
    data.split("").forEach((c, i) => { next[i] = c; });
    setDigits(next);
    refs.current[Math.min(data.length, 5)]?.focus();
    if (data.length === 6) setTimeout(onComplete, 200);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 justify-center" onPaste={handlePaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={el => { refs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            className="w-[44px] h-[52px] text-center font-mono text-[20px] text-[#111111] border border-[#E5E5E5] rounded-[8px] outline-none focus:border-[#111111] transition-colors"
          />
        ))}
      </div>
      <div className="text-center">
        {canResend ? (
          <button type="button" onClick={() => { setCountdown(30); setCanResend(false); setDigits(["","","","","",""]); }}
            className="font-sans text-[13px] text-[#666666] hover:underline">
            Resend code
          </button>
        ) : (
          <span className="font-sans text-[13px] text-[#999999]">
            Resend in <span className="font-mono">{countdown}s</span>
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------- Upload Zone ---------- */
function UploadZone({ label, onFile }: { label: string; onFile: (f: File) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const accept = (f: File) => { setFile(f); onFile(f); };

  return (
    <div className="flex flex-col gap-2">
      <span className="font-sans text-[13px] font-[500] text-[#111111]">{label}</span>
      {!file ? (
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) accept(f); }}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-2 p-6 border border-dashed rounded-[12px] cursor-pointer transition-colors ${
            dragging ? "border-[#111111] bg-[#F7F6F3]" : "border-[#E5E5E5] hover:border-[#AAAAAA]"
          }`}
        >
          <Upload size={20} strokeWidth={1.5} className="text-[#999999]" />
          <span className="font-sans text-[14px] text-[#666666]">Drag your file here or browse</span>
          <span className="font-mono text-[12px] text-[#999999]">JPG · PNG · PDF</span>
          <input ref={inputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) accept(f); }} />
        </div>
      ) : (
        <div className="flex items-center justify-between px-3 py-2 border border-[#E5E5E5] rounded-[8px]">
          <div className="flex flex-col">
            <span className="font-sans text-[13px] text-[#111111]">{file.name}</span>
            <span className="font-mono text-[11px] text-[#999999]">{(file.size / 1024).toFixed(1)} KB</span>
          </div>
          <button type="button" onClick={() => setFile(null)} className="text-[#999999] hover:text-[#EF4444] transition-colors">
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- Stepper ---------- */
function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-7 h-7 flex items-center justify-center rounded-full border transition-colors ${
              i < current ? "bg-[#D1FAE5] border-[#D1FAE5]" : i === current ? "bg-[#111111] border-[#111111]" : "bg-white border-[#E5E5E5]"
            }`}>
              {i < current
                ? <Check size={12} strokeWidth={2} className="text-[#065F46]" />
                : <span className={`font-mono text-[11px] ${i === current ? "text-white" : "text-[#999999]"}`}>{i + 1}</span>
              }
            </div>
            <span className={`font-mono text-[10px] ${i === current ? "text-[#111111]" : i < current ? "text-[#065F46]" : "text-[#999999]"}`}>
              {s}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="flex-1 border-t border-dashed border-[#E5E5E5] mx-2 mb-5" />
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------- Page ---------- */
const roleSteps: Record<string, string[]> = {
  student: ["Email OTP", "Phone OTP", "ID Upload", "Review"],
  college: ["Email OTP", "Documents", "Review"],
  industry: ["Email OTP", "Documents", "Review"],
};

export default function VerifyPage() {
  const params = useParams();
  const router = useRouter();
  const role = (params?.role as string) ?? "student";
  const steps = roleSteps[role] ?? roleSteps.student;
  const [step, setStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, boolean>>({});

  const advance = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const isLast = step === steps.length - 1;

  /* --- Shared OTP step --- */
  const emailOTPStep = (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-serif text-[24px] text-[#111111] mb-2">Verify your email address</h2>
        <p className="font-sans text-[15px] text-[#666666]">We've sent a 6-digit code to your email. Enter it below.</p>
        {role === "college" && (
          <p className="font-sans text-[13px] text-[#666666] mt-2 p-3 bg-[#DBEAFE] rounded-[6px] text-[#1E3A8A]">
            Only .edu and .ac.in email addresses are accepted.
          </p>
        )}
      </div>
      <OTPInput onComplete={advance} />
    </div>
  );

  const phoneOTPStep = (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-serif text-[24px] text-[#111111] mb-2">Verify your phone number</h2>
        <p className="font-sans text-[15px] text-[#666666]">We've sent a 6-digit code to your mobile number.</p>
      </div>
      <OTPInput onComplete={advance} />
    </div>
  );

  /* --- Student ID upload --- */
  const studentUploadStep = (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-serif text-[24px] text-[#111111] mb-2">Upload your college ID</h2>
        <p className="font-sans text-[14px] text-[#666666]">We verify your enrollment before activating your account.</p>
      </div>
      <UploadZone label="College identity card" onFile={() => setUploadedFiles(p => ({ ...p, id: true }))} />
      <button onClick={() => uploadedFiles.id && advance()}
        disabled={!uploadedFiles.id}
        className="h-[44px] w-full bg-[#111111] text-white font-sans text-[14px] font-[500] rounded-[8px] hover:bg-[#333333] transition-colors disabled:opacity-40">
        Submit for Verification →
      </button>
    </div>
  );

  /* --- College/Industry doc upload --- */
  const collegeDocsStep = (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-serif text-[24px] text-[#111111] mb-2">Upload institution documents</h2>
        <p className="font-sans text-[14px] text-[#666666]">All documents should be official and legible.</p>
      </div>
      <UploadZone label="AISHE Registration Certificate" onFile={() => setUploadedFiles(p => ({ ...p, aishe: true }))} />
      <UploadZone label="Authorised Signatory Letter (on letterhead)" onFile={() => setUploadedFiles(p => ({ ...p, letter: true }))} />
      <UploadZone label="Government-issued Institution ID (optional)" onFile={() => setUploadedFiles(p => ({ ...p, govId: true }))} />
      <button onClick={() => uploadedFiles.aishe && uploadedFiles.letter && advance()}
        disabled={!uploadedFiles.aishe || !uploadedFiles.letter}
        className="h-[44px] w-full bg-[#111111] text-white font-sans text-[14px] font-[500] rounded-[8px] hover:bg-[#333333] transition-colors disabled:opacity-40">
        Submit for Review →
      </button>
    </div>
  );

  const industryDocsStep = (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-serif text-[24px] text-[#111111] mb-2">Upload company documents</h2>
        <p className="font-sans text-[14px] text-[#666666]">Documents should be official and clearly readable.</p>
      </div>
      <UploadZone label="Company Registration Certificate / CIN Document" onFile={() => setUploadedFiles(p => ({ ...p, cin: true }))} />
      <UploadZone label="GST Certificate (if provided during signup)" onFile={() => setUploadedFiles(p => ({ ...p, gst: true }))} />
      <div className="flex flex-col gap-1.5">
        <label className="font-sans text-[13px] font-[500] text-[#111111]">LinkedIn Company Page URL</label>
        <input type="url" placeholder="https://linkedin.com/company/acme"
          className="h-[44px] w-full px-3 font-sans text-[14px] text-[#111111] bg-white border border-[#E5E5E5] rounded-[8px] outline-none focus:border-[#111111] transition-colors placeholder:text-[#BBBBBB]" />
        <span className="font-sans text-[13px] text-[#999999]">Speeds up verification significantly.</span>
      </div>
      <button onClick={() => uploadedFiles.cin && advance()}
        disabled={!uploadedFiles.cin}
        className="h-[44px] w-full bg-[#111111] text-white font-sans text-[14px] font-[500] rounded-[8px] hover:bg-[#333333] transition-colors disabled:opacity-40">
        Submit for Review →
      </button>
    </div>
  );

  /* --- Pending Review screen --- */
  const pendingBody: Record<string, { title: string; body: string; badge: string; badgeStyle: string }> = {
    student: {
      title: "You're in the queue.",
      body: "Our team verifies student IDs within 24 hours. You'll receive an email once your account is active.",
      badge: "Verification Pending",
      badgeStyle: "bg-[#FEF9C3] text-[#854D0E]",
    },
    college: {
      title: "Under review.",
      body: "Institution accounts are verified within 48 hours by our partnerships team. We may contact you for additional documents.",
      badge: "Pending Admin Approval",
      badgeStyle: "bg-[#DBEAFE] text-[#1E3A8A]",
    },
    industry: {
      title: "Verification in progress.",
      body: "Industry accounts are reviewed within 48 hours. Verified partners receive a badge visible to all students and institutions.",
      badge: "Pending Admin Approval",
      badgeStyle: "bg-[#DBEAFE] text-[#1E3A8A]",
    },
  };
  const pInfo = pendingBody[role] ?? pendingBody.student;

  const pendingStep = (
    <div className="flex flex-col items-center gap-6 text-center">
      <Clock size={48} strokeWidth={1.5} className="text-[#999999]" />
      <div>
        <h2 className="font-serif text-[28px] text-[#111111] mb-3">{pInfo.title}</h2>
        <p className="font-sans text-[15px] text-[#666666] leading-[1.75] max-w-[360px]">{pInfo.body}</p>
      </div>
      <span className={`font-mono text-[12px] px-3 py-1.5 rounded-[4px] ${pInfo.badgeStyle}`}>{pInfo.badge}</span>
      {role === "industry" && (
        <div className="w-full max-w-[320px] border border-[#E5E5E5] rounded-[12px] p-4 text-left">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[14px] font-[500] text-[#111111]">Your Company</span>
            <span className="bg-[#D1FAE5] text-[#065F46] font-mono text-[12px] px-2 py-1 rounded-[4px]">Verified Industry Partner ✓</span>
          </div>
          <p className="font-sans text-[12px] text-[#999999] mt-1">This badge will appear on your profile after verification.</p>
        </div>
      )}
      <Link href="/" className="font-sans text-[13px] text-[#666666] hover:text-[#111111] hover:underline transition-colors">
        Return to homepage
      </Link>
    </div>
  );

  /* --- Step content resolver --- */
  const getStepContent = () => {
    if (role === "student") {
      return [emailOTPStep, phoneOTPStep, studentUploadStep, pendingStep][step];
    }
    if (role === "college") {
      return [emailOTPStep, collegeDocsStep, pendingStep][step];
    }
    if (role === "industry") {
      return [emailOTPStep, industryDocsStep, pendingStep][step];
    }
    return emailOTPStep;
  };

  return (
    <div className="min-h-screen bg-[#F7F6F3] flex flex-col">
      <header className="bg-white border-b border-[#E5E5E5] h-16 flex items-center px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.jpeg" alt="Prashikshan" width={36} height={36} className="object-contain" />
          <span className="font-serif text-[18px] text-[#111111]">Prashikshan</span>
        </Link>
      </header>

      <main className="flex flex-1 items-start justify-center px-4 py-12">
        <div className="w-full max-w-[520px] bg-white border border-[#E5E5E5] rounded-[12px] p-8">
          <Stepper steps={steps} current={step} />
          {getStepContent()}
        </div>
      </main>
    </div>
  );
}
