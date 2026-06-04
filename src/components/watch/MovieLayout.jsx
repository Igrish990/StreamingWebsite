import React from "react";
import Player from "../player/VideoPlayer";
import MediaMetadata from "./MediaMetadata";
import { RelatedLarge } from "../media/MediaRelated";
import {
  IconFlag,
  IconDownload,
  IconShare,
  IconChevronRight,
} from "@tabler/icons-react";

const MovieLayout = ({ details, recommendations }) => {
  return (
    <div className="space-y-12">
      {/* 1. Player Section */}
      <Player isMovie={true} id={details.id} title={details.title} />

      {/* 2. Title & Actions */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-3xl font-black text-white tracking-tight">
              {details.title}
            </h1>
            <span className="text-zinc-300 text-xs font-bold">
              {details.release_date}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <ActionButton icon={<IconFlag size={18} />} label="Report" />
            <ActionButton icon={<IconDownload size={18} />} label="Download" />
            <ActionButton icon={<IconShare size={18} />} label="Share" />
          </div>
        </div>
        <p className="text-zinc-500 text-sm leading-relaxed max-w-5xl">
          {details.overview}
        </p>
      </div>

      {/* 3. Metadata Card */}
      <MediaMetadata
        details={details}
        typeLabel="Movie"
        genres={details.genres}
      />

      {/* 4. Expanded Recommendations Grid */}
      <div className="w-full space-y-8">
        <h3 className="text-2xl font-black text-white flex items-center gap-4 uppercase tracking-tighter">
          <div className="w-1.5 h-8 bg-indigo-600 rounded-full"></div>
          Recommended Movies
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {recommendations.map((rec) => (
            <RelatedLarge key={rec.id} item={rec} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label }) => (
  <button
    onClick={() => alert(`${label} feature is coming soon!`)}
    className="flex items-center gap-2.5 px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-zinc-800 hover:border-zinc-700"
  >
    {icon} {label}
  </button>
);

export default MovieLayout;
