import { ArrowUpRight, Plus } from "lucide-react";
import { faqs } from "@/data/site";

export function FAQSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-24 px-4 py-20 text-white sm:px-6 md:py-28"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col gap-5 border-b border-white/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f06a4f]">
              Before the upload / FAQ
            </p>
            <h2 className="mt-4 text-[clamp(2.8rem,6vw,5.8rem)] font-semibold leading-[0.86] tracking-[-0.07em]">
              The straight answers.
            </h2>
          </div>
          <a
            href="#contact"
            className="group inline-flex w-fit items-center gap-2 text-xs font-semibold text-white/50 transition hover:text-white"
          >
            Ask me directly
            <ArrowUpRight className="h-3.5 w-3.5 text-[#f06a4f] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="grid lg:grid-cols-2 lg:gap-x-16">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="faq-item border-b border-white/15">
              <summary className="group flex cursor-pointer list-none items-start gap-4 py-6 marker:hidden sm:py-7">
                <span className="mt-1.5 shrink-0 font-mono text-[8px] tracking-[0.16em] text-[#f06a4f]">
                  0{index + 1}
                </span>
                <span className="flex-1 text-base font-semibold tracking-[-0.03em] text-white/80 transition group-hover:text-white sm:text-lg">
                  {faq.question}
                </span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-white/40 transition group-hover:border-[#f06a4f] group-hover:text-white">
                  <Plus className="faq-icon h-3.5 w-3.5 transition-transform" />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 pl-9 pr-10 text-sm leading-6 text-white/42 sm:pl-10 sm:pr-14">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
