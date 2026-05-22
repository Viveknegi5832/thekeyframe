import { useState } from "react";
import { motion } from "motion/react";
import { Clapperboard, Film, Megaphone, Mic2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { services } from "@/data/site";
import { SectionReveal } from "@/components/shared/SectionReveal";

const icons = [Clapperboard, Mic2, Film, Megaphone];

const layerMeta = [
  {
    track: "V1",
    label: "SHORTS_ENGINE",
    blend: "Normal",
    color: "from-sky-300/70 to-sky-500/30",
  },
  {
    track: "A1",
    label: "PODCAST_CUTDOWN",
    blend: "Dialogue",
    color: "from-violet-300/70 to-violet-500/30",
  },
  {
    track: "V2",
    label: "LONGFORM_STRUCTURE",
    blend: "Story",
    color: "from-emerald-300/70 to-emerald-500/30",
  },
  {
    track: "FX",
    label: "PAID_SOCIAL_CUT",
    blend: "Punch",
    color: "from-amber-300/70 to-amber-500/30",
  },
];

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#050505] px-4 py-28 text-white"
    >
<div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(159,216,255,0.08),transparent_28%),radial-gradient(circle_at_82%_38%,rgba(139,92,246,0.10),transparent_34%),linear-gradient(to_bottom,#050505,#08070b_48%,#050505)]" />
<div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.55),transparent_22%,transparent_78%,rgba(0,0,0,0.55))]" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionReveal className="lg:sticky lg:top-28 lg:h-fit">
          <Badge className="rounded-full border border-white/10 bg-white/[0.05] text-neutral-200 hover:bg-white/[0.05]">
            Effects Stack
          </Badge>

          <h2 className="mt-5 max-w-2xl text-4xl font-bold leading-[0.96] tracking-[-0.045em] md:text-6xl">
            Editing support, stacked like a post-production workflow.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-400">
            Each service is built like a layer in the edit — structured,
            intentional, and designed to make the final cut sharper.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                Active Effect
              </span>
              <span className="font-mono text-[10px] text-sky-200">
                {layerMeta[activeIndex].track}
              </span>
            </div>

            <div className="p-4">
              <p className="font-mono text-sm uppercase tracking-[0.1em] text-white">
                {layerMeta[activeIndex].label}
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-500">
                Hover through the stack to preview how each service plugs into
                the editing pipeline.
              </p>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#111216]/90 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="grid grid-cols-[72px_minmax(0,1fr)_96px] border-b border-white/10 bg-[#18191f] px-4 py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                Track
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                Layer / Effect
              </span>
              <span className="text-right font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                Mode
              </span>
            </div>

            <div className="divide-y divide-white/10">
              {services.map((service, index) => {
                const Icon = icons[index];
                const meta = layerMeta[index];
                const isActive = activeIndex === index;

                return (
                  <motion.article
                    key={service.title}
                    layout
                    onMouseEnter={() => setActiveIndex(index)}
                    className="group relative grid cursor-pointer grid-cols-[72px_minmax(0,1fr)_96px] gap-4 overflow-hidden px-4 py-4"
                    animate={{
                      backgroundColor: isActive
                        ? "rgba(255,255,255,0.075)"
                        : "rgba(255,255,255,0.02)",
                    }}
                    transition={{ duration: 0.28 }}
                  >
                    <motion.div
                      className="absolute inset-y-0 left-0 w-[3px] bg-sky-200"
                      animate={{ opacity: isActive ? 1 : 0 }}
                    />

                    <div className="flex items-start gap-2">
                      <div className="mt-1 grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-black/30 font-mono text-[10px] text-neutral-400">
                        {meta.track}
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.06] transition group-hover:border-sky-200/50">
                          <Icon className="h-5 w-5 text-neutral-200" />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                              {meta.label}
                            </p>

                            <span className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-neutral-500">
                              0{index + 1}
                            </span>
                          </div>

                          <h3 className="mt-1 text-2xl font-bold leading-[1.05] tracking-[-0.035em] text-white">
                            {service.title}
                          </h3>
                        </div>
                      </div>

                      <motion.div
                        initial={false}
                        animate={{
                          height: isActive ? "auto" : 0,
                          opacity: isActive ? 1 : 0,
                          marginTop: isActive ? 16 : 0,
                        }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl text-sm leading-7 text-neutral-400">
                          {service.description}
                        </p>
                      </motion.div>

                      <div className="relative mt-4 h-5 overflow-hidden rounded-md border border-white/10 bg-black/30">
                        <motion.div
                          className={`h-full rounded-sm bg-gradient-to-r ${meta.color}`}
                          initial={false}
                          animate={{ width: isActive ? "92%" : "46%" }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        />

                        {[18, 42, 68, 86].map((position) => (
                          <motion.span
                            key={position}
                            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border border-white/30 bg-white/20"
                            style={{ left: `${position}%` }}
                            animate={{
                              scale: isActive ? 1 : 0.7,
                              opacity: isActive ? 1 : 0.35,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">
                        {meta.blend}
                      </p>

                      <motion.p
                        className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em]"
                        animate={{
                          color: isActive ? "#bae6fd" : "#52525b",
                        }}
                      >
                        {isActive ? "Enabled" : "Idle"}
                      </motion.p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}