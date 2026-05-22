import {
  getVideoEmbedUrl,
  getVideoPlatform,
  getVideoThumbnailUrl,
  getVideoViewUrl,
} from "../lib/videoLinks";

export type VideoCategory =
  | "All"
  | "Short-form"
  | "Podcast"
  | "YouTube"
  | "Ads"
  | "Brand";

export type VideoAspectRatio = "portrait" | "landscape" | "square";
export type VideoFormat = "short" | "long";

const rawPortfolioVideos = [
  // 1st reel
{
  id: 2,
  title: "Podcast Clip Edit",
  category: "Podcast",
  format: "short",
  platform: "LinkedIn / YouTube Shorts",
  aspectRatio: "portrait",
  description:
    "A clean podcast clip edit with subtitles, jump cuts, improved pacing, and social-first formatting.",
  tools: ["Premiere Pro", "Descript", "Sound Design"],
  rawVideoUrl:
    "https://drive.google.com/file/d/13oq6dZ8KePFVexfC10IEUIc7g58eBC8r/view?usp=sharing",
},

// 2nd reel
{
  id: 3,
  title: "Creator Talking-Head Edit",
  category: "Short-form",
  format: "short",
  platform: "YouTube Shorts / Social",
  aspectRatio: "portrait",
  description:
    "A talking-head edit with tighter pacing, captions, visual emphasis, and smooth retention-focused cuts.",
  tools: ["Premiere Pro", "After Effects"],
  rawVideoUrl:
    "https://drive.google.com/file/d/1NRVK4MRmvYs4qeJvxLf8m28QyVqz8ziA/view?usp=sharing",
},

// 3rd reel
{
  id: 5,
  title: "Brand Social Video",
  category: "Brand",
  format: "short",
  platform: "Instagram / Brand Content",
  aspectRatio: "portrait",
  description:
    "A polished brand-facing edit with clean pacing, smooth transitions, captions, and premium visual flow.",
  tools: ["Premiere Pro", "After Effects"],
  rawVideoUrl:
    "https://drive.google.com/file/d/14NJIVcLh8TACnhe9hzgrb_xHeQkM6Afz/view?usp=sharing",
},

// 4th reel
{
  id: 6,
  title: "Short Form Edit Sample",
  category: "Short-form",
  format: "short",
  platform: "Instagram Reels / YouTube Shorts",
  aspectRatio: "portrait",
  description:
    "A vertical short-form edit built for fast hooks, clean pacing, captions, and social-first viewing.",
  tools: ["Premiere Pro", "After Effects", "Captions"],
  rawVideoUrl:
    "https://drive.google.com/file/d/1AS1lRA2kJfoTWR3g9zwsfcYMRWzE4IHa/view?usp=sharing",
},

// 5th reel
{
  id: 4,
  title: "Performance Ad Creative",
  category: "Ads",
  format: "short",
  platform: "Meta Ads / Paid Social",
  aspectRatio: "portrait",
  description:
    "A direct-response style edit built around clarity, speed, product storytelling, and attention-grabbing pacing.",
  tools: ["Premiere Pro", "Motion Graphics"],
  rawVideoUrl:
    "https://drive.google.com/file/d/1l8NiFnKBuZqJ-lC3lvSkDcRaFYKhmCKR/view?usp=sharing",
},

// 6th reel / last
{
  id: 1,
  title: "High-Retention Short Form Edit",
  category: "Short-form",
  format: "short",
  platform: "Instagram Reels / YouTube Shorts",
  aspectRatio: "portrait",
  description:
    "A fast-paced short-form edit focused on hooks, captions, punchy cuts, zooms, and sound design.",
  tools: ["Premiere Pro", "After Effects", "Captions"],
  rawVideoUrl:
    "https://drive.google.com/file/d/1tIXE3jzKl8NGpY6ooEBOxCd3Yugaa3as/view?usp=sharing",
},

  {
  id: 7,
  title: "Long-Form Video Edit 01",
  category: "YouTube",
  format: "long",
  platform: "YouTube Long Form",
  aspectRatio: "landscape",
  description:
    "A horizontal long-form edit focused on structure, pacing, cleanup, and maintaining viewer attention.",
  tools: ["Premiere Pro", "After Effects", "Sound Design"],
  rawVideoUrl: "https://youtu.be/_qJz6Ot_qhA",
},
  {
    id: 8,
    title: "Long-Form YouTube Edit 02",
    category: "YouTube",
    format: "long",
    platform: "YouTube",
    aspectRatio: "landscape",
    description:
      "A YouTube edit sample with long-form pacing, story structure, and clean visual flow.",
    tools: ["Premiere Pro", "YouTube", "Story Edit"],
    rawVideoUrl: "https://www.youtube.com/watch?v=yDzkY2oSO50&t=48s",
  },
  {
    id: 9,
    title: "Long-Form YouTube Edit 03",
    category: "YouTube",
    format: "long",
    platform: "YouTube",
    aspectRatio: "landscape",
    description:
      "A horizontal YouTube video sample showcasing pacing, sequence structure, and viewer retention.",
    tools: ["Premiere Pro", "YouTube", "Long Form"],
    rawVideoUrl: "https://www.youtube.com/watch?v=_w_bx4vVP0E&t=51s",
  },
  {
    id: 10,
    title: "Long-Form YouTube Edit 04",
    category: "YouTube",
    format: "long",
    platform: "YouTube",
    aspectRatio: "landscape",
    description:
      "A long-form YouTube sample starting from a selected timestamp, useful for showing editing flow and structure.",
    tools: ["Premiere Pro", "YouTube", "Long Form"],
    rawVideoUrl: "https://youtu.be/K8hkr3zWNB0?t=1868",
  },
] as const;

export const portfolioVideos = rawPortfolioVideos.map((video) => ({
  ...video,
  videoPlatform: getVideoPlatform(video.rawVideoUrl),
  videoUrl: getVideoEmbedUrl(video.rawVideoUrl),
  viewUrl: getVideoViewUrl(video.rawVideoUrl),
  thumbnailUrl: getVideoThumbnailUrl(video.rawVideoUrl),
}));

export const shortFormVideos = portfolioVideos.filter(
  (video) => video.format === "short",
);

export const longFormVideos = portfolioVideos.filter(
  (video) => video.format === "long",
);

export const categories: VideoCategory[] = [
  "All",
  "Short-form",
  "Podcast",
  "YouTube",
  "Ads",
  "Brand",
];