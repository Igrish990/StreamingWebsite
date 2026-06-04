import React, { useRef, useState } from "react";
import Player from "../player/VideoPlayer";
import MediaMetadata from "./MediaMetadata";
import { RelatedSmall } from "../media/MediaRelated";
import {
  IconFlag,
  IconDownload,
  IconShare,
  IconBolt,
  IconChevronRight,
  IconChevronLeft,
  IconBookmark,
  IconEye,
  IconLayoutGrid,
} from "@tabler/icons-react";
import { getImageUrl } from "../../utils/tmdbapi";

const SeriesLayout = ({
  details,
  recommendations,
  episodes,
  selectedSeason,
  onSelectSeason,
  selectedEp,
  onSelectEp,
  currentEpisode,
}) => {
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? rowRef.current.scrollLeft - clientWidth
          : rowRef.current.scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-12">
      {/* 1. Player Area */}
      <div className="space-y-6">
        <Player
          isMovie={false}
          id={details.id}
          selectedSeason={selectedSeason}
          selectedEp={selectedEp}
          title={details.name}
        />

        {/* Episode Selector - Netflix Style */}
        <div className="bg-zinc-900/30 rounded-3xl border border-zinc-900 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <select
                value={selectedSeason}
                onChange={(e) => onSelectSeason(Number(e.target.value))}
                className="bg-zinc-950 text-white font-black text-lg py-2 px-4 rounded-xl border border-zinc-800 focus:outline-none focus:border-indigo-600"
              >
                {details.seasons
                  ?.filter((s) => s.season_number > 0)
                  .map((s) => (
                    <option key={s.id} value={s.season_number}>
                      Season {s.season_number}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
              >
                <IconChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
              >
                <IconChevronRight size={20} />
              </button>
            </div>
          </div>

          <div
            ref={rowRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-2"
          >
            {episodes.map((ep) => (
              <div
                key={ep.id}
                onClick={() => onSelectEp(ep.episode_number)}
                className={`flex-none w-72 group cursor-pointer space-y-3 transition-all ${selectedEp === ep.episode_number ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden border-2 transition-all group-hover:border-white/20 shadow-xl shadow-black/40">
                  <img
                    src={getImageUrl(ep.still_path, "w500")}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    alt={ep.name}
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[10px] font-black text-white">
                    E{ep.episode_number}
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 bg-black/60 backdrop-blur-md rounded-lg text-white hover:text-indigo-400">
                      <IconBookmark size={14} />
                    </button>
                    <button className="p-1.5 bg-black/60 backdrop-blur-md rounded-lg text-white hover:text-indigo-400">
                      <IconEye size={14} />
                    </button>
                  </div>
                  {selectedEp === ep.episode_number && (
                    <div className="absolute inset-0 bg-indigo-600/20 border-2 border-indigo-600 rounded-2xl" />
                  )}
                </div>
                <div className="space-y-1">
                  <h4
                    className={`text-sm font-black line-clamp-1 ${selectedEp === ep.episode_number ? "text-indigo-400" : "text-zinc-200"}`}
                  >
                    {ep.name}
                  </h4>
                  <p className="text-zinc-500 text-[10px] font-bold line-clamp-2 leading-relaxed">
                    {ep.overview ||
                      "No description available for this episode."}
                  </p>
                  <button className="text-indigo-500 text-[9px] font-black uppercase tracking-widest hover:text-indigo-400">
                    Show more
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Metadata & Related Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-9 space-y-12">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-3xl font-black text-white tracking-tight">
                  {details.name}
                </h2>
                <div className="flex items-center gap-4">
                  <span className="text-zinc-500 text-sm font-bold">
                    {details.first_air_date?.split("-")[0]} •{" "}
                    {details.number_of_seasons} Seasons
                  </span>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 bg-zinc-900 text-zinc-400 text-[9px] font-black rounded uppercase tracking-widest border border-zinc-800">
                      TV-MA
                    </span>
                    <span className="px-2 py-0.5 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 text-[9px] font-black rounded uppercase flex items-center gap-1">
                      <IconBolt size={10} fill="currentColor" /> P-STREAM
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ActionButton icon={<IconFlag size={18} />} label="Report" />
                <ActionButton
                  icon={<IconDownload size={18} />}
                  label="Download"
                />
                <ActionButton icon={<IconShare size={18} />} label="Share" />
              </div>
            </div>
          </div>

          <MediaMetadata
            details={details}
            typeLabel="TV"
            genres={details.genres}
          />

          {/* Simple Comments Placeholder */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-tighter">
              <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
              Comments
            </h3>
            <div className="bg-zinc-900/20 rounded-3xl border border-zinc-900 h-32 flex items-center justify-center text-zinc-600 font-bold italic text-sm">
              Join the conversation...
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
          <h3 className="text-lg font-black text-white flex items-center gap-3 uppercase tracking-tighter border-l-4 border-indigo-600 pl-4">
            Recommendations
          </h3>
          <div className="space-y-4">
            {recommendations.slice(0, 8).map((rec) => (
              <RelatedSmall key={rec.id} item={rec} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label }) => (
  <button
    onClick={() => alert(`${label} feature is coming soon!`)}
    className="flex items-center gap-2.5 px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-zinc-800 hover:border-zinc-700"
  >
    {icon} {label}
  </button>
);

export default SeriesLayout;
