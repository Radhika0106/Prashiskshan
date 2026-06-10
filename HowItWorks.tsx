import { FadeIn } from "./FadeIn";

const steps = [
  { id: 1, title: "Discover", desc: "Find verified AI-matched roles" },
  { id: 2, title: "Apply", desc: "One-click application with prep scores" },
  { id: 3, title: "Learn", desc: "Peer-to-peer pre-skilling" },
  { id: 4, title: "Intern", desc: "Structured logbook and mentorship" },
  { id: 5, title: "Evaluate", desc: "Objective industry feedback" },
  { id: 6, title: "Certify", desc: "NEP-integrated credit award" },
];

export function HowItWorks() {
  return (
    <section className="py-[96px] px-6 max-w-[1160px] mx-auto bg-page-bg">
      <FadeIn>
        <div className="font-mono text-[12px] text-[#999999] uppercase tracking-wide mb-4">
          The process
        </div>
        <h2 className="font-serif text-[36px] font-[400] text-text-primary mb-[64px]">
          Six steps, one platform.
        </h2>
      </FadeIn>

      <div className="relative">
        <div className="hidden md:block absolute top-[12px] left-0 w-full border-t-[1px] border-dashed border-border-main -z-10" />
        <div className="md:hidden absolute left-[15px] top-0 h-full border-l-[1px] border-dashed border-border-main -z-10" />
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-4 lg:gap-[32px] justify-between">
          {steps.map((step, idx) => (
            <FadeIn key={step.id} delay={0.05 * idx} className="flex gap-6 md:flex-col items-start relative bg-page-bg">
              <div className="relative flex-shrink-0 w-[24px] h-[24px] z-10 bg-page-bg">
                <span className="font-mono text-[12px] text-[#999999]">
                  {(step.id).toString().padStart(2, '0')}
                </span>
              </div>
              <div className="flex flex-col md:pt-4">
                <h3 className="font-sans text-[15px] font-[500] text-text-primary">
                  {step.title}
                </h3>
                <p className="font-sans text-[14px] font-[400] text-text-secondary mt-1">
                  {step.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
