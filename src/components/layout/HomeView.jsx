import React from 'react';
import Hero from '../Hero';
import MovieRow from '../media/MovieRow';
import SeriesRow from '../media/SeriesRow';

const HomeView = ({ onWatch, onToggleWatchlist, watchlist, onSearch, onGenreClick }) => {
  return (
    <main>
      <Hero onWatch={onWatch} />
      
      <div className="relative z-10 -mt-10 sm:-mt-20 space-y-4">
        <MovieRow 
          title="Airing Now" 
          fetchUrl="/trending/movie/day" 
          onWatch={onWatch} 
          onToggleWatchlist={onToggleWatchlist}
          watchlist={watchlist}
          onSearch={onSearch}
        />
        <MovieRow 
          title="Cinematic Masterpieces" 
          fetchUrl="/movie/top_rated" 
          onWatch={onWatch} 
          onToggleWatchlist={onToggleWatchlist}
          watchlist={watchlist}
          onSearch={onSearch}
        />
        
        {/* Genre Bar */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
           <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-white flex items-center gap-3">
                 <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
                 Popular Genres
              </h3>
           </div>
           <div className="flex flex-wrap gap-3">
            {['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Animation', 'Documentary', 'Thriller'].map((genre) => (
              <button 
                key={genre} 
                onClick={() => onGenreClick(genre)}
                className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-white hover:border-indigo-600 hover:bg-indigo-600/10 transition-all active:scale-95 shadow-lg shadow-black/20"
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <SeriesRow 
          title="Binge-Worthy Series" 
          fetchUrl="/tv/popular" 
          onWatch={onWatch} 
          onToggleWatchlist={onToggleWatchlist}
          watchlist={watchlist}
          onSearch={onSearch}
        />
        <MovieRow 
          title="Action & Adventure" 
          fetchUrl="/discover/movie?with_genres=28,12" 
          onWatch={onWatch} 
          onToggleWatchlist={onToggleWatchlist}
          watchlist={watchlist}
          onSearch={onSearch}
        />
        <SeriesRow 
          title="Sci-Fi & Fantasy" 
          fetchUrl="/discover/tv?with_genres=10765" 
          onWatch={onWatch} 
          onToggleWatchlist={onToggleWatchlist}
          watchlist={watchlist}
          onSearch={onSearch}
        />
        <MovieRow 
          title="Comedy Hits" 
          fetchUrl="/discover/movie?with_genres=35" 
          onWatch={onWatch} 
          onToggleWatchlist={onToggleWatchlist}
          watchlist={watchlist}
          onSearch={onSearch}
        />
      </div>
    </main>
  );
};

export default HomeView;
