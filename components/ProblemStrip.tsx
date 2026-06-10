import { FadeIn } from "./FadeIn";

export function ProblemStrip() {
  return (
    <section className="bg-page-alt py-[96px] hairline-t hairline-b">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          
          {/* Col 1 */}
          <FadeIn className="flex flex-col gap-4 md:pr-8 md:hairline-r pb-8 md:pb-0 hairline-b md:border-b-0 border-border-main">
            <div>
              <span className="inline-block bg-status-info-bg text-status-info-text font-mono text-[11px] px-2 py-1 rounded-[4px] uppercase tracking-wide">
                For Students
              </span>
            </div>
            <h3 className="font-serif text-[20px] font-[400] text-text-primary">
              No real internships, no real skills
            </h3>
            <p className="font-sans text-[15px] font-[400] text-text-secondary leading-[1.6]">
              Students land fake internships with zero skill preparation.
            </p>
          </FadeIn>

          {/* Col 2 */}
          <FadeIn delay={0.1} className="flex flex-col gap-4 md:px-8 md:hairline-r pb-8 md:pb-0 hairline-b md:border-b-0 border-border-main">
            <div>
              <span className="inline-block bg-status-info-bg text-status-info-text font-mono text-[11px] px-2 py-1 rounded-[4px] uppercase tracking-wide">
                For Colleges
              </span>
            </div>
            <h3 className="font-serif text-[20px] font-[400] text-text-primary">
              Compliance without infrastructure
            </h3>
            <p className="font-sans text-[15px] font-[400] text-text-secondary leading-[1.6]">
              Colleges have no structured internship systems to manage or track off-campus outcomes.
            </p>
          </FadeIn>

          {/* Col 3 */}
          <FadeIn delay={0.2} className="flex flex-col gap-4 md:pl-8">
            <div>
              <span className="inline-block bg-status-info-bg text-status-info-text font-mono text-[11px] px-2 py-1 rounded-[4px] uppercase tracking-wide">
                For Industry
              </span>
            </div>
            <h3 className="font-serif text-[20px] font-[400] text-text-primary">
              Candidates who aren't ready
            </h3>
            <p className="font-sans text-[15px] font-[400] text-text-secondary leading-[1.6]">
              Industry receives candidates completely unprepared for their stack and culture.
            </p>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
