import { useRef } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { editorProfile, processSteps } from "@/data/site";
import { SectionReveal } from "@/components/shared/SectionReveal";

const waveform = [
  18, 34, 54, 26, 68, 42, 78, 32, 58, 86, 44, 66, 28, 72, 48, 88, 36, 64,
  24, 56, 80, 38, 70, 46,
];

function ProcessCard({
  step,
  index,
}: {
  step: (typeof processSteps)[number];
  index: number;
}) {
  return (
    <SectionReveal>
      <article className="group relative min-h-[330px] overflow-hidden rounded-[1.5rem] border border-black/12 bg-[#f6f3ec] p-6 shadow-[0_24px_90px_rgba(30,23,16,0.08)] md:p-9">
        <div className="flex items-start justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-black/35">
            Sequence / {step.number}
          </span>
          <span className="grid h-11 w-11 place-items-center rounded-full border border-black/12 transition duration-300 group-hover:rotate-[-8deg] group-hover:bg-black group-hover:text-white">
            <ArrowDownRight className="h-4 w-4" />
          </span>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-end">
          <div>
            <span className="text-[5rem] font-semibold leading-none tracking-[-0.08em] text-black/[0.075]">
              {step.number}
            </span>
            <h3 className="-mt-4 text-4xl font-semibold leading-[0.92] tracking-[-0.055em] text-[#101012] md:text-5xl">
              {step.title}
            </h3>
          </div>

          <p className="max-w-md leading-7 text-black/50">{step.description}</p>
        </div>

        <div className="mt-10 border-t border-black/10 pt-4">
          <div className="flex h-10 items-center gap-[3px] overflow-hidden">
            {waveform.map((height, barIndex) => (
              <motion.span
                key={`${index}-${barIndex}`}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.35,
                  delay: barIndex * 0.012,
                }}
                className={`w-1 origin-center rounded-full ${
                  barIndex < (index + 1) * 6
                    ? "bg-[#ff4d24]"
                    : "bg-black/12"
                }`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[7px] uppercase tracking-[0.16em] text-black/25">
            <span>00:00:0{index}:00</span>
            <span>Step {index + 1} / 4</span>
          </div>
        </div>
      </article>
    </SectionReveal>
  );
}

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 40%"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
  });
  const progressRotate = useTransform(smoothProgress, [0, 1], [0, 360]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative scroll-mt-20 overflow-hidden bg-[#e9e5db] px-4 py-28 text-[#101012] md:px-6 md:py-40"
    >
      <div className="pointer-events-none absolute inset-0 process-paper opacity-35" />
      <div className="relative mx-auto max-w-[1440px]">
        <SectionReveal className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.23em] text-[#d83b19]">
              Workflow / From ingest to export
            </p>
            <h2 className="mt-6 text-[clamp(4rem,8vw,8.5rem)] font-semibold leading-[0.78] tracking-[-0.078em]">
              The cut gets
              <span className="block font-serif font-normal italic text-black/28">
                built in layers.
              </span>
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-black/50 lg:pb-3">
            A clear system gives the creative room to be ambitious. You always
            know what is happening, what comes next, and where feedback belongs.
          </p>
        </SectionReveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.48fr_1fr] lg:items-start">
          <SectionReveal className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-[1.5rem] bg-[#111115] p-6 text-white md:p-8">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/35">
                  Edit progress
                </p>
                <span className="h-2 w-2 rounded-full bg-[#ff4d24] shadow-[0_0_16px_#ff4d24]" />
              </div>

              <div className="relative mx-auto my-10 grid aspect-square max-w-[300px] place-items-center rounded-full border border-white/10">
                <div className="absolute inset-5 rounded-full border border-dashed border-white/10" />
                <div className="absolute inset-10 rounded-full border border-white/[0.06]" />
                <motion.div
                  style={{ rotate: progressRotate }}
                  className="absolute inset-0"
                >
                  <span className="absolute left-1/2 top-0 h-1/2 w-px origin-bottom bg-gradient-to-t from-[#ff4d24] to-transparent" />
                </motion.div>
                <div className="text-center">
                  <p className="text-7xl font-semibold tracking-[-0.08em]">04</p>
                  <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.2em] text-white/35">
                    Deliberate stages
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-1.5">
                {processSteps.map((step, index) => (
                  <div key={step.number}>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        style={{ scaleX: smoothProgress }}
                        className="h-full origin-left rounded-full bg-[#ff4d24]"
                      />
                    </div>
                    <p className="mt-2 font-mono text-[7px] text-white/25">
                      0{index + 1}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          <div className="space-y-5">
            {processSteps.map((step, index) => (
              <ProcessCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>

        <SectionReveal
          id="about"
          className="relative mt-28 scroll-mt-24 overflow-hidden rounded-[1.8rem] bg-[#ff4d24] p-7 text-white md:p-12 lg:p-16"
        >
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[60px] border-white/[0.06]" />
          <p className="font-mono text-[9px] uppercase tracking-[0.23em] text-white/58">
            About / Direct collaboration
          </p>

          <div className="relative mt-12 grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
            <p className="text-[clamp(3.1rem,6.8vw,7.2rem)] font-semibold leading-[0.83] tracking-[-0.075em]">
              One editor.
              <span className="block font-serif font-normal italic text-black/38">
                Zero handoffs.
              </span>
            </p>

            <div>
              <p className="text-xl font-semibold leading-snug tracking-[-0.03em]">
                I’m {editorProfile.name}, the editor behind TheKeyframe.
              </p>
              <p className="mt-5 leading-7 text-white/70">
                You work directly with the person making the decisions in the
                timeline—from the first select to the final sound pass.
              </p>
              <a
                href="#contact"
                className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-black px-5 py-3.5 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-white hover:text-black"
              >
                Work with Vivek
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          <div className="relative mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/20 pt-5 font-mono text-[8px] uppercase tracking-[0.2em] text-white/48">
            <span>Premiere Pro</span>
            <span>After Effects</span>
            <span>Story edit</span>
            <span>Motion design</span>
            <span>Sound design</span>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
