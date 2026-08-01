import {
  getVideoEmbedUrl,
  getVideoPlatform,
  getVideoThumbnailUrl,
  getVideoViewUrl,
} from "../lib/videoLinks";

export type VideoFormat = "short" | "long";
export type VideoStatus = "live" | "placeholder";

export type PortfolioVideo = {
  id: string;
  title: string;
  category: string;
  format: VideoFormat;
  platform: string;
  description: string;
  tools: string[];
  rawVideoUrl: string;
  status: VideoStatus;
  projectNumber: string;
};

const rawPortfolioVideos: PortfolioVideo[] = [
  {
    id: "short-01",
    projectNumber: "S—01",
    title: "High-Retention Social Cut",
    category: "Short-form",
    format: "short",
    platform: "Reels / Shorts",
    description:
      "Fast hooks, punchy captions, visual emphasis, and sound design shaped for a social-first watch.",
    tools: ["Premiere Pro", "After Effects", "Sound Design"],
    rawVideoUrl:
      "https://drive.google.com/file/d/1tIXE3jzKl8NGpY6ooEBOxCd3Yugaa3as/view?usp=sharing",
    status: "live",
  },
  {
    id: "short-02",
    projectNumber: "S—02",
    title: "Podcast Clip Edit",
    category: "Podcast",
    format: "short",
    platform: "LinkedIn / Shorts",
    description:
      "A conversation cut into a focused, caption-led story with cleaner pacing and social framing.",
    tools: ["Premiere Pro", "Captions", "Sound Design"],
    rawVideoUrl:
      "https://drive.google.com/file/d/13oq6dZ8KePFVexfC10IEUIc7g58eBC8r/view?usp=sharing",
    status: "live",
  },
  {
    id: "short-03",
    projectNumber: "S—03",
    title: "Creator Talking Head",
    category: "Creator",
    format: "short",
    platform: "Shorts / Social",
    description:
      "A direct-to-camera edit with visual momentum, clean captions, and natural retention-focused cuts.",
    tools: ["Premiere Pro", "After Effects"],
    rawVideoUrl:
      "https://drive.google.com/file/d/1NRVK4MRmvYs4qeJvxLf8m28QyVqz8ziA/view?usp=sharing",
    status: "live",
  },
  {
    id: "short-04",
    projectNumber: "S—04",
    title: "Brand Social Film",
    category: "Brand",
    format: "short",
    platform: "Instagram",
    description:
      "Premium pacing, smooth transitions, and a restrained visual finish for brand-led social content.",
    tools: ["Premiere Pro", "After Effects"],
    rawVideoUrl:
      "https://drive.google.com/file/d/14NJIVcLh8TACnhe9hzgrb_xHeQkM6Afz/view?usp=sharing",
    status: "live",
  },
  {
    id: "short-05",
    projectNumber: "S—05",
    title: "Performance Ad Creative",
    category: "Paid social",
    format: "short",
    platform: "Meta Ads",
    description:
      "A clear, product-forward cut built around speed, attention, and a direct-response rhythm.",
    tools: ["Premiere Pro", "Motion Graphics"],
    rawVideoUrl:
      "https://drive.google.com/file/d/1l8NiFnKBuZqJ-lC3lvSkDcRaFYKhmCKR/view?usp=sharing",
    status: "live",
  },
  {
    id: "long-01",
    projectNumber: "L—01",
    title: "Long-Form Story Edit",
    category: "YouTube",
    format: "long",
    platform: "YouTube",
    description:
      "A long-form edit focused on story structure, clean pacing, and visual support that keeps the narrative moving.",
    tools: ["Premiere Pro", "After Effects", "Sound Design"],
    rawVideoUrl: "https://youtu.be/_qJz6Ot_qhA",
    status: "live",
  },
  {
    id: "long-02",
    projectNumber: "L—02",
    title: "YouTube Retention Edit",
    category: "YouTube",
    format: "long",
    platform: "YouTube",
    description:
      "A personality-led YouTube cut shaped around clarity, chapter flow, and a comfortable viewing rhythm.",
    tools: ["Premiere Pro", "Story Edit", "B-roll"],
    rawVideoUrl: "https://www.youtube.com/watch?v=yDzkY2oSO50&t=48s",
    status: "live",
  },
  {
    id: "long-03",
    projectNumber: "L—03",
    title: "Narrative YouTube Cut",
    category: "YouTube",
    format: "long",
    platform: "YouTube",
    description:
      "A horizontal edit balancing dialogue, visual variety, and structure for a smoother long-form watch.",
    tools: ["Premiere Pro", "YouTube", "Long Form"],
    rawVideoUrl: "https://www.youtube.com/watch?v=_w_bx4vVP0E&t=51s",
    status: "live",
  },
  {
    id: "long-04",
    projectNumber: "L—04",
    title: "Extended YouTube Feature",
    category: "YouTube",
    format: "long",
    platform: "YouTube",
    description:
      "An extended sequence demonstrating patient pacing, continuity, and long-form editorial structure.",
    tools: ["Premiere Pro", "Story Edit", "Sound Design"],
    rawVideoUrl: "https://youtu.be/K8hkr3zWNB0?t=1868",
    status: "live",
  },
  ...Array.from({ length: 8 }, (_, index): PortfolioVideo => {
    const slot = index + 5;

    return {
      id: `long-${String(slot).padStart(2, "0")}`,
      projectNumber: `L—${String(slot).padStart(2, "0")}`,
      title: `Long-form case study ${String(slot).padStart(2, "0")}`,
      category: "Upcoming",
      format: "long",
      platform: "YouTube",
      description:
        "Reserved for an upcoming long-form edit. Artwork, project notes, and the final film will be added here.",
      tools: ["New work incoming"],
      rawVideoUrl: "",
      status: "placeholder",
    };
  }),
];

export const portfolioVideos = rawPortfolioVideos.map((video) => ({
  ...video,
  videoPlatform: getVideoPlatform(video.rawVideoUrl),
  videoUrl: getVideoEmbedUrl(video.rawVideoUrl),
  viewUrl: getVideoViewUrl(video.rawVideoUrl),
  thumbnailUrl: getVideoThumbnailUrl(video.rawVideoUrl),
}));

export type EnrichedPortfolioVideo = (typeof portfolioVideos)[number];

export const shortFormVideos = portfolioVideos.filter(
  (video) => video.format === "short",
);

export const longFormVideos = portfolioVideos.filter(
  (video) => video.format === "long",
);
