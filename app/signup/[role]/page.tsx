"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Eye, EyeOff, Info } from "lucide-react";

/* ---------- shared helpers ---------- */

function InputField({
  label, id, type = "text", placeholder, value, onChange, onBlur, error, success, hint, children,
}: {
  label: string; id: string; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void; onBlur?: () => void;
  error?: string; success?: boolean; hint?: string; children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-sans text-[13px] font-[500] text-[#111111]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`h-[44px] w-full px-3 font-sans text-[14px] text-[#111111] bg-white border rounded-[8px] outline-none transition-colors placeholder:text-[#BBBBBB] ${
            error ? "border-[#EF4444]" : success ? "border-[#10B981]" : "border-[#E5E5E5] focus:border-[#111111]"
          }`}
        />
        {children}
      </div>
      {error && <span className="font-sans text-[13px] text-[#EF4444]">{error}</span>}
      {hint && !error && <span className="font-sans text-[13px] text-[#999999]">{hint}</span>}
    </div>
  );
}

function SelectField({
  label, id, value, onChange, options, error,
}: {
  label: string; id: string; value: string;
  onChange: (v: string) => void; options: string[]; error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-sans text-[13px] font-[500] text-[#111111]">{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-[44px] w-full px-3 font-sans text-[14px] text-[#111111] bg-white border rounded-[8px] outline-none transition-colors appearance-none ${
          error ? "border-[#EF4444]" : "border-[#E5E5E5] focus:border-[#111111]"
        }`}
      >
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <span className="font-sans text-[13px] text-[#EF4444]">{error}</span>}
    </div>
  );
}

function PasswordField({
  label, id, value, onChange, onBlur, error,
}: {
  label: string; id: string; value: string;
  onChange: (v: string) => void; onBlur?: () => void; error?: string;
}) {
  const [show, setShow] = useState(false);
  const checks = [
    { label: "At least 8 characters", ok: value.length >= 8 },
    { label: "Contains a number", ok: /\d/.test(value) },
    { label: "Contains a special character", ok: /[^A-Za-z0-9]/.test(value) },
  ];
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-sans text-[13px] font-[500] text-[#111111]">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          placeholder="••••••••"
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`h-[44px] w-full px-3 pr-10 font-sans text-[14px] text-[#111111] bg-white border rounded-[8px] outline-none transition-colors placeholder:text-[#BBBBBB] ${
            error ? "border-[#EF4444]" : "border-[#E5E5E5] focus:border-[#111111]"
          }`}
        />
        <button type="button" onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#111111]">
          {show ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
        </button>
      </div>
      {value.length > 0 && (
        <ul className="flex flex-col gap-1 mt-1">
          {checks.map((c) => (
            <li key={c.label} className={`font-mono text-[12px] flex items-center gap-1.5 ${c.ok ? "text-[#065F46]" : "text-[#999999]"}`}>
              <span>{c.ok ? "✓" : "○"}</span> {c.label}
            </li>
          ))}
        </ul>
      )}
      {error && <span className="font-sans text-[13px] text-[#EF4444]">{error}</span>}
    </div>
  );
}

