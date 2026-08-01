import { useState } from "react";
import {
  ArrowUpRight,
  Captions,
  Clapperboard,
  Headphones,
  WandSparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { services } from "@/data/site";
import { SectionReveal } from "@/components/shared/SectionReveal";

const serviceIcons = [Captions, Clapperboard, Headphones, WandSparkles];

const previewData = [
  {
    file: "VERTICAL_MASTER_01",
    label: "Short-form engine",
    headline: "Hook. Hold. Payoff.",
    gradient:
      "radial-gradient(circle at 70% 22%, rgba(255,95,55,.72), transparent 27%), radial-gradient(circle at 22% 76%, rgba(94,67,255,.72), transparent 40%), #111116",
    tracks: ["CAPTIONS", "PATTERN_BREAK", "SFX"],
  },
  {
    file: "YOUTUBE_MASTER_04",
    label: "Long-form structure",
    headline: "Make 10 minutes feel like 2.",
    gradient:
      "radial-gradient(circle at 30% 22%, rgba(51,108,255,.65), transparent 30%), radial-gradient(circle at 75% 78%, rgba(178,77,255,.58), transparent 42%), #111116",
    tracks: ["STORY_ARC", "B_ROLL", "MUSIC"],
  },
  {
    file: "PODCAST_SELECTS_02",
    label: "Podcast cutdowns",
    headline: "Find the moment inside the hour.",
    gradient:
      "radial-gradient(circle at 65% 28%, rgba(255,77,36,.62), transparent 28%), radial-gradient(circle at 22% 75%, rgba(37,127,126,.72), transparent 40%), #111116",
    tracks: ["MULTICAM", "DIALOGUE", "REFRAME"],
  },
  {
    file: "PAID_SOCIAL_V03",
    label: "Ads & brand",
    headline: "Clarity that moves.",
    gradient:
      "radial-gradient(circle at 74% 25%, rgba(255,178,50,.62), transparent 28%), radial-gradient(circle at 28% 72%, rgba(224,55,79,.65), transparent 42%), #111116",
    tracks: ["PRODUCT", "MOTION", "CTA"],
  },
];

function ServicePreview({ activeIndex }: { activeIndex: number }) {
  const preview = previewData[activeIndex];

  return (
    <div className="overflow-hidden rounded-[1.4rem] border border-white/12 bg-[#111116] shadow-[0_36px_120px_rgba(0,0,0,0.52)]">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#19191f] px-4 py-3">
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/35">
          Program / {preview.file}
        </p>
        <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-white/30">
          <span className="h-1.5 w-1.5 rounded-full bg-[#68d36e]" />
          Live preview
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={preview.file}
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: 0.35 }}
        >
          <div
            className="relative aspect-[16/10] overflow-hidden p-6 md:p-8"
            style={{ background: preview.gradient }}
          >
            <div className="absolute inset-0 service-preview-grid opacity-25" />
            <div className="absolute left-6 top-6 h-8 w-8 border-l border-t border-white/35" />
            <div className="absolute right-6 top-6 h-8 w-8 border-r border-t border-white/35" />
            <div className="absolute bottom-6 left-6 h-8 w-8 border-b border-l border-white/35" />
            <div className="absolute bottom-6 right-6 h-8 w-8 border-b border-r border-white/35" />

            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/45">
                  {preview.label}
                </p>
                <p className="font-mono text-[8px] text-white/30">
                  1920 × 1080
                </p>
              </div>

              <motion.h3
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="max-w-xl text-[clamp(2.5rem,5vw,5.8rem)] font-semibold leading-[0.84] tracking-[-0.07em] text-white"
              >
                {preview.headline}
              </motion.h3>

              <div className="flex items-end justify-between">
                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">
                  TheKeyframe / Output 0{activeIndex + 1}
                </p>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/20">
                  <span className="h-2 w-2 rounded-full bg-[#ff6b49] shadow-[0_0_16px_#ff4d24]" />
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 bg-[#15151a] p-3">
            <div className="grid gap-1.5">
              {preview.tracks.map((track, index) => (
                <div
                  key={track}
                  className="grid grid-cols-[44px_minmax(0,1fr)] items-center gap-2"
                >
                  <span className="font-mono text-[7px] text-white/25">
                    {index === 0 ? "V1" : index === 1 ? "V2" : "A1"}
                  </span>
                  <div className="relative h-5 overflow-hidden rounded-[3px] bg-black/25">
                    <motion.span
                      key={`${preview.file}-${track}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.08 }}
                      className={`absolute inset-y-0 origin-left rounded-[3px] ${
                        index === 0
                          ? "bg-[#ff4d24]/65"
                          : index === 1
                            ? "bg-[#675cff]/60"
                            : "bg-[#4a6e80]/65"
                      }`}
                      style={{
                        left: `${4 + index * 9}%`,
                        width: `${72 - index * 11}%`,
                      }}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[6px] uppercase tracking-[0.14em] text-white/55">
                      {track}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="services"
      className="relative scroll-mt-20 overflow-hidden bg-[#101014] px-4 py-28 text-white md:px-6 md:py-40"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,77,36,0.08),transparent_30%),radial-gradient(circle_at_85%_60%,rgba(101,82,255,0.09),transparent_35%)]" />
      <div className="relative mx-auto max-w-[1440px]">
        <SectionReveal className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.23em] text-[#ff7455]">
              Post-production stack / 04
            </p>
            <h2 className="mt-6 text-[clamp(3.8rem,7.6vw,8rem)] font-semibold leading-[0.8] tracking-[-0.074em]">
              More than
              <span className="block font-serif font-normal italic text-white/30">
                clean cuts.
              </span>
            </h2>
          </div>

          <p className="max-w-2xl text-lg leading-8 text-white/42 lg:pb-3">
            Every layer has a job: establish the idea, control the pace, guide
            the eye, and make the payoff land. Open the stack to inspect the
            build.
          </p>
        </SectionReveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <SectionReveal>
            <div className="border-t border-white/10">
              {services.map((service, index) => {
                const Icon = serviceIcons[index];
                const isActive = activeIndex === index;

                return (
                  <button
                    key={service.number}
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    className="group relative w-full overflow-hidden border-b border-white/10 py-6 text-left"
                  >
                    <motion.span
                      className="absolute inset-0 origin-left bg-white/[0.035]"
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="relative grid grid-cols-[42px_1fr_42px] items-start gap-4 px-2">
                      <span
                        className={`grid h-9 w-9 place-items-center rounded-lg border transition ${
                          isActive
                            ? "border-[#ff4d24] bg-[#ff4d24] text-white"
                            : "border-white/10 text-white/35"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3
                            className={`text-2xl font-semibold tracking-[-0.04em] transition md:text-3xl ${
                              isActive ? "text-white" : "text-white/48"
                            }`}
                          >
                            {service.title}
                          </h3>
                          <span className="font-mono text-[8px] text-white/20">
                            {service.number}
                          </span>
                        </div>
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="max-w-lg pt-4 text-sm leading-6 text-white/40">
                                {service.description}
                              </p>
                              <div className="flex flex-wrap gap-2 pt-4">
                                {service.deliverables.map((deliverable) => (
                                  <span
                                    key={deliverable}
                                    className="rounded-full border border-white/10 px-2.5 py-1 text-[9px] text-white/38"
                                  >
                                    {deliverable}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <ArrowUpRight
                        className={`mt-2 h-4 w-4 transition ${
                          isActive
                            ? "text-[#ff7455]"
                            : "text-white/18 group-hover:text-white/45"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08} className="lg:sticky lg:top-28">
            <ServicePreview activeIndex={activeIndex} />
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
