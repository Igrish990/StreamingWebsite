import React, { useState, useEffect } from "react";
import {
  IconServer,
  IconChevronDown,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { getExternalIds, getEpisodeExternalIds } from "../../utils/tmdbapi";

const SERVERS = [
  {
    id: "embedmaster",
    name: "EmbedMaster (Default)",
    url: (type, id, s, e) =>
      `https://embedmaster.link/${type}/${id}${type === "tv" ? `/${s}/${e}` : ""}?autoplay=1`,
  },
  {
    id: "vidsrc",
    name: "Vidsrc (Backup)",
    url: (type, id, s, e) =>
      `https://vidsrc.to/embed/${type}/${id}${type === "tv" ? `/${s}/${e}` : ""}?autoplay=1`,
  },
  {
    id: "vidsrcme",
    name: "Vidsrc.me",
    url: (type, id, s, e) =>
      `https://vidsrc.me/embed/${type}/${id}${type === "tv" ? `/${s}/${e}` : ""}?autoplay=1`,
  },
  {
    id: "embedsu",
    name: "Embed.su",
    url: (type, id, s, e) =>
      `https://embed.su/embed/${type}/${id}${type === "tv" ? `/${s}/${e}` : ""}?autoplay=1`,
  },
];

const VideoPlayer = ({
  isMovie,
  id,
  selectedSeason = 1,
  selectedEp = 1,
  title,
}) => {
  const [currentServer, setCurrentServer] = useState(SERVERS[0]);
  const [showServerList, setShowServerList] = useState(false);
  const [imdbId, setImdbId] = useState(null);
  const [showUI, setShowUI] = useState(true);

  const type = isMovie ? "movie" : "tv";
  const src = currentServer.url(type, id, selectedSeason, selectedEp);

  useEffect(() => {
    const fetchImdbId = async () => {
      try {
        const data = isMovie
          ? await getExternalIds("movie", id)
          : await getEpisodeExternalIds(id, selectedSeason, selectedEp);
        setImdbId(data.imdb_id);
      } catch (err) {
        console.error("Failed to fetch IMDB ID:", err);
      }
    };
    fetchImdbId();
    // Auto-hide UI after a short delay
    const timer = setTimeout(() => setShowUI(false), 3000);
    return () => clearTimeout(timer);
  }, [id, selectedSeason, selectedEp, isMovie]);

  const handleExternalPlay = () => {
    if (!imdbId) return alert("IMDB ID not found yet. Please wait a moment.");
    window.location.href = `plugin://plugin.video.a4kstreaming?action=play&id=${imdbId}`;
  };

  return (
    <div className="space-y-4">
      {/* Container matching user structure */}
      <div
        className="relative aspect-video w-full select-none overflow-hidden rounded-3xl bg-black shadow-2xl shadow-indigo-500/10 border border-zinc-900 group"
        onMouseMove={() => {
          setShowUI(true);
        }}
        onMouseLeave={() => {
          setShowUI(false);
        }}
      >
        {/* The Player Element - Always visible for instant autoplay */}
        <iframe
          id="video-element"
          src={src}
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope"
          title={title}
        ></iframe>

        {/* UI Overlay */}
        <div className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-500 ${showUI ? "opacity-100" : "opacity-0"} pointer-events-none`}>
          {/* Top Bar Section */}
          <div className="absolute top-0 w-full p-6 sm:p-10 z-20 flex justify-between items-start">
            <div className="space-y-1 drop-shadow-2xl">
              <h2 className="text-white font-black text-lg sm:text-2xl tracking-tight">{title}</h2>
              {!isMovie && (
                <p className="text-zinc-400 text-xs sm:text-sm font-bold tracking-widest uppercase">
                  Season {selectedSeason} <span className="mx-2 text-zinc-700">|</span> Episode {selectedEp}
                </p>
              )}
            </div>

            {/* Top Right Actions - Only this div allows clicks */}
            <div className="flex items-center gap-3 pointer-events-auto">
               {imdbId && (
                <button 
                  onClick={handleExternalPlay}
                  className="p-3 bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/30 text-white rounded-2xl backdrop-blur-md transition-all active:scale-95 shadow-lg shadow-indigo-600/20"
                >
                  <IconPlayerPlay size={20} fill="currentColor" />
                </button>
               )}
               <div className="relative">
                  <button 
                    onClick={() => setShowServerList(!showServerList)}
                    className="p-3 bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 rounded-2xl backdrop-blur-md text-white transition-all shadow-xl"
                  >
                    <IconServer size={20} className="text-indigo-500" />
                  </button>
                  {showServerList && (
                    <div className="absolute right-0 mt-4 w-48 bg-zinc-950/90 border border-zinc-800 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
                      {SERVERS.map((server) => (
                        <button
                          key={server.id}
                          onClick={() => { setCurrentServer(server); setShowServerList(false); }}
                          className={`w-full px-5 py-4 text-left text-[11px] font-black uppercase tracking-widest transition-colors border-b border-zinc-900 last:border-0 ${
                            currentServer.id === server.id ? "bg-indigo-600 text-white" : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                          }`}
                        >
                          {server.name}
                        </button>
                      ))}
                    </div>
                  )}
               </div>
            </div>
          </div>

          {/* Bottom Bar Section */}
          <div className="absolute bottom-0 w-full p-6 sm:p-10 z-20 flex items-center justify-between">
             {/* Only the indicator container allows clicks to avoid blocking the whole bottom player bar */}
             <div className="flex items-center gap-3 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/5 pointer-events-auto">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 drop-shadow-md">
                  {currentServer.name}
                </span>
             </div>
          </div>
        </div>
      </div>

      {/* Backdrop glow */}
      <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-[90%] h-40 bg-indigo-600/5 blur-[120px] pointer-events-none rounded-full" />
    </div>
  );
};

export default VideoPlayer;