/* ---------- Student Form ---------- */
function StudentForm({ onSubmit }: { onSubmit: () => void }) {
  const [f, setF] = useState({ name: "", email: "", phone: "", college: "", course: "", year: "", password: "", confirm: "", agree: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!f.name.trim()) e.name = "Full name is required.";
    if (!f.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Enter a valid email.";
    if (!f.phone || !/^[6-9]\d{9}$/.test(f.phone.replace(/\s/g, ""))) e.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!f.college.trim()) e.college = "College name is required.";
    if (!f.course.trim()) e.course = "Course is required.";
    if (!f.year) e.year = "Year is required.";
    if (f.password.length < 8 || !/\d/.test(f.password) || !/[^A-Za-z0-9]/.test(f.password)) e.password = "Password doesn't meet the requirements.";
    if (f.confirm !== f.password) e.confirm = "Passwords do not match.";
    if (!f.agree) e.agree = "You must agree to the terms.";
    return e;
  };

  const set = (key: string) => (val: string | boolean) => setF((p) => ({ ...p, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setLoading(true);
      setTimeout(() => { setLoading(false); onSubmit(); }, 1500);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <InputField label="Full name" id="name" placeholder="Priya Sharma" value={f.name} onChange={set("name")} onBlur={() => setErrors(p => ({ ...p, name: !f.name.trim() ? "Full name is required." : "" }))} error={errors.name} />
      <InputField label="Email address" id="email" type="email" placeholder="priya@college.ac.in" value={f.email} onChange={set("email")} error={errors.email} />
      <InputField label="Phone number" id="phone" placeholder="98765 43210" value={f.phone} onChange={(v) => set("phone")(v.replace(/[^\d\s]/g, ""))} error={errors.phone} hint="10-digit Indian mobile number" />
      <InputField label="College name" id="college" placeholder="IIT Delhi" value={f.college} onChange={set("college")} error={errors.college} />
      <div className="grid grid-cols-2 gap-4">
        <InputField label="Course" id="course" placeholder="B.Tech CSE" value={f.course} onChange={set("course")} error={errors.course} />
        <SelectField label="Year" id="year" value={f.year} onChange={set("year")} options={["1st Year", "2nd Year", "3rd Year", "4th Year"]} error={errors.year} />
      </div>
      <PasswordField label="Password" id="password" value={f.password} onChange={set("password")} error={errors.password} />
      <InputField label="Confirm password" id="confirm" type="password" placeholder="••••••••" value={f.confirm} onChange={set("confirm")} error={errors.confirm} />
      <div className="flex items-start gap-2">
        <input id="agree" type="checkbox" checked={f.agree} onChange={(e) => set("agree")(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-[#111111] cursor-pointer" />
        <label htmlFor="agree" className="font-sans text-[13px] text-[#666666] cursor-pointer">
          I agree to the <span className="text-[#111111] underline">Terms of Use</span> and <span className="text-[#111111] underline">Privacy Policy</span>
        </label>
      </div>
      {errors.agree && <span className="font-sans text-[13px] text-[#EF4444]">{errors.agree}</span>}
      <SubmitButton label="Create Student Account" loading={loading} />
    </form>
  );
}

/* ---------- College Form ---------- */
function CollegeForm({ onSubmit }: { onSubmit: () => void }) {
  const [f, setF] = useState({ instName: "", website: "", repName: "", designation: "", email: "", phone: "", aishe: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showTooltip, setShowTooltip] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!f.instName.trim()) e.instName = "Institution name is required.";
    if (!f.website.trim()) e.website = "Website is required.";
    if (!f.repName.trim()) e.repName = "Representative name is required.";
    if (!f.designation.trim()) e.designation = "Designation is required.";
    if (!f.email) e.email = "Email is required.";
    else if (!f.email.endsWith(".edu") && !f.email.endsWith(".ac.in")) e.email = "Only .edu or .ac.in email addresses are accepted.";
    if (!f.phone || !/^[6-9]\d{9}$/.test(f.phone.replace(/\s/g, ""))) e.phone = "Enter a valid 10-digit number.";
    if (!f.aishe || !/^[A-Z0-9]{7}$/.test(f.aishe)) e.aishe = "AISHE code must be 7 alphanumeric characters.";
    if (f.password.length < 8 || !/\d/.test(f.password) || !/[^A-Za-z0-9]/.test(f.password)) e.password = "Password doesn't meet requirements.";
    if (f.confirm !== f.password) e.confirm = "Passwords do not match.";
    return e;
  };

  const set = (key: string) => (val: string) => setF((p) => ({ ...p, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setLoading(true);
      setTimeout(() => { setLoading(false); onSubmit(); }, 1500);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <InputField label="Institution name" id="instName" placeholder="Delhi University" value={f.instName} onChange={set("instName")} error={errors.instName} />
      <InputField label="Official website URL" id="website" placeholder="https://du.ac.in" value={f.website} onChange={set("website")} error={errors.website} />
      <InputField label="Authorised representative name" id="repName" placeholder="Dr. Anita Mehta" value={f.repName} onChange={set("repName")} error={errors.repName} />
      <InputField label="Designation" id="designation" placeholder="Dean – Industry Relations" value={f.designation} onChange={set("designation")} error={errors.designation} />
      <InputField label="Official email address" id="email" type="email" placeholder="dean@college.ac.in" value={f.email} onChange={set("email")} error={errors.email} hint="Must end in .edu or .ac.in" />
      <InputField label="Phone number" id="phone" placeholder="98765 43210" value={f.phone} onChange={(v) => set("phone")(v.replace(/[^\d\s]/g, ""))} error={errors.phone} />
      
      {/* AISHE with tooltip */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5">
          <label htmlFor="aishe" className="font-sans text-[13px] font-[500] text-[#111111]">AISHE Code</label>
          <button type="button" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} className="text-[#999999] hover:text-[#111111] relative">
            <Info size={14} strokeWidth={1.5} />
            {showTooltip && (
              <div className="absolute left-5 -top-1 z-20 w-64 bg-white border border-[#E5E5E5] rounded-[8px] p-3 shadow-none">
                <p className="font-mono text-[11px] text-[#666666] leading-relaxed">
                  All India Survey on Higher Education code issued by the Ministry of Education
                </p>
              </div>
            )}
          </button>
        </div>
        <input id="aishe" placeholder="C-12345" value={f.aishe} onChange={(e) => set("aishe")(e.target.value.toUpperCase())} maxLength={7}
          className={`h-[44px] w-full px-3 font-mono text-[14px] text-[#111111] bg-white border rounded-[8px] outline-none transition-colors placeholder:text-[#BBBBBB] ${errors.aishe ? "border-[#EF4444]" : "border-[#E5E5E5] focus:border-[#111111]"}`} />
        {errors.aishe && <span className="font-sans text-[13px] text-[#EF4444]">{errors.aishe}</span>}
      </div>

      <PasswordField label="Password" id="password" value={f.password} onChange={set("password")} error={errors.password} />
      <InputField label="Confirm password" id="confirm" type="password" placeholder="••••••••" value={f.confirm} onChange={set("confirm")} error={errors.confirm} />
      <SubmitButton label="Register Institution" loading={loading} />
    </form>
  );
}

/* ---------- Industry Form ---------- */
function IndustryForm({ onSubmit }: { onSubmit: () => void }) {
  const [f, setF] = useState({ company: "", sector: "", website: "", hrName: "", designation: "", email: "", phone: "", size: "", gst: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!f.company.trim()) e.company = "Company name is required.";
    if (!f.sector) e.sector = "Please select a sector.";
    if (!f.website.trim()) e.website = "Website is required.";
    if (!f.hrName.trim()) e.hrName = "Name is required.";
    if (!f.designation.trim()) e.designation = "Designation is required.";
    if (!f.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Enter a valid email.";
    if (!f.phone || !/^[6-9]\d{9}$/.test(f.phone.replace(/\s/g, ""))) e.phone = "Enter a valid 10-digit number.";
    if (!f.size) e.size = "Please select company size.";
    if (f.gst && !/^[A-Z0-9]{15}$/.test(f.gst)) e.gst = "GST number must be 15 alphanumeric characters.";
    if (f.password.length < 8 || !/\d/.test(f.password) || !/[^A-Za-z0-9]/.test(f.password)) e.password = "Password doesn't meet requirements.";
    if (f.confirm !== f.password) e.confirm = "Passwords do not match.";
    return e;
  };

  const set = (key: string) => (val: string) => setF((p) => ({ ...p, [key]: val }));

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setLoading(true);
      setTimeout(() => { setLoading(false); onSubmit(); }, 1500);
    }
  };

  const sectors = ["Technology", "Finance & Banking", "Healthcare", "Manufacturing", "Retail & E-commerce", "Education", "Media & Entertainment", "Agriculture", "Infrastructure", "Other"];
  const sizes = ["< 50", "50 – 200", "200 – 1,000", "1,000+"];

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <InputField label="Company name" id="company" placeholder="Acme Technologies Pvt. Ltd." value={f.company} onChange={set("company")} error={errors.company} />
      <SelectField label="Industry sector" id="sector" value={f.sector} onChange={set("sector")} options={sectors} error={errors.sector} />
      <InputField label="Official website" id="website" placeholder="https://acme.com" value={f.website} onChange={set("website")} error={errors.website} />
      <InputField label="HR / POC name" id="hrName" placeholder="Rohan Verma" value={f.hrName} onChange={set("hrName")} error={errors.hrName} />
      <InputField label="Designation" id="designation" placeholder="HR Manager" value={f.designation} onChange={set("designation")} error={errors.designation} />
      <InputField label="Official email address" id="email" type="email" placeholder="hr@acme.com" value={f.email} onChange={set("email")} error={errors.email} />
      <InputField label="Phone number" id="phone" placeholder="98765 43210" value={f.phone} onChange={(v) => set("phone")(v.replace(/[^\d\s]/g, ""))} error={errors.phone} />
      <SelectField label="Company size" id="size" value={f.size} onChange={set("size")} options={sizes} error={errors.size} />
      <InputField label="GST number (optional)" id="gst" placeholder="22AAAAA0000A1Z5" value={f.gst} onChange={(v) => set("gst")(v.toUpperCase())} error={errors.gst} hint="15-character alphanumeric — optional" />
      <PasswordField label="Password" id="password" value={f.password} onChange={set("password")} error={errors.password} />
      <InputField label="Confirm password" id="confirm" type="password" placeholder="••••••••" value={f.confirm} onChange={set("confirm")} error={errors.confirm} />
      <SubmitButton label="Register as Industry Partner" loading={loading} />
    </form>
  );
}

/* ---------- Shared submit button ---------- */
function SubmitButton({ label, loading }: { label: string; loading: boolean }) {
  return (
    <button type="submit" disabled={loading}
      className="flex items-center justify-center gap-2 h-[44px] w-full bg-[#111111] text-white font-sans text-[14px] font-[500] rounded-[8px] hover:bg-[#333333] transition-colors disabled:opacity-60">
      {loading
        ? <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.5" strokeDasharray="28" strokeDashoffset="10" /></svg>
        : <>{label} <ArrowRight size={16} strokeWidth={1.5} /></>}
    </button>
  );
}

/* ---------- Page ---------- */
const roleMeta: Record<string, { title: string; subtitle: string }> = {
  student: { title: "Create your student account", subtitle: "Enter your details to find verified internships." },
  college: { title: "Register your institution", subtitle: "Set up your institution to manage student internships." },
  industry: { title: "Register as Industry Partner", subtitle: "Post roles, evaluate candidates, build your pipeline." },
};

const successMessages: Record<string, string> = {
  student: "Student account created successfully!",
  college: "Institution registered successfully!",
  industry: "Industry Partner account created successfully!",
};

export default function SignupPage() {
  const params = useParams();
  const router = useRouter();
  const role = (params?.role as string) ?? "student";
  const meta = roleMeta[role] ?? roleMeta.student;
  const [succeeded, setSucceeded] = useState(false);

  const handleSuccess = () => {
    setSucceeded(true);
    setTimeout(() => router.push(`/${role}/dashboard`), 2000);
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

          {/* ✅ Success banner — slides down when form is submitted */}
          {succeeded && (
            <div className="flex items-center gap-3 mb-6 px-4 py-3 bg-[#D1FAE5] border border-[#6EE7B7] rounded-[8px] animate-[slideDown_0.2s_ease_forwards]">
              <div className="flex-shrink-0 w-6 h-6 bg-[#065F46] rounded-full flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-sans text-[14px] text-[#065F46] font-[500]">
                {successMessages[role] ?? "Account created successfully!"}
              </span>
            </div>
          )}

          {!succeeded && (
            <Link href="/get-started" className="font-sans text-[13px] text-[#666666] hover:underline">
              ← Change role
            </Link>
          )}
          <h1 className="font-serif text-[32px] font-[400] text-[#111111] mt-4 mb-1">{meta.title}</h1>
          <p className="font-sans text-[14px] text-[#666666] mb-8">{meta.subtitle}</p>

          {!succeeded && role === "student" && <StudentForm onSubmit={handleSuccess} />}
          {!succeeded && role === "college" && <CollegeForm onSubmit={handleSuccess} />}
          {!succeeded && role === "industry" && <IndustryForm onSubmit={handleSuccess} />}

          {!succeeded && (
            <p className="mt-6 font-sans text-[13px] text-[#666666] text-center">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-[#111111] font-[500] hover:underline">Sign In</Link>
            </p>
          )}

          {succeeded && (
            <p className="font-sans text-[13px] text-[#999999] text-center mt-4">
              Redirecting to dashboard…
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
