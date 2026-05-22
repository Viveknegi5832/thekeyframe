export function getGoogleDriveFileId(url: string): string | null {
  if (!url) return null;

  const trimmedUrl = url.trim();

  // If the user directly pastes only the file ID
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

export function getGoogleDrivePreviewUrl(url: string): string {
  const fileId = getGoogleDriveFileId(url);

  if (!fileId) {
    return url;
  }

  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function getGoogleDriveViewUrl(url: string): string {
  const fileId = getGoogleDriveFileId(url);

  if (!fileId) {
    return url;
  }

  return `https://drive.google.com/file/d/${fileId}/view`;
}

export function getGoogleDriveThumbnailUrl(url: string): string {
  const fileId = getGoogleDriveFileId(url);

  if (!fileId) {
    return "";
  }

  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
}