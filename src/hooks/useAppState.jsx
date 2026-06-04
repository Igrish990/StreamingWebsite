import { useState, useEffect } from 'react';
import { fetcher, TMDB_ENDPOINT, getTrending } from '../utils/tmdbapi';

export const useAppState = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('miruro_watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('miruro_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWatch = (movie) => {
    setSelectedMovie(movie);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => setSelectedMovie(null);

  const toggleWatchlist = (movie) => {
    setWatchlist(prev => {
      const exists = prev.find(m => m.id === movie.id);
      if (exists) return prev.filter(m => m.id !== movie.id);
      return [...prev, movie];
    });
  };

  const showWatchlist = () => {
    setSearchResults(watchlist);
    setSearchQuery('My Watchlist');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults(null);
      setSearchQuery('');
      return;
    }
    
    setIsSearching(true);
    setSearchQuery(query);
    try {
      const data = await fetcher(`${TMDB_ENDPOINT}/search/multi`, { query });
      setSearchResults(data.results.filter(item => item.media_type !== 'person'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSurpriseMe = async () => {
    try {
      const data = await getTrending('all', 'week');
      const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
      handleWatch(randomMovie);
    } catch (error) {
      console.error('Surprise me error:', error);
    }
  };

  const handleGenreClick = async (genreName) => {
    const genreMap = {
      'Action': 28, 'Comedy': 35, 'Drama': 18, 'Fantasy': 14, 'Horror': 27,
      'Mystery': 9648, 'Romance': 10749, 'Sci-Fi': 878, 'Thriller': 53,
      'Animation': 16, 'Documentary': 99
    };

    const genreId = genreMap[genreName];
    if (!genreId) return;

    setIsSearching(true);
    setSearchQuery(genreName);
    try {
      const data = await fetcher(`${TMDB_ENDPOINT}/discover/movie`, { with_genres: genreId });
      setSearchResults(data.results);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Genre fetch error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return {
    selectedMovie,
    showScrollTop,
    searchResults,
    isSearching,
    searchQuery,
    watchlist,
    handleWatch,
    handleBack,
    handleSearch,
    handleSurpriseMe,
    showWatchlist,
    toggleWatchlist,
    handleGenreClick,
    setSearchResults
  };
};
