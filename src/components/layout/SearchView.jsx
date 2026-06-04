import React from 'react';
import { motion } from 'framer-motion';
import { IconSearch, IconX } from '@tabler/icons-react';
import MovieCard from '../media/MovieCard';
import SeriesCard from '../media/SeriesCard';

const SearchView = ({ results, query, isSearching, onWatch, onToggleWatchlist, watchlist, onClear }) => {
  return (
    <motion.div
      key="search"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 min-h-screen px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto"
    >
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <IconSearch className="text-indigo-500" size={32} />
            {query}
          </h2>
          <p className="text-zinc-500 font-bold mt-2">Showing results for "{query}"</p>
        </div>
        <button 
          onClick={onClear}
          className="p-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-2xl transition-all border border-zinc-800 flex items-center gap-2"
        >
          <IconX size={20} />
          <span className="text-xs font-black uppercase tracking-widest">Clear Results</span>
        </button>
      </div>

      {isSearching ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {results.map((item) => (
            item.media_type === 'tv' || item.name ? (
              <SeriesCard 
                key={item.id} 
                series={item} 
                onClick={onWatch}
                onToggleWatchlist={onToggleWatchlist}
                isWatchlisted={watchlist.some(m => m.id === item.id)}
              />
            ) : (
              <MovieCard 
                key={item.id} 
                movie={item} 
                onClick={onWatch}
                onToggleWatchlist={onToggleWatchlist}
                isWatchlisted={watchlist.some(m => m.id === item.id)}
              />
            )
          ))}
        </div>
      ) : (
        <div className="text-center py-40">
          <h3 className="text-2xl font-black text-zinc-700">No results found for "{query}"</h3>
          <p className="text-zinc-500 mt-2">Try different keywords or browse our categories.</p>
        </div>
      )}
    </motion.div>
  );
};

export default SearchView;
