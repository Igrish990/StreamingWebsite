import React from 'react';
import { motion } from 'framer-motion';
import { getImageUrl } from '../../utils/tmdbapi';
import { IconPlayerPlay, IconPlus, IconStar, IconCheck, IconDeviceTv } from '@tabler/icons-react';

const SeriesCard = ({ series, onClick, onToggleWatchlist, isWatchlisted }) => {
  return (
    <motion.div
      onClick={() => onClick(series)}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative flex-none w-44 sm:w-56 md:w-64 group cursor-pointer"
    >
      <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-lg shadow-black/50 border border-zinc-800">
        <img
          src={getImageUrl(series.poster_path)}
          alt={series.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
          <IconStar size={12} className="text-yellow-500" fill="currentColor" />
          <span className="text-white text-[10px] font-black">{series.vote_average?.toFixed(1)}</span>
        </div>

        <div className="absolute top-3 right-3 px-1.5 py-0.5 bg-indigo-600 text-white text-[8px] font-black rounded uppercase tracking-widest flex items-center gap-1">
          <IconDeviceTv size={10} />
          Series
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
          <div className="flex gap-3 mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClick(series);
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white text-black rounded-xl font-bold text-xs hover:bg-zinc-200 active:scale-95 transition-all"
            >
              <IconPlayerPlay size={16} fill="currentColor" />
              Stream
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (onToggleWatchlist) onToggleWatchlist(series);
              }}
              className={`p-2.5 backdrop-blur-md rounded-xl border border-white/10 active:scale-95 transition-all ${isWatchlisted ? 'bg-indigo-600 text-white' : 'bg-zinc-800/80 text-white hover:bg-zinc-700'}`}
            >
              {isWatchlisted ? <IconCheck size={18} /> : <IconPlus size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-1.5 px-1">
        <h3 className="text-zinc-200 text-sm font-bold line-clamp-1 group-hover:text-indigo-400 transition-colors">
          {series.name}
        </h3>
        <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
          <span className="text-indigo-500/80">{series.first_air_date?.split('-')[0] || '2024'}</span>
          <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
          <span>New Episodes</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SeriesCard;
