import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { editorProfile } from "@/data/site";

const titleLines = ["Video editing", "that makes people", "stop scrolling."];

const metaItems = [
  "24FPS",
  "RETENTION CUT",
  "SOCIAL-FIRST",
  "WEB READY",
];

const floatingNotes = [
  {
    label: "HOOK",
    value: "00:00:01:08",
    className: "left-[5%] top-[26%]",
  },
  {
    label: "PACE",
    value: "TIGHT CUT",
    className: "right-[7%] top-[32%]",
  },
  {
    label: "CAPTIONS",
    value: "BURNED-IN",
    className: "left-[9%] bottom-[30%]",
  },
  {
    label: "EXPORT",
    value: "READY",
    className: "right-[10%] bottom-[26%]",
  },
];

function CropMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute h-10 w-10 border-white/25 ${className}`}
    />
  );
}

export function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.25]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden border-b border-white/10 bg-[#050505] px-4 text-white"
    >
      <motion.div
        style={{ scale: backgroundScale }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(139,92,246,0.24),transparent_34%),radial-gradient(circle_at_84%_22%,rgba(56,189,248,0.13),transparent_32%),radial-gradient(circle_at_50%_105%,rgba(255,255,255,0.08),transparent_34%)]"
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,5,0.15),#050505_92%)]" />

      <motion.div
        className="absolute left-[-8%] top-[14%] h-[34rem] w-[34rem] rounded-full bg-violet-500/10 blur-3xl"
        animate={{
          x: [0, 40, 0],
          y: [0, -20, 0],
          opacity: [0.45, 0.75, 0.45],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-[-10%] top-[18%] h-[30rem] w-[30rem] rounded-full bg-sky-400/10 blur-3xl"
        animate={{
          x: [0, -35, 0],
          y: [0, 22, 0],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <nav className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between py-7">
        <a href="#" className="text-lg font-black tracking-[-0.04em]">
  The<span className="text-violet-300">Keyframe</span>
</a>

        <div className="hidden items-center gap-7 rounded-full border border-white/10 bg-white/[0.035] px-5 py-3 text-sm text-neutral-300 backdrop-blur-xl md:flex">
          <a className="transition hover:text-white" href="#work">
            Work
          </a>
          <a className="transition hover:text-white" href="#services">
            Services
          </a>
          <a className="transition hover:text-white" href="#process">
            Process
          </a>
          <a className="transition hover:text-white" href="#contact">
            Contact
          </a>
        </div>

        <Button asChild className="hidden rounded-full md:inline-flex">
          <a href="#contact">Let’s Work</a>
        </Button>
      </nav>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] w-full max-w-7xl place-items-center py-16">
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative w-full"
        >
          <CropMark className="left-0 top-10 hidden border-l border-t md:block" />
          <CropMark className="right-0 top-10 hidden border-r border-t md:block" />
          <CropMark className="bottom-10 left-0 hidden border-b border-l md:block" />
          <CropMark className="bottom-10 right-0 hidden border-b border-r md:block" />

          <div className="mx-auto max-w-6xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-7 flex justify-center"
            >
              <Badge className="gap-2 rounded-full border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/10">
                <Sparkles className="h-4 w-4 text-violet-200" />
                Available for freelance & agency work
              </Badge>
            </motion.div>

            <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9fd8ff] shadow-[0_0_14px_rgba(159,216,255,0.8)]" />
              Title_Sequence_Main / Preview Full
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[115%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] md:block" />

              {titleLines.map((line, index) => (
                <div key={line} className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "115%", rotate: index === 2 ? -1.2 : 0 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{
                      duration: 0.95,
                      delay: index * 0.09,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-balance text-5xl font-extrabold leading-[0.94] tracking-[-0.055em] md:text-7xl lg:text-[7.2rem]"
                  >
                    {index === 2 ? (
                      <span className="bg-gradient-to-r from-white via-violet-200 to-sky-300 bg-clip-text text-transparent">
                        {line}
                      </span>
                    ) : (
                      line
                    )}
                  </motion.h1>
                </div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.38 }}
              className="mx-auto mt-8 max-w-2xl text-balance text-lg leading-8 text-neutral-300 md:text-xl"
            >
              {editorProfile.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.48 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <Button asChild size="lg" className="rounded-full px-7">
                <a href="#work">Preview Work</a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/15 bg-white/[0.03] px-7 text-white hover:bg-white/10 hover:text-white"
              >
                <a href="#process">Open Process</a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.58 }}
              className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-2"
            >
              {metaItems.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400 backdrop-blur-xl"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {floatingNotes.map((note, index) => (
            <motion.div
              key={note.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: [0, -5, 0] }}
              transition={{
                opacity: { duration: 0.7, delay: 0.8 + index * 0.08 },
                y: {
                  duration: 4.5 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className={`pointer-events-none absolute hidden rounded-xl border border-white/10 bg-[#111216]/70 px-3 py-2 font-mono shadow-2xl shadow-black/30 backdrop-blur-xl lg:block ${note.className}`}
            >
              <p className="text-[9px] uppercase tracking-[0.18em] text-neutral-500">
                {note.label}
              </p>
              <p className="mt-1 text-[11px] text-neutral-200">{note.value}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.a
          href="#work"
          aria-label="Scroll to work section"
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 rounded-full border border-white/10 bg-white/[0.04] p-3 text-neutral-300 backdrop-blur-xl transition hover:border-[#9fd8ff]/70 hover:text-white md:block"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <ArrowDown className="h-5 w-5" />
        </motion.a>
      </div>
    </section>
  );
}