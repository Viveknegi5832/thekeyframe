import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { processSteps } from "@/data/site";
import { SectionReveal } from "@/components/shared/SectionReveal";

export function ProcessSection() {
  const containerRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 30%"],
  });

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative overflow-hidden border-y border-white/10 bg-neutral-950 px-4 py-28 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.14),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.18),transparent_34%)]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionReveal className="lg:sticky lg:top-28 lg:h-fit">
          <Badge className="rounded-full bg-sky-500/15 text-sky-200 hover:bg-sky-500/15">
            Workflow
          </Badge>

          <h2 className="mt-5 text-4xl font-bold leading-[0.96] tracking-[-0.045em] md:text-6xl">
            A clean process from raw footage to final export.
          </h2>

          <p className="mt-6 text-lg leading-8 text-neutral-400">
            The goal is simple: clear communication, strong structure, sharp
            edits, and delivery that is ready for the platform.
          </p>

          <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-full origin-left rounded-full bg-gradient-to-r from-violet-400 to-sky-300"
            />
          </div>
        </SectionReveal>

        <div className="relative">
          <div className="absolute bottom-0 left-7 top-0 hidden w-px bg-white/10 md:block" />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute bottom-0 left-7 top-0 hidden w-px origin-top bg-gradient-to-b from-violet-400 to-sky-300 md:block"
          />

          <div className="space-y-5">
            {processSteps.map((step, index) => (
              <SectionReveal key={step.number} delay={index * 0.06}>
                <div className="group relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-400/60 hover:bg-white/[0.07] md:ml-16">
                  <div className="absolute -left-[4.15rem] top-8 hidden h-14 w-14 place-items-center rounded-full border border-white/10 bg-neutral-950 text-sm font-black text-violet-200 md:grid">
                    {step.number}
                  </div>

                  <span className="text-sm font-black uppercase tracking-[0.2em] text-violet-300 md:hidden">
                    {step.number}
                  </span>

                  <h3 className="mt-3 text-3xl font-bold tracking-[-0.035em]">
                    {step.title}
                  </h3>

                  <p className="mt-4 max-w-2xl leading-7 text-neutral-400">
                    {step.description}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}