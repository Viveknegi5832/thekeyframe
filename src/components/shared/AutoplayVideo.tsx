import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import type { EnrichedPortfolioVideo } from "@/data/videos";

type AutoplayVideoProps = {
  video: EnrichedPortfolioVideo;
  className?: string;
};

export function AutoplayVideo({ video, className = "" }: AutoplayVideoProps) {
  const nativeVideoRef = useRef<HTMLVideoElement | null>(null);
  const youtubeFrameRef = useRef<HTMLIFrameElement | null>(null);
  const progressBarRef = useRef<HTMLSpanElement | null>(null);
  const youtubeDurationRef = useRef(0);
  const [muted, setMuted] = useState(true);
  const [nativeFailed, setNativeFailed] = useState(false);

  const updateProgress = useCallback(
    (currentTime: number, duration: number, startTime = 0) => {
      if (!progressBarRef.current || !Number.isFinite(duration) || duration <= startTime) {
        return;
      }

      const progress = Math.min(
        1,
        Math.max(0, (currentTime - startTime) / (duration - startTime)),
      );
      progressBarRef.current.style.transform = `scaleX(${progress})`;
    },
    [],
  );

  const sendYouTubeCommand = (command: string) => {
    youtubeFrameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: command, args: [] }),
      "*",
    );
  };

  const changeMutedState = (nextMuted: boolean) => {
    setMuted(nextMuted);

    if (nativeVideoRef.current) {
      nativeVideoRef.current.muted = nextMuted;
      void nativeVideoRef.current.play().catch(() => undefined);
    }

    sendYouTubeCommand(nextMuted ? "mute" : "unMute");
  };

  const startNativePlayback = () => {
    const nativeVideo = nativeVideoRef.current;
    if (!nativeVideo) return;

    nativeVideo.defaultMuted = true;
    nativeVideo.muted = muted;
    void nativeVideo.play().catch(() => undefined);
  };

  useEffect(() => {
    const nativeVideo = nativeVideoRef.current;
    if (!nativeVideo) return;

    nativeVideo.defaultMuted = true;
    nativeVideo.muted = true;

    const resumePlayback = () => {
      if (!document.hidden) {
        void nativeVideo.play().catch(() => undefined);
      }
    };

    resumePlayback();
    document.addEventListener("visibilitychange", resumePlayback);
    window.addEventListener("pageshow", resumePlayback);
    return () => {
      document.removeEventListener("visibilitychange", resumePlayback);
      window.removeEventListener("pageshow", resumePlayback);
    };
  }, [video.previewUrl]);

  useEffect(() => {
    if (video.videoPlatform !== "youtube") return;

    const youtubeStartTime = Number(
      new URL(video.previewUrl).searchParams.get("start") ?? 0,
    );

    const requestProgress = () => {
      const player = youtubeFrameRef.current?.contentWindow;
      if (!player) return;

      player.postMessage(
        JSON.stringify({
          event: "listening",
          id: video.id,
          channel: "thekeyframe",
        }),
        "*",
      );

      for (const command of ["getDuration", "getCurrentTime"]) {
        player.postMessage(
          JSON.stringify({ event: "command", func: command, args: [] }),
          "*",
        );
      }
    };

    const receiveProgress = (event: MessageEvent) => {
      if (event.source !== youtubeFrameRef.current?.contentWindow) return;

      try {
        const message =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        const info = message?.info;
        if (!info) return;

        if (Number.isFinite(info.duration) && info.duration > 0) {
          youtubeDurationRef.current = info.duration;
        }

        if (Number.isFinite(info.currentTime)) {
          updateProgress(
            info.currentTime,
            youtubeDurationRef.current,
            youtubeStartTime,
          );
        }
      } catch {
        // Ignore unrelated window messages that are not JSON player events.
      }
    };

    window.addEventListener("message", receiveProgress);
    const progressTimer = window.setInterval(requestProgress, 500);
    requestProgress();

    return () => {
      window.removeEventListener("message", receiveProgress);
      window.clearInterval(progressTimer);
    };
  }, [updateProgress, video.id, video.previewUrl, video.videoPlatform]);

  return (
    <div className={`relative h-full w-full overflow-hidden bg-black ${className}`}>
      {video.videoPlatform === "google-drive" ? (
        nativeFailed ? (
          <img
            src={video.thumbnailUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            ref={nativeVideoRef}
            src={video.previewUrl}
            poster={video.thumbnailUrl}
            autoPlay
            muted={muted}
            loop
            playsInline
            preload="auto"
            onLoadedData={startNativePlayback}
            onCanPlay={startNativePlayback}
            onDurationChange={(event) =>
              updateProgress(event.currentTarget.currentTime, event.currentTarget.duration)
            }
            onTimeUpdate={(event) =>
              updateProgress(event.currentTarget.currentTime, event.currentTarget.duration)
            }
            onError={() => setNativeFailed(true)}
            className="h-full w-full object-cover"
          />
        )
      ) : (
        <iframe
          ref={youtubeFrameRef}
          src={video.previewUrl}
          title={`${video.title} muted preview`}
          allow="autoplay; encrypted-media; picture-in-picture"
          tabIndex={-1}
          onLoad={() => {
            sendYouTubeCommand("playVideo");
            sendYouTubeCommand(muted ? "mute" : "unMute");
          }}
          className="pointer-events-none h-full w-full border-0 bg-black"
        />
      )}

      <button
        type="button"
        onClick={() => changeMutedState(!muted)}
        aria-label={muted ? `Turn sound on for ${video.title}` : `Mute ${video.title}`}
        aria-pressed={!muted}
        title={muted ? "Turn sound on" : "Mute video"}
        className="absolute right-2.5 top-2.5 z-20 grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-black/65 text-white/70 shadow-lg backdrop-blur-md transition hover:scale-105 hover:border-white/35 hover:text-white sm:right-3 sm:top-3"
      >
        {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
      </button>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[2px] bg-white/15"
      >
        <span
          ref={progressBarRef}
          data-video-progress={video.id}
          className="block h-full w-full origin-left scale-x-0 bg-[#f06a4f] shadow-[0_0_8px_rgba(240,106,79,0.65)] transition-transform duration-200 ease-linear"
        />
      </span>
    </div>
  );
}
