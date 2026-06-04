import React, { useEffect, useState } from 'react';
import BaseRow from '../common/BaseRow';
import MovieCard from './MovieCard';
import { fetcher, TMDB_ENDPOINT } from '../../utils/tmdbapi';

const MovieRow = ({ title, fetchUrl, onWatch, onToggleWatchlist, watchlist = [], onSearch }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetcher(`${TMDB_ENDPOINT}${fetchUrl}`);
        setMovies(data.results.filter(m => m.poster_path));
      } catch (error) {
        console.error('Error fetching movies for row:', error);
      }
    };
    fetchData();
  }, [fetchUrl]);

  return (
    <BaseRow title={title} onViewAll={() => onSearch && onSearch(title)}>
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          onClick={onWatch} 
          onToggleWatchlist={onToggleWatchlist}
          isWatchlisted={watchlist.some(m => m.id === movie.id)}
        />
      ))}
    </BaseRow>
  );
};

export default MovieRow;
