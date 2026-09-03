import { processSteps } from "@/data/site";

export function ProcessSection() {
  return (
    <section
      id="process"
      className="scroll-mt-24 px-4 py-20 sm:px-6 md:py-28"
    >
      <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[2rem] bg-[#f1ede5] px-5 py-8 text-[#171513] shadow-[0_30px_120px_rgba(0,0,0,0.28)] sm:px-9 sm:py-11 md:px-12 md:py-14">
        <div className="pointer-events-none absolute right-[-4.5rem] top-[-5rem] h-52 w-52 rounded-full border-[42px] border-[#f06a4f]/10" aria-hidden="true" />

        <div className="relative grid gap-8 border-b border-black/15 pb-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c84f39]">
              The process / Four clear steps
            </p>
            <h2 className="mt-4 max-w-3xl text-[clamp(2.8rem,6.2vw,5.8rem)] font-[650] leading-[0.94] tracking-[-0.035em]">
              A clean path to
              <span className="block text-black/38">the final cut.</span>
            </h2>
          </div>
          <div className="max-w-lg lg:justify-self-end">
            <p className="text-sm leading-6 text-black/55 sm:text-base sm:leading-7">
              One editor from first review to final export. The process stays
              direct, feedback stays clear, and every decision serves the story.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-[8px] font-bold uppercase tracking-[0.14em] text-black/48">
              <span className="rounded-full border border-black/15 px-3 py-2">One editor</span>
              <span className="rounded-full border border-black/15 px-3 py-2">Clear feedback</span>
              <span className="rounded-full border border-black/15 px-3 py-2">Ready to publish</span>
            </div>
          </div>
        </div>

        <div className="relative mt-3 grid gap-x-12 md:grid-cols-2">
          {processSteps.map((step) => (
            <article
              key={step.number}
              className="grid grid-cols-[42px_1fr] gap-4 border-b border-black/15 py-7"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#171513] font-mono text-[8px] font-bold text-[#f1ede5]">
                {step.number}
              </span>
              <div>
                <h3 className="text-lg font-[650] tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-black/52">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="relative mt-8 flex items-center gap-3 text-[8px] font-semibold uppercase tracking-[0.18em] text-black/35" aria-hidden="true">
          <span>Raw footage</span>
          <span className="h-px flex-1 bg-black/15" />
          <span className="h-2 w-2 rotate-45 bg-[#f06a4f]" />
          <span className="h-px flex-1 bg-black/15" />
          <span>Final export</span>
        </div>
      </div>
    </section>
  );
}
