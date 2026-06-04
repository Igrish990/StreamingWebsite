import React, { Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconChevronUp } from '@tabler/icons-react';

import Navbar from './components/Navbar';
import Footer from './components/layout/Footer';
import { useAppState } from './hooks/useAppState';

// Lazy load views for better performance
const WatchView = lazy(() => import('./components/WatchView'));
const HomeView = lazy(() => import('./components/layout/HomeView'));
const SearchView = lazy(() => import('./components/layout/SearchView'));

// Simple loading fallback
const LoadingFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const {
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
  } = useAppState();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-indigo-600 selection:text-white custom-scrollbar">
      <Navbar onSearch={handleSearch} onSurpriseMe={handleSurpriseMe} onShowWatchlist={showWatchlist} />
      
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <AnimatePresence mode='wait'>
            {selectedMovie ? (
              <motion.div
                key="watch"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <WatchView movie={selectedMovie} onBack={handleBack} />
              </motion.div>
            ) : searchResults ? (
              <SearchView 
                key="search"
                results={searchResults}
                query={searchQuery}
                isSearching={isSearching}
                onWatch={handleWatch}
                onToggleWatchlist={toggleWatchlist}
                watchlist={watchlist}
                onClear={() => setSearchResults(null)}
              />
            ) : (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <HomeView 
                  onWatch={handleWatch}
                  onToggleWatchlist={toggleWatchlist}
                  watchlist={watchlist}
                  onSearch={handleSearch}
                  onGenreClick={handleGenreClick}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Suspense>
      </main>

      <Footer onSearch={handleSearch} onShowWatchlist={showWatchlist} />

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 bg-indigo-600 text-white rounded-2xl shadow-2xl shadow-indigo-600/40 hover:bg-indigo-700 transition-all active:scale-90"
          >
            <IconChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
