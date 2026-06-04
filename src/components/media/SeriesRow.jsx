import React, { useEffect, useState } from 'react';
import BaseRow from '../common/BaseRow';
import SeriesCard from './SeriesCard';
import { fetcher, TMDB_ENDPOINT } from '../../utils/tmdbapi';

const SeriesRow = ({ title, fetchUrl, onWatch, onToggleWatchlist, watchlist = [], onSearch }) => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetcher(`${TMDB_ENDPOINT}${fetchUrl}`);
        setSeries(data.results.filter(s => s.poster_path));
      } catch (error) {
        console.error('Error fetching series for row:', error);
      }
    };
    fetchData();
  }, [fetchUrl]);

  return (
    <BaseRow title={title} onViewAll={() => onSearch && onSearch(title)}>
      {series.map((s) => (
        <SeriesCard 
          key={s.id} 
          series={s} 
          onClick={onWatch} 
          onToggleWatchlist={onToggleWatchlist}
          isWatchlisted={watchlist.some(m => m.id === s.id)}
        />
      ))}
    </BaseRow>
  );
};

export default SeriesRow;
