import React, { useEffect, useState, useRef } from 'react';
import MovieCard from './MovieCard';
import { fetcher, TMDB_ENDPOINT } from '../utils/tmdbapi';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

const MovieRow = ({ title, fetchUrl, onWatch, onToggleWatchlist, watchlist = [], onSearch }) => {
  const [movies, setMovies] = useState([]);
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetcher(`${TMDB_ENDPOINT}${fetchUrl}`);
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies for row:', error);
      }
    };
    fetchData();
  }, [fetchUrl]);

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
      const scrollTo = direction === 'left' ? rowRef.current.scrollLeft - clientWidth : rowRef.current.scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6 py-10 relative group/row">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-3">
          <span className="w-1 h-8 bg-indigo-600 rounded-full"></span>
          {title}
        </h2>
        <button 
          onClick={() => onSearch && onSearch(title)}
          className="text-zinc-500 hover:text-indigo-400 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-1"
        >
          View All <IconChevronRight size={14} />
        </button>
      </div>

      <div className="relative overflow-hidden">
        {/* Navigation Arrows */}
        {showLeftArrow && (
          <button
            className="absolute left-0 top-0 bottom-14 z-20 w-16 bg-gradient-to-r from-zinc-950 to-transparent flex items-center justify-start pl-4 text-white opacity-0 group-hover/row:opacity-100 transition-opacity"
            onClick={() => scroll('left')}
          >
            <div className="w-12 h-12 bg-zinc-900/80 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 shadow-xl hover:bg-indigo-600 transition-colors">
              <IconChevronLeft size={24} />
            </div>
          </button>
        )}
        
        {showRightArrow && (
          <button
            className="absolute right-0 top-0 bottom-14 z-20 w-16 bg-gradient-to-l from-zinc-950 to-transparent flex items-center justify-end pr-4 text-white opacity-0 group-hover/row:opacity-100 transition-opacity"
            onClick={() => scroll('right')}
          >
            <div className="w-12 h-12 bg-zinc-900/80 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 shadow-xl hover:bg-indigo-600 transition-colors">
              <IconChevronRight size={24} />
            </div>
          </button>
        )}

        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-12 pb-4 pt-2"
        >
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onClick={onWatch} 
              onToggleWatchlist={onToggleWatchlist}
              isWatchlisted={watchlist.some(m => m.id === movie.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
