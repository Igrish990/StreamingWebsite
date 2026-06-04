import React from 'react';
import { IconStar, IconCalendar } from '@tabler/icons-react';
import { getImageUrl } from '../../utils/tmdbapi';

const RelatedItemSmall = ({ item }) => (
  <div className="flex gap-4 group cursor-pointer hover:bg-zinc-900/40 p-2 rounded-2xl transition-all border border-transparent hover:border-zinc-800">
    <div className="relative flex-none w-20 aspect-[2/3] rounded-xl overflow-hidden shadow-lg">
      <img src={getImageUrl(item.poster_path)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title || item.name} />
    </div>
    <div className="flex flex-col justify-center gap-2">
      <h4 className="text-white text-[11px] font-black leading-tight group-hover:text-indigo-400 transition-colors line-clamp-2 uppercase tracking-tighter">
        {item.title || item.name}
      </h4>
      <div className="flex items-center gap-3 text-[9px] text-zinc-500 font-black uppercase tracking-widest">
        <span className="text-indigo-500">{item.media_type === 'tv' ? 'TV' : 'Movie'}</span>
        <span className="flex items-center gap-1"><IconStar size={10} fill="currentColor" className="text-yellow-500" /> {item.vote_average?.toFixed(1)}</span>
      </div>
    </div>
  </div>
);

const RelatedItemLarge = ({ item }) => (
  <div className="flex flex-col gap-3 group cursor-pointer">
    <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-xl border border-zinc-900 group-hover:border-indigo-600 transition-all group-hover:scale-[1.02]">
      <img src={getImageUrl(item.poster_path)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title || item.name} />
      <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[9px] font-black text-white flex items-center gap-1">
         <IconStar size={10} fill="currentColor" className="text-yellow-500" /> {item.vote_average?.toFixed(1)}
      </div>
    </div>
    <div className="px-1 space-y-1">
       <h4 className="text-zinc-200 text-xs font-black line-clamp-1 group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{item.title || item.name}</h4>
       <div className="flex items-center gap-2 text-[9px] font-black text-zinc-500 uppercase tracking-widest">
          <span className="text-indigo-500">{item.release_date?.split('-')[0] || '2024'}</span>
          <span>{item.media_type === 'tv' ? 'TV' : 'Movie'}</span>
       </div>
    </div>
  </div>
);

export { RelatedItemSmall, RelatedItemLarge };
