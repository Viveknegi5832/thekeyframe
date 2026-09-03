import { ArrowUpRight } from "lucide-react";
import { AutoplayVideo } from "@/components/shared/AutoplayVideo";
import {
  longFormVideos,
  shortFormVideos,
  type EnrichedPortfolioVideo,
} from "@/data/videos";

const liveShorts = shortFormVideos.filter((video) => video.status === "live");
const liveLongForm = longFormVideos.filter((video) => video.status === "live");

function WorkCard({ video }: { video: EnrichedPortfolioVideo }) {
  const isShort = video.format === "short";

  return (
    <article className="group min-w-0">
      <div
        className={`relative overflow-hidden rounded-xl border border-white/15 bg-[#0b0b0b] transition duration-300 group-hover:-translate-y-1 group-hover:border-[#f06a4f]/70 ${
          isShort ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        <AutoplayVideo video={video} />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/5" />
        <span className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-2 rounded-xl border border-white/15 bg-black/45 px-2.5 py-1.5 text-[7px] font-semibold uppercase tracking-[0.16em] text-white/60 backdrop-blur sm:left-4 sm:top-4">
          <span className="h-1.5 w-1.5 rotate-45 bg-[#f06a4f]" />
          {video.id.replace("-", " / ").toUpperCase()}
        </span>
        <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-3.5 sm:p-4">
          <span className="block text-[7px] font-semibold uppercase tracking-[0.18em] text-[#ff947d]">
            {video.category} / {video.platform}
          </span>
          <span
            className={`mt-1.5 block font-semibold leading-tight tracking-[-0.015em] text-white ${
              isShort ? "text-sm sm:text-base" : "text-lg sm:text-xl"
            }`}
          >
            {video.title}
          </span>
        </span>
      </div>
    </article>
  );
}

function WorkGroup({
  label,
  count,
  description,
  videos,
  format,
}: {
  label: string;
  count: string;
  description: string;
  videos: EnrichedPortfolioVideo[];
  format: "short" | "long";
}) {
  return (
    <div className="mt-14 border-t border-white/15 pt-5 first:mt-0">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-baseline gap-3">
          <h3 className="text-lg font-semibold tracking-[-0.015em]">{label}</h3>
          <span className="font-mono text-[8px] tracking-[0.16em] text-[#f06a4f]">
            {count}
          </span>
        </div>
        <p className="max-w-md text-xs leading-5 text-white/38 sm:text-right">
          {description}
        </p>
      </div>

      <div
        className={
          format === "short"
            ? "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
            : "grid gap-3 md:grid-cols-2 md:gap-4"
        }
      >
        {videos.map((video) => (
          <WorkCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

export function PortfolioSection() {
  return (
    <section
      id="work"
      className="scroll-mt-24 px-4 py-20 text-white sm:px-6 md:py-28"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-7 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f06a4f]">
              Selected work / 09
            </p>
            <h2 className="mt-4 text-[clamp(3rem,7vw,6.6rem)] font-[650] leading-[0.94] tracking-[-0.025em]">
              Cuts with
              <span className="block text-white/30">a reason.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/42 lg:mt-[2.45rem] lg:max-w-sm lg:justify-self-end lg:text-base lg:leading-7">
            Different formats, same standard: a clear hook, purposeful pacing,
            and a finish that serves the story.
          </p>
        </div>

        <div className="mt-14 md:mt-20">
          <WorkGroup
            label="Short cuts"
            count="05 / VERTICAL"
            description="Fast, focused edits made for feeds, creators, podcasts, and paid social."
            videos={liveShorts}
            format="short"
          />
          <WorkGroup
            label="Long stories"
            count="04 / WIDESCREEN"
            description="Long-form YouTube edits shaped around structure, personality, and retention."
            videos={liveLongForm}
            format="long"
          />
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/38">
            Have footage that needs a stronger story?
          </p>
          <a
            href="#contact"
            className="group inline-flex min-h-11 w-fit items-center gap-3 rounded-full bg-[#f1ede5] px-5 text-[10px] font-bold text-black transition hover:bg-[#f06a4f]"
          >
            Work with Vivek
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
