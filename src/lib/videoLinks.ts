type VideoPlatform = "google-drive" | "youtube" | "unknown";

function getGoogleDriveFileId(url: string): string | null {
  if (!url) return null;

  const trimmedUrl = url.trim();

  if (/^[a-zA-Z0-9_-]{20,}$/.test(trimmedUrl)) {
    return trimmedUrl;
  }

  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/,
    /\/d\/([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = trimmedUrl.match(pattern);

    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
}

function getYouTubeData(url: string): { id: string; start: number } | null {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);
    let id = "";

    if (parsedUrl.hostname.includes("youtube.com")) {
      id = parsedUrl.searchParams.get("v") || "";
    }

    if (parsedUrl.hostname.includes("youtu.be")) {
      id = parsedUrl.pathname.replace("/", "");
    }

    if (!id) return null;

    const timeParam = parsedUrl.searchParams.get("t");
    const startParam = parsedUrl.searchParams.get("start");

    let start = 0;

    if (startParam) {
      start = Number(startParam);
    } else if (timeParam) {
      start = parseYouTubeTime(timeParam);
    }

    return {
      id,
      start: Number.isNaN(start) ? 0 : start,
    };
  } catch {
    return null;
  }
}

function parseYouTubeTime(time: string): number {
  if (/^\d+$/.test(time)) {
    return Number(time);
  }

  const hours = time.match(/(\d+)h/)?.[1];
  const minutes = time.match(/(\d+)m/)?.[1];
  const seconds = time.match(/(\d+)s/)?.[1];

  return (
    Number(hours || 0) * 3600 +
    Number(minutes || 0) * 60 +
    Number(seconds || 0)
  );
}

export function getVideoPlatform(url: string): VideoPlatform {
  if (getGoogleDriveFileId(url)) return "google-drive";
  if (getYouTubeData(url)) return "youtube";

  return "unknown";
}

export function getVideoEmbedUrl(url: string, autoplay = false): string {
  const driveFileId = getGoogleDriveFileId(url);

  if (driveFileId) {
    // Google Drive previews do not reliably support forced mute.
    // So we intentionally do NOT autoplay Drive videos.
    return `https://drive.google.com/file/d/${driveFileId}/preview`;
  }

  const youtubeData = getYouTubeData(url);

  if (youtubeData) {
    const params = new URLSearchParams();

    if (youtubeData.start > 0) {
      params.set("start", String(youtubeData.start));
    }

    if (autoplay) {
      params.set("autoplay", "1");
      params.set("mute", "1");
      params.set("playsinline", "1");
    }

    params.set("rel", "0");
    params.set("modestbranding", "1");

    const queryString = params.toString();

    return `https://www.youtube.com/embed/${youtubeData.id}${
      queryString ? `?${queryString}` : ""
    }`;
  }

  return url;
}

export function getVideoThumbnailUrl(url: string): string {
  const driveFileId = getGoogleDriveFileId(url);

  if (driveFileId) {
    return `https://drive.google.com/thumbnail?id=${driveFileId}&sz=w1000`;
  }

  const youtubeData = getYouTubeData(url);

  if (youtubeData) {
    return `https://img.youtube.com/vi/${youtubeData.id}/hqdefault.jpg`;
  }

  return "";
}
export function getVideoViewUrl(url: string): string {
  const driveFileId = getGoogleDriveFileId(url);

  if (driveFileId) {
    return `https://drive.google.com/file/d/${driveFileId}/view`;
  }

  return url;
}