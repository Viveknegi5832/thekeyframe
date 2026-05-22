import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

const sequenceLayers = [
  {
    label: "00_HERO_TITLE_SEQUENCE",
    href: "#",
    progress: 0,
    start: 0,
    end: 20,
    row: 0,
    color: "#5f6673",
  },
  {
    label: "01_WORK_CLIP_BIN",
    href: "#work",
    progress: 0.2,
    start: 17,
    end: 48,
    row: 1,
    color: "#586f92",
  },
  {
    label: "02_SERVICES_EFFECT_STACK",
    href: "#services",
    progress: 0.45,
    start: 41,
    end: 68,
    row: 0,
    color: "#675b88",
  },
  {
    label: "03_PROCESS_KEYFRAMES",
    href: "#process",
    progress: 0.68,
    start: 62,
    end: 88,
    row: 1,
    color: "#4d7480",
  },
  {
    label: "04_CONTACT_RENDER_QUEUE",
    href: "#contact",
    progress: 0.9,
    start: 84,
    end: 100,
    row: 0,
    color: "#80704f",
  },
];

const rulerTicks = Array.from({ length: 17 }, (_, index) => index);

function formatTimecode(progress: number) {
  const totalFrames = 16 * 24;
  const currentFrame = Math.round(progress * totalFrames);
  const seconds = Math.floor(currentFrame / 24);
  const frames = currentFrame % 24;

  return `00:00:${String(seconds).padStart(2, "0")}:${String(frames).padStart(
    2,
    "0",
  )}`;
}

export function GlobalEditingTimeline() {
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.45,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [timecode, setTimecode] = useState("00:00:00:00");

  const playheadLeft = useTransform(
    smoothProgress,
    (latest) => `${Math.min(latest * 100, 100)}%`,
  );

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setTimecode(formatTimecode(latest));

    const nextIndex = sequenceLayers.reduce((currentIndex, layer, index) => {
      return latest >= layer.progress ? index : currentIndex;
    }, 0);

    setActiveIndex((currentIndex) =>
      currentIndex === nextIndex ? currentIndex : nextIndex,
    );
  });

  const activeLayer = sequenceLayers[activeIndex];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] hidden text-white md:block">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto border-t border-[#35363d] bg-[#14151a]/95 shadow-[0_-22px_60px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
      >
        <div className="grid h-[86px] grid-cols-[190px_minmax(0,1fr)_132px]">
          <div className="border-r border-[#2d2e35] bg-[#191a20]">
            <div className="flex h-8 items-center justify-between border-b border-[#2d2e35] px-3">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#b8bbc7]">
                Portfolio Cut
              </span>
              <span className="rounded bg-[#101116] px-1.5 py-0.5 font-mono text-[9px] text-[#767987]">
                24fps
              </span>
            </div>

            <div className="grid h-[58px] grid-cols-[34px_minmax(0,1fr)]">
              <div className="border-r border-[#2d2e35] bg-[#15161b]">
                <div className="grid h-1/2 place-items-center border-b border-[#272830] font-mono text-[9px] text-[#686b76]">
                  V1
                </div>
                <div className="grid h-1/2 place-items-center font-mono text-[9px] text-[#686b76]">
                  V2
                </div>
              </div>

              <div className="px-3 py-2">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#676a75]">
                  Current Section
                </p>
                <p className="mt-1 truncate font-mono text-[11px] uppercase tracking-[0.08em] text-[#e1e2e8]">
                  {activeLayer.label}
                </p>
              </div>
            </div>
          </div>

          <div className="relative bg-[#101116]">
            <div className="relative h-8 border-b border-[#2d2e35] bg-[#18191f]">
              {rulerTicks.map((tick) => (
                <div
                  key={tick}
                  className="absolute top-0 h-full border-l border-[#343640]"
                  style={{ left: `${(tick / 16) * 100}%` }}
                >
                  <span className="ml-1 font-mono text-[9px] text-[#70737d]">
                    {tick % 2 === 0 ? `0:${String(tick).padStart(2, "0")}` : ""}
                  </span>
                </div>
              ))}

              <motion.div
                style={{ scaleX: smoothProgress }}
                className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[#9fd8ff]"
              />
            </div>

            <div className="relative h-[58px]">
              {rulerTicks.map((tick) => (
                <span
                  key={tick}
                  className="absolute top-0 h-full border-l border-white/[0.035]"
                  style={{ left: `${(tick / 16) * 100}%` }}
                />
              ))}

              <div className="absolute left-0 right-0 top-1/2 h-px bg-white/[0.055]" />

              {sequenceLayers.map((layer, index) => {
                const isActive = activeIndex === index;

                return (
                  <a
                    key={layer.label}
                    href={layer.href}
                    className={`absolute h-[18px] rounded-[3px] border transition duration-200 ${
                      isActive
                        ? "border-[#cfeaff]/80 brightness-125"
                        : "border-white/15 hover:brightness-110"
                    }`}
                    style={{
                      left: `${layer.start}%`,
                      width: `${layer.end - layer.start}%`,
                      top: layer.row === 0 ? "8px" : "32px",
                      backgroundColor: layer.color,
                      boxShadow: isActive
                        ? "0 0 16px rgba(159,216,255,0.28)"
                        : "inset 0 1px 0 rgba(255,255,255,0.12)",
                    }}
                  >
                    <span className="absolute left-2 top-1/2 hidden -translate-y-1/2 font-mono text-[8px] uppercase tracking-[0.08em] text-white/85 lg:block">
                      {layer.label.replaceAll("_", " ").toLowerCase()}
                    </span>
                  </a>
                );
              })}

              <motion.div
                style={{ left: playheadLeft }}
                className="absolute bottom-0 top-[-32px] z-30 w-px bg-[#9fd8ff] shadow-[0_0_16px_rgba(159,216,255,0.9)]"
              >
                <span className="absolute -top-px left-1/2 h-0 w-0 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#9fd8ff]" />
              </motion.div>
            </div>
          </div>

          <div className="border-l border-[#2d2e35] bg-[#191a20]">
            <div className="flex h-8 items-center justify-end border-b border-[#2d2e35] px-3">
              <p className="font-mono text-[11px] text-[#9fd8ff]">{timecode}</p>
            </div>

            <div className="flex h-[58px] flex-col justify-center px-3 text-right">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#676a75]">
                Playhead
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#b8bbc7]">
                {Math.round(Number(timecode.slice(-2)))}f
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}