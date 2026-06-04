import React, { useEffect, useState } from 'react';
import { IconPlayerPlay, IconInfoCircle, IconStar, IconCalendar, IconClock, IconCategory } from '@tabler/icons-react';
import { getTrending, getImageUrl } from '../utils/tmdbapi';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = ({ onWatch }) => {
  const [movie, setMovie] = useState(null);
  const [index, setIndex] = useState(0);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchHeroMovie = async () => {
      try {
        const data = await getTrending('movie', 'day');
        setTrending(data.results.slice(0, 5));
        setMovie(data.results[0]);
      } catch (error) {
        console.error('Error fetching hero movie:', error);
      }
    };
    fetchHeroMovie();
  }, []);

  useEffect(() => {
    if (trending.length > 0) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % trending.length);
        setMovie(trending[(index + 1) % trending.length]);
      }, 8000);
      return () => clearInterval(timer);
    }
  }, [trending, index]);

  if (!movie) return <div className="h-[90vh] bg-zinc-950 animate-pulse" />;

  return (
    <div className="relative h-[85vh] sm:h-[90vh] w-full overflow-hidden bg-zinc-950">
      <AnimatePresence mode='wait'>
        <motion.div
          key={movie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <img
            src={getImageUrl(movie.backdrop_path, 'original')}
            alt={movie.title}
            className="w-full h-full object-cover object-top scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-end pb-20 sm:pb-32">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl space-y-6"
        >
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-black rounded tracking-widest uppercase">TV</span>
            <div className="flex items-center gap-1.5 text-zinc-300 text-xs font-semibold">
              <IconCalendar size={14} className="text-indigo-500" />
              {movie.release_date?.split('-')[0] || '2024'}
            </div>
            <div className="flex items-center gap-1.5 text-zinc-300 text-xs font-semibold">
              <IconStar size={14} className="text-yellow-500" fill="currentColor" />
              {movie.vote_average?.toFixed(1)}
            </div>
            <div className="flex items-center gap-1.5 text-zinc-300 text-xs font-semibold">
              <IconClock size={14} className="text-indigo-500" />
              24 mins
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl">
            {movie.title || movie.name}
          </h1>
          
          <p className="text-zinc-300 text-sm sm:text-base lg:text-lg line-clamp-3 max-w-xl font-medium leading-relaxed drop-shadow-md opacity-90">
            {movie.overview}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button 
              onClick={() => onWatch(movie)}
              className="flex items-center gap-2.5 px-8 py-3.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-600/20"
            >
              <IconPlayerPlay size={20} fill="currentColor" />
              Watch Now
            </button>
            <button 
              onClick={() => onWatch(movie)}
              className="flex items-center gap-2.5 px-8 py-3.5 bg-zinc-800/80 text-white rounded-xl font-bold backdrop-blur-md hover:bg-zinc-700/80 hover:scale-105 active:scale-95 transition-all border border-zinc-700/50"
            >
              <IconInfoCircle size={20} />
              Details
            </button>
          </div>
        </motion.div>

        {/* Carousel Indicators */}
        <div className="absolute right-6 bottom-10 hidden sm:flex items-center gap-3">
          {trending.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIndex(i);
                setMovie(trending[i]);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${index === i ? 'w-10 bg-indigo-500' : 'w-2 bg-zinc-700'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
