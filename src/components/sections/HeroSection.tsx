import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { AutoplayVideo } from "@/components/shared/AutoplayVideo";
import { editorProfile } from "@/data/site";
import { longFormVideos } from "@/data/videos";

const featuredVideo = longFormVideos.find((video) => video.status === "live") ?? null;

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative scroll-mt-24 overflow-hidden px-4 pb-16 pt-36 text-white sm:px-6 sm:pt-44 md:pb-24"
    >
      <div className="hero-glow pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[1240px]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.035] px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.17em] text-white/55 sm:text-[9px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f06a4f] shadow-[0_0_12px_rgba(240,106,79,0.75)]" />
              {editorProfile.availability}
            </span>
          </div>

          <div className="pb-8 pt-9 text-center sm:pb-10 sm:pt-11">
            <h1 className="mx-auto max-w-[1220px] text-[clamp(2.5rem,6.05vw,5.45rem)] font-[700] uppercase leading-[1.04] tracking-[-0.018em]">
              <span className="block">I don&apos;t just edit footage.</span>
              <span className="block text-[#f06a4f]">I shape how it feels.</span>
            </h1>

            <div className="mx-auto mt-7 max-w-2xl">
              <p className="text-balance text-sm leading-6 text-white/50 sm:text-base sm:leading-7">
                I shape raw footage into clear, pace-driven stories for creators,
                podcasts, YouTube channels, and brands.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href="#work"
                  className="group inline-flex min-h-11 items-center gap-3 rounded-full bg-[#f1ede5] px-5 text-[10px] font-bold text-black transition hover:bg-[#f06a4f]"
                >
                  See the work
                  <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-[10px] font-semibold text-white/65 transition hover:border-white/35 hover:text-white"
                >
                  Let&apos;s talk
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

        </motion.div>

        {featuredVideo && (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0a]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rotate-45 bg-[#f06a4f]" />
                <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/45">
                  Featured cut
                </span>
              </div>
              <span className="text-[8px] font-medium uppercase tracking-[0.16em] text-white/25">
                Long-form / Selected film
              </span>
            </div>

            <div className="group relative aspect-video w-full overflow-hidden bg-black">
              <AutoplayVideo video={featuredVideo} />
              <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.6),transparent_58%),linear-gradient(0deg,rgba(0,0,0,0.62),transparent_45%)]" />
              <span className="pointer-events-none absolute bottom-5 left-5 z-10 text-white sm:bottom-8 sm:left-8">
                <span className="block text-[8px] font-semibold uppercase tracking-[0.2em] text-[#ff947d]">
                  Autoplay preview / 01
                </span>
                <span className="mt-2 block text-[clamp(1.35rem,3vw,2.7rem)] font-semibold tracking-[-0.025em]">
                  {featuredVideo.title}
                </span>
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
