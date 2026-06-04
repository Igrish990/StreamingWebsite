import React from 'react';
import { IconStar, IconPlus } from '@tabler/icons-react';
import { getImageUrl } from '../../utils/tmdbapi';

const MediaMetadata = ({ details, typeLabel, genres }) => {
  return (
    <div className="bg-zinc-900/30 rounded-[2.5rem] border border-zinc-900 p-8 sm:p-10 relative overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-12 relative z-10">
        <div className="flex-none w-48 mx-auto lg:mx-0 space-y-6">
          <div className="aspect-[2/3] rounded-[2rem] overflow-hidden shadow-2xl border border-zinc-800 ring-4 ring-zinc-900/50">
            <img src={getImageUrl(details.poster_path)} className="w-full h-full object-cover" alt={details.title || details.name} />
          </div>
          <button className="w-full py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
            Trailer <IconPlus size={16} className="inline ml-1" />
          </button>
        </div>

        <div className="flex-1 space-y-8">
          <div>
            <h2 className="text-3xl font-black text-white leading-tight uppercase tracking-tighter">
              {details.title || details.name}
            </h2>
            <p className="text-zinc-500 text-xs font-bold mt-1 opacity-60 italic">{details.original_title || details.original_name}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {genres.map(g => (
                <span key={g.id} className="px-4 py-1.5 bg-orange-600/10 border border-orange-600/20 text-orange-500 text-[9px] font-black rounded-lg uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all cursor-pointer">
                  {g.name}
                </span>
              ))}
            </div>
          </div>
          
          <p className="text-zinc-400 text-sm leading-relaxed max-w-4xl opacity-90">{details.overview}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-16 pt-8 border-t border-zinc-900">
            <SpecRow label="Format" value={typeLabel} />
            {typeLabel === 'TV' && <SpecRow label="Season" value="Spring" />}
            <SpecRow label="Status" value={details.status} />
            <SpecRow label="Release Date" value={details.release_date || details.first_air_date} />
            {typeLabel === 'TV' && <SpecRow label="Episodes" value={`${details.number_of_episodes}`} />}
            <SpecRow label="Country" value={details.origin_country?.[0] || 'JP'} />
            <SpecRow label="Rating" value={`${(details.vote_average * 10).toFixed(0)} / 100`} />
            <SpecRow label="Adult" value={details.adult ? 'Yes' : 'No'} />
            <SpecRow label="Duration" value={`${details.runtime || details.episode_run_time?.[0] || '24'} min`} />
            <SpecRow label="Studios" value={details.production_companies?.[0]?.name || 'N/A'} />
          </div>
        </div>
      </div>
    </div>
  );
};

const SpecRow = ({ label, value }) => (
  <div className="flex items-center justify-between gap-4">
    <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{label}:</span>
    <span className="text-zinc-200 text-xs font-black text-right line-clamp-1">{value || 'N/A'}</span>
  </div>
);

export default MediaMetadata;
