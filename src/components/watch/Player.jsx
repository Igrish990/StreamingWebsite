import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconVolume,
  IconVolume2,
  IconVolume3,
  IconVolumeOff,
  IconMaximize,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
  IconSettings,
  IconChevronRight,
} from "@tabler/icons-react";

const Player = ({ isMovie, id, selectedSeason = 1, selectedEp = 1, title }) => {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const controlsTimeout = useRef(null);

  const src = isMovie
    ? `https://embedmaster.link/movie/${id}?autoplay=1`
    : `https://embedmaster.link/tv/${id}/${selectedSeason}/${selectedEp}?autoplay=1`;

  // Communication with PlayerJS
  const sendCommand = useCallback((method, value = null) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          context: "player.js",
          method: method,
          value: value,
        }),
        "*",
      );
    }
  }, []);

  useEffect(() => {
    const handleMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.context !== "player.js") return;

        switch (data.event) {
          case "ready":
            sendCommand("getDuration");
            sendCommand("getVolume");
            break;
          case "play":
            setIsPlaying(true);
            break;
          case "pause":
            setIsPlaying(false);
            break;
          case "timeupdate":
            setCurrentTime(data.value.seconds);
            setDuration(data.value.duration);
            break;
          case "progress":
            // Can be used for loading bar
            break;
          default:
            break;
        }
      } catch (e) {
        // Not a JSON message or not from our player
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [sendCommand]);

  const togglePlay = () => {
    if (isPlaying) {
      sendCommand("pause");
    } else {
      sendCommand("play");
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    sendCommand("setCurrentTime", pos * duration);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    sendCommand("setVolume", val);
    if (val > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    sendCommand("setVolume", nextMute ? 0 : volume);
  };

  const handleFullScreen = () => {
    if (iframeRef.current) {
      if (!document.fullscreenElement) {
        // Try to request fullscreen on the iframe
        if (iframeRef.current.requestFullscreen) {
          iframeRef.current.requestFullscreen().catch((err) => {
            console.error("Fullscreen request failed:", err);
            // Fallback to container fullscreen
            containerRef.current?.requestFullscreen?.();
          });
        } else {
          // Fallback to container fullscreen
          containerRef.current?.requestFullscreen?.();
        }
      } else {
        document.exitFullscreen?.();
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Auto-hide controls
  useEffect(() => {
    if (isHovering) {
      setShowControls(true);
      if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
      controlsTimeout.current = setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 3000);
    } else {
      if (isPlaying) setShowControls(false);
    }
  }, [isHovering, isPlaying]);

  // Auto-play on mount
  useEffect(() => {
    const autoplayTimer = setTimeout(() => {
      togglePlay();
    }, 1000);
    return () => clearTimeout(autoplayTimer);
  }, [togglePlay]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={() => {
        setIsHovering(true);
        setShowControls(true);
      }}
      className="w-full bg-black relative aspect-video overflow-hidden rounded-2xl shadow-2xl border border-zinc-900 group select-none"
    >
      {/* Iframe with Clipping to hide native UI */}
      <div className="absolute inset-0 w-full h-full pointer-events-none scale-[1.01]">
        <iframe
          ref={iframeRef}
          src={src}
          className="absolute inset-0 w-full h-[108%] -top-[4%] border-0"
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture"
          title={title}
        ></iframe>
      </div>

      {/* Interaction Layer */}
      <div
        onClick={togglePlay}
        className="absolute inset-0 z-10 cursor-pointer"
      />

      {/* Custom Controls Overlay */}
      <div
        className={`absolute inset-0 z-20 transition-opacity duration-500 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none ${showControls ? "opacity-100" : "opacity-0"}`}
      >
        <div className="p-4 sm:p-8 space-y-4 pointer-events-auto">
          {/* Progress Bar */}
          <div
            className="relative h-1.5 w-full bg-zinc-800 rounded-full cursor-pointer group/progress"
            onClick={(e) => {
              e.stopPropagation();
              handleSeek(e);
            }}
          >
            <div
              className="absolute h-full bg-indigo-600 rounded-full flex items-center justify-end"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            >
              <div className="w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover/progress:scale-100 transition-transform translate-x-1/2" />
            </div>
          </div>

          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="text-white hover:text-indigo-500 transition-colors transform active:scale-90"
              >
                {isPlaying ? (
                  <IconPlayerPause size={32} fill="currentColor" />
                ) : (
                  <IconPlayerPlay size={32} fill="currentColor" />
                )}
              </button>

              <div className="hidden sm:flex items-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sendCommand("setCurrentTime", currentTime - 10);
                  }}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <IconPlayerSkipBack size={20} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sendCommand("setCurrentTime", currentTime + 10);
                  }}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <IconPlayerSkipForward size={20} />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <IconVolumeOff size={24} />
                  ) : volume < 0.5 ? (
                    <IconVolume2 size={24} />
                  ) : (
                    <IconVolume size={24} />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  onClick={(e) => e.stopPropagation()}
                  className="w-20 sm:w-24 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div className="text-zinc-300 text-xs sm:text-sm font-black tabular-nums">
                {formatTime(currentTime)}{" "}
                <span className="text-zinc-600 mx-1">/</span>{" "}
                {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={(e) => e.stopPropagation()}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <IconSettings size={22} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFullScreen();
                }}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <IconMaximize size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Center Play Button (Large) */}
      {!isPlaying && !isHovering && (
        <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none">
          <div className="w-20 h-20 bg-indigo-600/20 backdrop-blur-md rounded-full flex items-center justify-center border border-indigo-500/30 animate-pulse">
            <IconPlayerPlay
              size={40}
              className="text-indigo-500 translate-x-1"
              fill="currentColor"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
