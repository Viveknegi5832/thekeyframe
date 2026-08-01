import { useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Play, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { capabilities, editorProfile } from "@/data/site";
import { longFormVideos } from "@/data/videos";

const featuredVideo = longFormVideos.find((video) => video.status === "live");

const timelineClips = [
  { label: "HOOK", left: "3%", width: "17%", track: 0, color: "#ff4d24" },
  { label: "A-ROLL", left: "18%", width: "28%", track: 1, color: "#5f5cf1" },
  { label: "STORY", left: "22%", width: "32%", track: 0, color: "#b24dff" },
  { label: "B-ROLL", left: "49%", width: "24%", track: 1, color: "#2675ff" },
  { label: "PAYOFF", left: "58%", width: "28%", track: 0, color: "#ff7a42" },
  { label: "OUTRO", left: "79%", width: "18%", track: 1, color: "#6b6d78" },
];

const projectFiles = [
  ["01", "SELECTS_01"],
  ["02", "A_ROLL_SYNC"],
  ["03", "B_ROLL_BIN"],
  ["04", "SOUND_DESIGN"],
];

function EditingStage({ onPlay }: { onPlay: () => void }) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 120, damping: 20 });
  const rotateY = useSpring(rawRotateY, { stiffness: 120, damping: 20 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rawRotateX.set(y * -3.5);
    rawRotateY.set(x * 4);
  };

  return (
    <div className="relative mx-auto mt-14 max-w-[1320px] [perspective:1400px] md:mt-20">
      <motion.div
        ref={stageRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => {
          rawRotateX.set(0);
          rawRotateY.set(0);
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-[1.35rem] border border-white/15 bg-[#111115] shadow-[0_50px_160px_rgba(0,0,0,0.72)] md:rounded-[1.8rem]"
      >
        <div className="flex h-11 items-center justify-between border-b border-white/10 bg-[#1a1a20] px-3 md:h-12 md:px-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5d52]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#f0b84b]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#68c76a]" />
          </div>
          <p className="max-w-[55%] truncate font-mono text-[8px] uppercase tracking-[0.2em] text-white/38 md:text-[10px]">
            THEKEYFRAME_SHOWREEL / Final_Cut_v07
          </p>
          <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/30 md:text-[9px]">
            00:01:24:18
          </p>
        </div>

        <div className="grid md:grid-cols-[150px_minmax(0,1fr)_165px]">
          <aside className="hidden border-r border-white/10 bg-[#121217] p-3 md:block">
            <p className="mb-3 font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">
              Project / TheKeyframe
            </p>
            <div className="space-y-1.5">
              {projectFiles.map(([number, file], index) => (
                <div
                  key={file}
                  className={`flex items-center gap-2 rounded-md px-2 py-2 font-mono text-[8px] ${
                    index === 0
                      ? "bg-[#ff4d24]/15 text-[#ff8d72]"
                      : "text-white/32"
                  }`}
                >
                  <span>{number}</span>
                  <span className="truncate">{file}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-1.5">
              {longFormVideos.slice(0, 4).map((video) => (
                <div
                  key={video.id}
                  className="aspect-video overflow-hidden rounded border border-white/10 bg-white/5"
                >
                  {video.thumbnailUrl && (
                    <img
                      src={video.thumbnailUrl}
                      alt=""
                      className="h-full w-full object-cover opacity-45 grayscale"
                    />
                  )}
                </div>
              ))}
            </div>
          </aside>

          <div className="relative min-w-0 bg-black">
            <div className="relative aspect-[16/9] overflow-hidden">
              {featuredVideo?.thumbnailUrl && (
                <img
                  src={featuredVideo.thumbnailUrl}
                  alt=""
                  className="h-full w-full object-cover opacity-72 saturate-[0.75]"
                />
              )}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.62)_100%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(0,0,0,0.75))]" />

              <div className="absolute left-3 top-3 rounded-md border border-white/15 bg-black/35 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.16em] text-white/55 backdrop-blur md:left-4 md:top-4 md:text-[9px]">
                Program: Final render
              </div>

              <button
                type="button"
                onClick={onPlay}
                className="group absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white text-black shadow-[0_18px_60px_rgba(0,0,0,0.45)] transition duration-300 hover:scale-110 hover:bg-[#ff4d24] hover:text-white md:h-24 md:w-24"
                aria-label="Play featured edit"
              >
                <Play className="ml-1 h-5 w-5 fill-current md:h-8 md:w-8" />
              </button>

              <div className="absolute bottom-3 left-3 md:bottom-5 md:left-5">
                <p className="font-mono text-[7px] uppercase tracking-[0.2em] text-[#ff8b70] md:text-[9px]">
                  Featured edit / 01
                </p>
                <p className="mt-1 text-lg font-semibold tracking-[-0.04em] text-white md:text-3xl">
                  Story over spectacle.
                </p>
              </div>

              <div className="absolute bottom-3 right-3 flex items-center gap-2 font-mono text-[7px] text-white/40 md:bottom-5 md:right-5 md:text-[9px]">
                <span>48 KHZ</span>
                <span className="h-1 w-1 rounded-full bg-[#ff4d24]" />
                <span>4K UHD</span>
              </div>
            </div>
          </div>

          <aside className="hidden border-l border-white/10 bg-[#121217] p-3 md:block">
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">
              Lumetri scopes
            </p>
            <div className="relative mx-auto mt-5 aspect-square w-[112px] rounded-full border border-white/10 bg-[conic-gradient(from_220deg,#ff4d24,#6a55ff,#24b6ff,#ff4d24)] p-[1px] opacity-65">
              <div className="h-full w-full rounded-full bg-[#111116]">
                <span className="absolute left-1/2 top-1/2 h-px w-[80%] -translate-x-1/2 rotate-[22deg] bg-white/15" />
                <span className="absolute left-1/2 top-1/2 h-px w-[80%] -translate-x-1/2 -rotate-[54deg] bg-white/10" />
                <span className="absolute left-[58%] top-[38%] h-2 w-2 rounded-full bg-[#ff7c5c] shadow-[0_0_18px_#ff4d24]" />
              </div>
            </div>

            <p className="mt-5 font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">
              Audio / Master
            </p>
            <div className="mt-3 flex h-20 items-end gap-1">
              {[42, 72, 54, 88, 62, 79, 46, 68, 91, 58, 74, 50].map(
                (height, index) => (
                  <motion.span
                    key={`${height}-${index}`}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-[#ff4d24] to-[#ffb04d]"
                    animate={{ height: [`${height * 0.55}%`, `${height}%`, `${height * 0.65}%`] }}
                    transition={{
                      duration: 1.1 + index * 0.05,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ),
              )}
            </div>
          </aside>
        </div>

        <div className="border-t border-white/10 bg-[#15151a]">
          <div className="relative h-7 border-b border-white/10 bg-[#19191f] md:h-8">
            {Array.from({ length: 13 }, (_, index) => (
              <span
                key={index}
                className="absolute bottom-0 top-0 border-l border-white/[0.08]"
                style={{ left: `${(index / 12) * 100}%` }}
              >
                <span className="ml-1 font-mono text-[6px] text-white/25 md:text-[8px]">
                  {index % 2 === 0 ? `0:${String(index).padStart(2, "0")}` : ""}
                </span>
              </span>
            ))}
          </div>

          <div className="relative h-20 overflow-hidden md:h-24">
            <div className="absolute inset-x-0 top-1/2 h-px bg-white/[0.06]" />
            {timelineClips.map((clip) => (
              <motion.span
                key={clip.label}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute h-6 origin-left overflow-hidden rounded-[3px] border border-white/15 px-2 font-mono text-[6px] leading-6 text-white/70 md:h-7 md:text-[8px] md:leading-7"
                style={{
                  left: clip.left,
                  width: clip.width,
                  top: clip.track === 0 ? "11px" : "48px",
                  backgroundColor: clip.color,
                }}
              >
                {clip.label}
              </motion.span>
            ))}
            <motion.span
              className="absolute bottom-0 top-0 z-10 w-px bg-white shadow-[0_0_14px_rgba(255,255,255,0.75)]"
              animate={{ left: ["8%", "88%", "8%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <span className="absolute left-1/2 top-0 h-0 w-0 -translate-x-1/2 border-l-[5px] border-r-[5px] border-t-[7px] border-l-transparent border-r-transparent border-t-white" />
            </motion.span>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -7, 0], rotate: [-2, 0, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-4 top-[24%] hidden rounded-xl border border-white/12 bg-[#17171c]/90 p-3 shadow-2xl backdrop-blur-xl lg:block"
      >
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">
          Retention marker
        </p>
        <p className="mt-1 text-sm font-semibold text-white">Hook lands · 0:02</p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0], rotate: [2, 0, 2] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-5 bottom-[20%] hidden rounded-xl border border-white/12 bg-[#17171c]/90 p-3 shadow-2xl backdrop-blur-xl lg:block"
      >
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">
          Render status
        </p>
        <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-white">
          <span className="h-2 w-2 rounded-full bg-[#68d36e]" />
          Ready to publish
        </p>
      </motion.div>
    </div>
  );
}

function ReelModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && featuredVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-3 backdrop-blur-2xl md:p-8"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.94, y: 22 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 12 }}
            className="w-full max-w-6xl overflow-hidden rounded-2xl border border-white/15 bg-[#111115]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#ff7354]">
                  Now playing / Featured cut
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {featuredVideo.title}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 hover:text-white"
                aria-label="Close showreel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={featuredVideo.videoUrl}
                title={featuredVideo.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [reelOpen, setReelOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, -55]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative overflow-hidden bg-[#09090a] px-4 pb-0 pt-32 text-white md:px-6 md:pt-40"
    >
      <motion.div
        style={{ opacity: backgroundOpacity }}
        className="pointer-events-none absolute inset-0 cutroom-grid"
      />
      <div className="pointer-events-none absolute left-[-12rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-[#6d4aff]/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-10rem] top-[4rem] h-[38rem] w-[38rem] rounded-full bg-[#ff4d24]/12 blur-[140px]" />
      <div className="pointer-events-none absolute left-1/2 top-[18rem] h-[30rem] w-[70rem] -translate-x-1/2 rounded-full bg-white/[0.025] blur-[100px]" />

      <div className="relative mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-4 border-y border-white/10 py-4 md:flex-row md:items-center md:justify-between"
        >
          <p className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">
            <span className="h-2 w-2 rounded-full bg-[#ff4d24] shadow-[0_0_16px_#ff4d24]" />
            {editorProfile.name} / Independent editor
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">
            India / Available worldwide / 24 FPS
          </p>
        </motion.div>

        <motion.div style={{ y: titleY }} className="relative z-10 mt-12 md:mt-16">
          <p className="mb-6 max-w-xl text-base leading-7 text-white/48 md:ml-auto md:text-right md:text-lg">
            I find the hook, shape the rhythm, and make every frame pull its
            weight.
          </p>

          <h1 className="text-[clamp(3.65rem,9vw,9rem)] font-semibold leading-[0.79] tracking-[-0.078em]">
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block"
              >
                Raw footage has
              </motion.span>
            </span>
            <span className="flex flex-wrap items-baseline gap-x-[0.14em] overflow-hidden pb-[0.12em]">
              <motion.span
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.16,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block font-serif font-normal italic text-[#ff6845]"
              >
                more
              </motion.span>
              <motion.span
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.22,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block"
              >
                in it.
              </motion.span>
            </span>
          </h1>

          <div className="mt-8 flex flex-col gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-balance text-base leading-7 text-white/45">
              Retention-led edits for creators, brands, podcasts, and teams
              that care how the final cut feels—not just how fast it ships.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3.5 text-xs font-bold uppercase tracking-[0.08em] text-black transition hover:bg-[#ff4d24] hover:text-white"
              >
                Explore the work
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 rounded-xl border border-white/15 px-5 py-3.5 text-xs font-bold uppercase tracking-[0.08em] text-white/70 transition hover:border-white/30 hover:bg-white/[0.05] hover:text-white"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div style={{ y: stageY }}>
          <EditingStage onPlay={() => setReelOpen(true)} />
        </motion.div>
      </div>

      <div className="relative mt-16 overflow-hidden border-y border-white/10 bg-[#0d0d0f] py-5">
        <div className="kinetic-marquee flex min-w-max items-center">
          {[...capabilities, ...capabilities].map((capability, index) => (
            <div
              key={`${capability}-${index}`}
              className="flex items-center gap-7 pr-7"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-white/55 md:text-base">
                {capability}
              </span>
              <span className="text-xl text-[#ff4d24]">✦</span>
            </div>
          ))}
        </div>
      </div>

      <ReelModal open={reelOpen} onClose={() => setReelOpen(false)} />
    </section>
  );
}
