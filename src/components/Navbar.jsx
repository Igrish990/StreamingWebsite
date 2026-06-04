import React, { useState, useEffect } from 'react';
import { IconSearch, IconBell, IconUser, IconMenu2, IconX, IconDice, IconLayoutGrid } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onSearch, onSurpriseMe, onShowWatchlist }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${isScrolled ? 'bg-zinc-950/80 backdrop-blur-xl py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => {
          if (onSearch) onSearch('');
          setIsMobileMenuOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white font-black text-2xl tracking-tighter">M</span>
          </div>
          <span className="hidden sm:block text-white font-bold text-xl tracking-tight uppercase">Miruro<span className="text-indigo-500">.</span></span>
        </div>

        {/* Center Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl hidden md:flex relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-indigo-500 transition-colors">
            <IconSearch size={18} />
          </div>
          <input 
            type="text"
            placeholder="Search Movies, TV Shows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:border-indigo-500 focus:bg-zinc-900 transition-all text-sm"
          />
          <div className="absolute inset-y-0 right-3 flex items-center gap-2">
            <kbd className="hidden lg:flex px-1.5 py-0.5 rounded border border-zinc-700 text-[10px] text-zinc-500 font-sans">⌘ K</kbd>
          </div>
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden lg:flex items-center gap-4 mr-2">
            <button 
              onClick={() => onShowWatchlist()}
              title="Browse Categories"
              className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-800"
            >
              <IconLayoutGrid size={22} />
            </button>
            <button 
              onClick={onSurpriseMe}
              title="Surprise Me!"
              className="text-indigo-400 hover:text-indigo-300 transition-colors p-2 rounded-full hover:bg-indigo-500/10 border border-indigo-500/20"
            >
              <IconDice size={22} />
            </button>
          </div>
          
          <button className="md:hidden text-zinc-400 p-2">
            <IconSearch size={22} />
          </button>
          
          <button 
             onClick={() => onShowWatchlist()}
             className="text-zinc-400 hover:text-white relative p-2 rounded-full hover:bg-zinc-800"
          >
            <IconBell size={22} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-zinc-950"></span>
          </button>
          
          <button 
            className="lg:hidden text-zinc-400 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <IconX size={26} /> : <IconMenu2 size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full w-full bg-zinc-950 border-b border-zinc-800 shadow-2xl"
          >
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Navigation</p>
                <div className="grid grid-cols-2 gap-4">
                  <a href="#" onClick={(e) => { e.preventDefault(); onSearch(''); setIsMobileMenuOpen(false); }} className="text-zinc-300 hover:text-white text-base font-medium py-2">Home</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); onSearch('TV Series'); setIsMobileMenuOpen(false); }} className="text-zinc-300 hover:text-white text-base font-medium py-2">TV Shows</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); onSearch('Movies'); setIsMobileMenuOpen(false); }} className="text-zinc-300 hover:text-white text-base font-medium py-2">Movies</a>
                  <a href="#" className="text-zinc-300 hover:text-white text-base font-medium py-2">New</a>
                  <a href="#" className="text-zinc-300 hover:text-white text-base font-medium py-2">Popular</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); onShowWatchlist(); setIsMobileMenuOpen(false); }} className="text-zinc-300 hover:text-white text-base font-medium py-2">My List</a>
                </div>
              </div>
              <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
                <div className="flex gap-4">
                  <IconLayoutGrid className="text-zinc-400" onClick={() => { onShowWatchlist(); setIsMobileMenuOpen(false); }} />
                  <IconDice className="text-zinc-400" onClick={() => { onSurpriseMe(); setIsMobileMenuOpen(false); }} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-zinc-400 text-sm">Guest</span>
                  <div className="w-8 h-8 rounded-full bg-indigo-600"></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
