import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-page-bg py-[96px] text-center flex justify-center px-6">
      <div className="max-w-[1160px] flex flex-col items-center">
        
        {/* Top Label */}
        <div className="font-mono text-[12px] text-text-secondary tracking-[0.05em] mb-6">
          NEP 2020 · Internship Infrastructure
        </div>

        {/* Headline */}
        <h1 className="font-serif text-[36px] md:text-[56px] font-[400] text-text-primary leading-[1.15] tracking-[-0.5px] max-w-[600px] mb-6">
          Internships that actually<br />prepare you.
        </h1>
        
        {/* Subheadline */}
        <p className="font-sans text-[16px] md:text-[18px] leading-[1.75] font-[400] text-text-secondary max-w-[520px] mb-10">
          A structured platform connecting students, colleges, and industry — from first application to verified certification.
        </p>

        {/* CTA Row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
          <button className="flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-white font-sans text-[14px] font-[500] rounded-ui hover:bg-[#333333] transition-colors duration-150">
            Explore Internships <ArrowRight size={16} strokeWidth={1.5} />
          </button>
          <button className="px-8 py-3.5 bg-transparent text-text-primary border border-border-main font-sans text-[14px] font-[500] rounded-ui hover:border-[#AAAAAA] transition-colors duration-150">
            For Institutions
          </button>
        </div>

        {/* Trust Strip */}
        <div className="font-mono text-[12px] font-[400] text-[#999999]">
          2,400+ verified internships · 180 partner colleges · NEP compliant
        </div>

      </div>
    </section>
  );
}
