import React from 'react';
import { IconLayoutGrid, IconDeviceTv, IconSearch } from '@tabler/icons-react';
import { getImageUrl } from '../../utils/tmdbapi';

const EpisodeSidebar = ({ episodes, selectedEp, onSelectEp }) => {
  return (
    <div className="lg:col-span-3 space-y-6">
      <div className="bg-zinc-900/50 rounded-2xl border border-zinc-900 flex flex-col h-[600px]">
        <div className="p-4 border-b border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800 text-[10px] font-black text-white">1 - {episodes.length}</div>
            <div className="flex gap-2">
               <IconLayoutGrid size={18} className="text-zinc-600" />
               <IconDeviceTv size={18} className="text-indigo-500" />
            </div>
          </div>
          <div className="relative">
            <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
            <input type="text" placeholder="Filter episodes..." className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-9 pr-3 text-[10px] text-white focus:outline-none focus:border-indigo-600" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
          {episodes.map((ep) => (
            <button 
              key={ep.id}
              onClick={() => onSelectEp(ep.episode_number)}
              className={`w-full flex gap-3 p-2 rounded-xl transition-all border ${selectedEp === ep.episode_number ? 'bg-indigo-600/10 border-indigo-500/30' : 'hover:bg-zinc-800/50 border-transparent'}`}
            >
              <div className="relative flex-none w-28 aspect-video rounded-lg overflow-hidden bg-zinc-800">
                <img src={getImageUrl(ep.still_path)} className="w-full h-full object-cover" alt={ep.name} />
                <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/80 rounded text-[8px] font-black text-white">EP {ep.episode_number}</div>
              </div>
              <div className="flex-1 text-left flex flex-col justify-center gap-0.5">
                <h4 className={`text-[10px] font-black line-clamp-1 ${selectedEp === ep.episode_number ? 'text-indigo-400' : 'text-zinc-200'}`}>{ep.name}</h4>
                <div className="flex items-center gap-2">
                   <span className="text-[8px] font-bold text-zinc-500">{ep.air_date?.split('-')[0] || '2024'}</span>
                   <span className="text-[8px] font-bold text-zinc-600 uppercase">Sub</span>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="p-3 bg-indigo-600 text-center text-white text-[10px] font-black rounded-b-2xl">
           🔔 NEXT EPISODE IN 6D 8H
        </div>
      </div>
    </div>
  );
};

export default EpisodeSidebar;
