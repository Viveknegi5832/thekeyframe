import { Badge } from "@/components/ui/badge";
import { longFormVideos, shortFormVideos } from "@/data/videos";
import { getVideoEmbedUrl } from "@/lib/videoLinks";
import { SectionReveal } from "@/components/shared/SectionReveal";

function getAspectClass(aspectRatio: string) {
  if (aspectRatio === "landscape") return "aspect-video";
  if (aspectRatio === "square") return "aspect-square";

  // Portrait videos were becoming too tall in 2-column layout,
  // so we use a fixed, controlled preview height.
  return "h-[520px] md:h-[560px] lg:h-[600px]";
}

type ShortFormVideo = (typeof shortFormVideos)[number];
type LongFormVideo = (typeof longFormVideos)[number];
type PortfolioVideo = ShortFormVideo | LongFormVideo;

function InlineVideoCard({
  video,
  index,
}: {
  video: PortfolioVideo;
  index: number;
}) {
const shouldAutoplay = video.videoPlatform === "youtube";
const embedUrl = getVideoEmbedUrl(video.rawVideoUrl, shouldAutoplay);
  return (
    <SectionReveal delay={index * 0.05}>
      <article className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] text-white shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-2 hover:border-[#9fd8ff]/60 hover:bg-white/[0.06] hover:shadow-sky-500/10">
        <div className="border-b border-white/10 bg-[#18191f] px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                {video.format === "long" ? "Long Form Cut" : "Short Form Cut"}
              </p>
              <h3 className="mt-1 truncate text-xl font-bold tracking-[-0.035em] text-white">
                {video.title}
              </h3>
            </div>

            <Badge className="shrink-0 rounded-full bg-white/[0.06] text-neutral-200 hover:bg-white/[0.06]">
              {video.videoPlatform === "youtube" ? "YouTube" : "Drive"}
            </Badge>
          </div>
        </div>

        <div className="relative bg-black">
         <div
  className={`overflow-hidden bg-black ${
    getAspectClass(video.aspectRatio)
  }`}
>
            <iframe
              src={embedUrl}
              title={video.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        </div>

        <div className="p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="rounded-full border-white/10 text-neutral-300"
            >
              {video.category}
            </Badge>

            <Badge
              variant="outline"
              className="rounded-full border-white/10 text-neutral-300"
            >
              {video.platform}
            </Badge>
          </div>

          <p className="line-clamp-2 text-sm leading-6 text-neutral-400">
  {video.description}
</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {video.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-neutral-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </article>
    </SectionReveal>
  );
}

export function PortfolioSection() {
  return (
    <section
      id="work"
      className="relative overflow-hidden bg-neutral-950 px-4 py-28 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.13),transparent_35%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionReveal className="mx-auto max-w-3xl text-center">
          <Badge className="rounded-full bg-violet-500/15 text-violet-200 hover:bg-violet-500/15">
            Short Form Work
          </Badge>

          <h2 className="mt-5 text-4xl font-bold leading-[0.96] tracking-[-0.045em] md:text-6xl">
            Short-form edits built for attention.
          </h2>

          <p className="mt-6 text-lg leading-8 text-neutral-400">
            Vertical edits for reels, shorts, podcasts, ads, and social-first
            content. Videos play directly inside the page.
          </p>
        </SectionReveal>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-7 lg:grid-cols-2">
          {shortFormVideos.map((video, index) => (
            <InlineVideoCard key={video.id} video={video} index={index} />
          ))}
        </div>

        <SectionReveal className="mx-auto mt-28 max-w-3xl text-center">
          <Badge className="rounded-full bg-sky-500/15 text-sky-200 hover:bg-sky-500/15">
            Long Form Work
          </Badge>

          <h2 className="mt-5 text-4xl font-bold leading-[0.96] tracking-[-0.045em] md:text-6xl">
            Long-form edits with structure, pacing, and retention.
          </h2>

          <p className="mt-6 text-lg leading-8 text-neutral-400">
            Horizontal YouTube and long-form samples are separated from the
            shorts so the work is easier to review.
          </p>
        </SectionReveal>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-7 lg:grid-cols-2">
          {longFormVideos.map((video, index) => (
            <InlineVideoCard key={video.id} video={video} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}