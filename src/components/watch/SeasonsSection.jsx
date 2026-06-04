import React from 'react';
import { IconLayoutGrid } from '@tabler/icons-react';

const SeasonsSection = ({ name, seasons }) => {
  return (
    <div className="space-y-8">
      <h3 className="text-xl font-black text-white flex items-center gap-4 uppercase tracking-tighter">
        <IconLayoutGrid className="text-indigo-600" size={24} />
        Seasons
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
         <SeasonCard title="Season 1" sub={name} />
         {seasons?.length > 1 && (
            <SeasonCard title="Season 2" sub={`${name} Season 2`} active />
         )}
      </div>
    </div>
  );
};

const SeasonCard = ({ title, sub, active }) => (
  <div className={`group relative aspect-[21/9] rounded-[2rem] overflow-hidden border-2 cursor-pointer transition-all ${active ? 'border-indigo-600 ring-4 ring-indigo-600/10' : 'border-zinc-900 hover:border-zinc-800'}`}>
     <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
     <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-0" />
     <div className="relative z-20 h-full flex flex-col justify-center p-8">
        <h4 className="text-2xl font-black text-white tracking-tighter">{title}</h4>
        <p className="text-zinc-400 text-[10px] font-bold mt-1 uppercase tracking-widest opacity-60">{sub}</p>
     </div>
  </div>
);

export default SeasonsSection;
