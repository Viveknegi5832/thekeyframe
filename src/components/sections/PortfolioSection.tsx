import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Play, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  type EnrichedPortfolioVideo,
  longFormVideos,
  shortFormVideos,
} from "@/data/videos";
import { SectionReveal } from "@/components/shared/SectionReveal";

function VideoModal({
  video,
  onClose,
}: {
  video: EnrichedPortfolioVideo | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!video) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={video.title}
          className="fixed inset-0 z-[100] grid place-items-center bg-[#050506]/92 p-3 backdrop-blur-2xl md:p-8"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className={`w-full overflow-hidden rounded-[1.4rem] border border-white/15 bg-[#121217] shadow-[0_40px_160px_rgba(0,0,0,0.8)] ${
              video.format === "short" ? "max-w-[460px]" : "max-w-6xl"
            }`}
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-[#19191f] px-4 py-3">
              <div className="min-w-0">
                <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#ff7656]">
                  Program monitor / {video.projectNumber}
                </p>
                <h3 className="mt-1 truncate text-sm font-semibold text-white">
                  {video.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-white/55 transition hover:bg-white/10 hover:text-white"
                aria-label="Close video"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              className={
                video.format === "short"
                  ? "aspect-[9/16] max-h-[78vh]"
                  : "aspect-video"
              }
            >
              <iframe
                src={video.videoUrl}
                title={video.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="h-full w-full border-0 bg-black"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ShortProject({
  video,
  index,
  onSelect,
}: {
  video: EnrichedPortfolioVideo;
  index: number;
  onSelect: (video: EnrichedPortfolioVideo) => void;
}) {
  const rotations = [-2.2, 1.4, -1, 2, -1.5];

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(video)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay: index * 0.08 }}
      whileHover={{ y: -18, rotate: 0, scale: 1.015 }}
      style={{ rotate: rotations[index] }}
      className={`group relative w-[78vw] max-w-[310px] shrink-0 snap-center text-left sm:w-[310px] lg:w-auto ${
        index % 2 === 1 ? "lg:mt-16" : ""
      }`}
      aria-label={`Play ${video.title}`}
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-[1.25rem] border border-white/15 bg-[#15151a] shadow-[0_28px_80px_rgba(0,0,0,0.42)]">
        <div
          className={`absolute inset-0 ${
            index % 2 === 0 ? "project-heat-one" : "project-heat-two"
          }`}
        />
        {video.thumbnailUrl && (
          <img
            src={video.thumbnailUrl}
            alt=""
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
            className="relative h-full w-full object-cover opacity-85 saturate-[0.78] transition duration-700 group-hover:scale-[1.045] group-hover:opacity-100 group-hover:saturate-100"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/15" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/55">
            {video.projectNumber}
          </span>
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/30 text-white opacity-0 backdrop-blur transition duration-300 group-hover:opacity-100">
            <Play className="ml-0.5 h-4 w-4 fill-current" />
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#ff7a5b]">
            {video.category} / {video.platform}
          </p>
          <h3 className="mt-2 text-2xl font-semibold leading-[0.98] tracking-[-0.045em] text-white">
            {video.title}
          </h3>
          <div className="mt-4 flex items-center gap-2">
            <span className="h-px flex-1 bg-white/15" />
            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">
              View cut
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function LongProject({
  video,
  index,
  onSelect,
}: {
  video: EnrichedPortfolioVideo;
  index: number;
  onSelect: (video: EnrichedPortfolioVideo) => void;
}) {
  return (
    <SectionReveal delay={index * 0.05}>
      <button
        type="button"
        onClick={() => onSelect(video)}
        className="group grid w-full gap-5 border-t border-white/10 py-7 text-left md:grid-cols-[72px_minmax(0,1.3fr)_minmax(240px,0.7fr)_54px] md:items-center md:py-10"
        aria-label={`Play ${video.title}`}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
          {video.projectNumber}
        </span>

        <div className="relative aspect-video overflow-hidden rounded-xl border border-white/12 bg-[#15151a]">
          {video.thumbnailUrl && (
            <img
              src={video.thumbnailUrl}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover opacity-62 saturate-[0.65] transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100 group-hover:saturate-100"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/20" />
          <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black opacity-0 transition duration-300 group-hover:opacity-100">
            <Play className="ml-0.5 h-5 w-5 fill-current" />
          </span>
          <span className="absolute bottom-3 right-3 rounded-md border border-white/15 bg-black/35 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-white/50 backdrop-blur">
            YouTube / 16:9
          </span>
        </div>

        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#ff7455]">
            {video.category} / Editorial
          </p>
          <h3 className="mt-3 text-3xl font-semibold leading-[0.95] tracking-[-0.05em] text-white md:text-4xl">
            {video.title}
          </h3>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/40">
            {video.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {video.tools.slice(0, 3).map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-white/38"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        <span className="hidden h-12 w-12 place-items-center rounded-full border border-white/12 text-white/45 transition group-hover:border-[#ff4d24] group-hover:bg-[#ff4d24] group-hover:text-white md:grid">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </button>
    </SectionReveal>
  );
}

function QueuedProjects({ videos }: { videos: EnrichedPortfolioVideo[] }) {
  return (
    <SectionReveal className="mt-16 overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#121217]">
      <div className="flex flex-col gap-4 border-b border-white/10 p-5 md:flex-row md:items-center md:justify-between md:p-6">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#ff7354]">
            Render queue / Upcoming work
          </p>
          <p className="mt-2 text-xl font-semibold tracking-[-0.035em] text-white">
            Eight new cuts are staged for release.
          </p>
        </div>
        <span className="w-fit rounded-full border border-white/10 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">
          Awaiting final media
        </span>
      </div>

      <div className="relative p-5 md:p-6">
        <div className="absolute bottom-0 left-[9.5%] top-0 w-px bg-[#ff4d24]/55" />
        <div className="grid gap-2">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="grid grid-cols-[52px_minmax(0,1fr)_72px] items-center gap-3"
            >
              <span className="font-mono text-[8px] text-white/25">
                V{(index % 3) + 1}
              </span>
              <div className="relative h-8 overflow-hidden rounded-[4px] border border-white/10 bg-white/[0.035]">
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`absolute inset-y-1 origin-left rounded-[2px] ${
                    index % 3 === 0
                      ? "bg-[#ff4d24]/45"
                      : index % 3 === 1
                        ? "bg-[#6659ff]/45"
                        : "bg-[#bd4dff]/40"
                  }`}
                  style={{
                    left: `${6 + (index % 4) * 7}%`,
                    width: `${34 + (index % 3) * 12}%`,
                  }}
                />
                <span className="absolute inset-y-0 left-3 flex items-center font-mono text-[7px] uppercase tracking-[0.16em] text-white/40">
                  {video.projectNumber} / Reserved
                </span>
              </div>
              <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-white/25">
                Offline
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}

export function PortfolioSection() {
  const [activeFormat, setActiveFormat] = useState<"short" | "long">("short");
  const [selectedVideo, setSelectedVideo] =
    useState<EnrichedPortfolioVideo | null>(null);
  const liveLongVideos = useMemo(
    () => longFormVideos.filter((video) => video.status === "live"),
    [],
  );
  const queuedLongVideos = useMemo(
    () => longFormVideos.filter((video) => video.status === "placeholder"),
    [],
  );

  return (
    <section
      id="work"
      className="relative scroll-mt-20 overflow-hidden bg-[#0a0a0c] px-4 py-28 text-white md:px-6 md:py-40"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_70%_0%,rgba(111,77,255,0.11),transparent_42%),radial-gradient(circle_at_25%_4%,rgba(255,77,36,0.08),transparent_34%)]" />
      <div className="relative mx-auto max-w-[1440px]">
        <SectionReveal className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.23em] text-[#ff7455]">
              Selected work / The proof
            </p>
            <h2 className="mt-6 text-[clamp(4rem,8.8vw,9rem)] font-semibold leading-[0.78] tracking-[-0.078em]">
              Cuts you
              <span className="block font-serif font-normal italic text-white/32">
                don’t skip.
              </span>
            </h2>
          </div>

          <div className="lg:pb-3">
            <p className="max-w-xl text-lg leading-8 text-white/45">
              Not a wall of embeds. A curated viewing room for short-form pace,
              long-form structure, motion, and sound.
            </p>

            <div className="mt-7 inline-flex rounded-xl border border-white/10 bg-white/[0.035] p-1">
              <button
                type="button"
                onClick={() => setActiveFormat("short")}
                className={`rounded-lg px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] transition ${
                  activeFormat === "short"
                    ? "bg-[#ff4d24] text-white"
                    : "text-white/35 hover:text-white"
                }`}
              >
                Vertical cuts <span className="ml-1.5 opacity-55">05</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveFormat("long")}
                className={`rounded-lg px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] transition ${
                  activeFormat === "long"
                    ? "bg-[#ff4d24] text-white"
                    : "text-white/35 hover:text-white"
                }`}
              >
                Long-form <span className="ml-1.5 opacity-55">12</span>
              </button>
            </div>
          </div>
        </SectionReveal>

        <div className="mt-16 border-t border-white/10 pt-12">
          <AnimatePresence mode="wait">
            {activeFormat === "short" ? (
              <motion.div
                key="short-form"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <div className="short-work-rail -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-10 pt-4 md:-mx-6 md:px-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0">
                  {shortFormVideos.map((video, index) => (
                    <ShortProject
                      key={video.id}
                      video={video}
                      index={index}
                      onSelect={setSelectedVideo}
                    />
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 text-sm text-white/35 md:flex-row md:items-center md:justify-between">
                  <p>Five formats. Five different editorial problems solved.</p>
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2 font-semibold text-white"
                  >
                    Brief me on your next short
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="long-form"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                {liveLongVideos.map((video, index) => (
                  <LongProject
                    key={video.id}
                    video={video}
                    index={index}
                    onSelect={setSelectedVideo}
                  />
                ))}
                <QueuedProjects videos={queuedLongVideos} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </section>
  );
}
