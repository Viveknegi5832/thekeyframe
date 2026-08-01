import { useState } from "react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { faqs } from "@/data/site";
import { SectionReveal } from "@/components/shared/SectionReveal";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#0a0a0c] px-4 py-28 text-white md:px-6 md:py-40">
      <div className="pointer-events-none absolute left-[-14rem] top-[8rem] h-[32rem] w-[32rem] rounded-full bg-[#654eff]/[0.08] blur-[130px]" />
      <div className="relative mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[0.62fr_1.38fr]">
        <SectionReveal className="lg:sticky lg:top-32 lg:h-fit">
          <p className="font-mono text-[9px] uppercase tracking-[0.23em] text-[#ff7455]">
            Before we start / FAQ
          </p>
          <h2 className="mt-6 text-[clamp(3.8rem,6.5vw,7rem)] font-semibold leading-[0.82] tracking-[-0.07em]">
            Clear before
            <span className="block font-serif font-normal italic text-white/30">
              the first cut.
            </span>
          </h2>
          <p className="mt-7 max-w-sm leading-7 text-white/40">
            No mystery pricing theatre or complicated handoffs. Here is what
            most clients want to know first.
          </p>
          <a
            href="#contact"
            className="group mt-8 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.1em] text-white"
          >
            Ask something else
            <ArrowUpRight className="h-4 w-4 text-[#ff7455] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="border-t border-white/10">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <article key={faq.question} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="group flex w-full items-start gap-5 py-7 text-left md:gap-8 md:py-9"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`mt-1 font-mono text-[9px] tracking-[0.2em] transition ${
                        isOpen ? "text-[#ff7455]" : "text-white/20"
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <span className="flex-1 text-xl font-semibold tracking-[-0.03em] text-white/85 transition group-hover:text-white md:text-3xl">
                      {faq.question}
                    </span>
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition ${
                        isOpen
                          ? "rotate-180 border-[#ff4d24] bg-[#ff4d24] text-white"
                          : "border-white/12 text-white/40 group-hover:border-white/30 group-hover:text-white"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32 }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-9 pl-10 text-base leading-8 text-white/42 md:pl-16 md:text-lg">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
