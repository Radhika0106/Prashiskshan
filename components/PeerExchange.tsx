import { FadeIn } from "./FadeIn";
import { ArrowRight } from "lucide-react";

export function PeerExchange() {
  return (
    <section className="bg-page-alt py-[96px] hairline-t hairline-b content-center flex flex-col items-center">
      <div className="max-w-[1160px] w-full px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[32px] items-center">
          
          <FadeIn className="flex flex-col gap-6">
            <div>
              <span className="font-mono text-[12px] text-[#999999] uppercase tracking-wide">
                Innovation layer
              </span>
            </div>
            <h2 className="font-serif text-[36px] font-[400] text-text-primary leading-[1.2]">
              A learning network inside the platform.
            </h2>
            <p className="font-sans text-[16px] font-[400] leading-[1.75] text-text-secondary">
              Students list what they can teach and what they want to learn. The AI matches them for structured peer sessions. Every exchange is tracked and contributes to their Career Readiness Score.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <span className="bg-status-success-bg text-status-success-text font-mono text-[12px] px-3 py-1.5 rounded-[4px]">
                12,000+ peer sessions
              </span>
              <span className="bg-status-info-bg text-status-info-text font-mono text-[12px] px-3 py-1.5 rounded-[4px]">
                avg. 3 matches per student
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="relative">
            <div className="bg-[#FFFFFF] border border-border-main rounded-card p-6 shadow-sm relative z-10 w-full max-w-[480px] hover:border-border-hover transition-colors duration-150">
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-[32px] h-[32px] rounded-full bg-status-neutral-bg flex items-center justify-center font-sans text-[13px] font-[500] text-status-neutral-text border border-border-main">
                  RS
                </div>
                <div>
                  <h3 className="font-sans text-[14px] font-[500] text-text-primary">Rahul Sharma</h3>
                  <p className="font-sans text-[13px] text-text-secondary">Career Readiness Score</p>
                </div>
              </div>

              <div className="space-y-6">
                
                <div>
                  <div className="font-mono text-[28px] text-text-primary mb-3">74 / 100</div>
                  <div className="h-[3px] w-full bg-border-main rounded-full overflow-hidden">
                    <div className="h-full bg-text-primary" style={{ width: '74%' }} />
                  </div>
                </div>

                <div>
                  <h4 className="font-sans text-[13px] text-[#666666] mb-3">Skills I offer</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-status-success-bg text-status-success-text font-mono text-[13px] rounded-[4px]">Python</span>
                    <span className="px-3 py-1 bg-status-success-bg text-status-success-text font-mono text-[13px] rounded-[4px]">Data Analysis</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-sans text-[13px] text-[#666666] mb-3">Skills I want</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-status-info-bg text-status-info-text font-mono text-[13px] rounded-[4px]">UI/UX</span>
                    <span className="px-3 py-1 bg-status-info-bg text-status-info-text font-mono text-[13px] rounded-[4px]">Public Speaking</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-border-main flex items-center gap-1 group cursor-pointer text-[#666666] hover:text-text-primary transition-colors">
                  <span className="font-sans text-[13px]">Matched with 3 peers this week</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
