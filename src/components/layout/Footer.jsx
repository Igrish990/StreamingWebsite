import React from 'react';
import { IconBrandGithub, IconBrandTwitter, IconBrandLinkedin } from '@tabler/icons-react';

const Footer = ({ onSearch, onShowWatchlist }) => {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 py-20 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-2xl tracking-tighter">M</span>
            </div>
            <h2 className="text-white text-2xl font-black uppercase tracking-tight">Miruro<span className="text-indigo-500">.</span></h2>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-sm font-medium">
            Miruro is your ultimate destination for high-quality streaming. We provide a clean, ad-free experience for movie enthusiasts.
          </p>
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white hover:border-indigo-500 transition-all">
              <IconBrandGithub size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white hover:border-indigo-500 transition-all">
              <IconBrandTwitter size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white hover:border-indigo-500 transition-all">
              <IconBrandLinkedin size={20} />
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-white font-black text-sm uppercase tracking-widest mb-6">Explore</h3>
          <ul className="space-y-4 text-zinc-500 text-sm font-bold">
            <li onClick={() => onSearch('Movies')} className="hover:text-indigo-400 cursor-pointer transition-colors">Movies</li>
            <li onClick={() => onSearch('TV Series')} className="hover:text-indigo-400 cursor-pointer transition-colors">TV Series</li>
            <li className="hover:text-indigo-400 cursor-pointer transition-colors opacity-50 cursor-not-allowed">Schedule</li>
            <li onClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })} className="hover:text-indigo-400 cursor-pointer transition-colors">Genres</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-black text-sm uppercase tracking-widest mb-6">Account</h3>
          <ul className="space-y-4 text-zinc-500 text-sm font-bold">
            <li className="hover:text-indigo-400 cursor-pointer transition-colors opacity-50 cursor-not-allowed">Profile</li>
            <li onClick={() => onShowWatchlist()} className="hover:text-indigo-400 cursor-pointer transition-colors">Watchlist</li>
            <li className="hover:text-indigo-400 cursor-pointer transition-colors opacity-50 cursor-not-allowed">Settings</li>
            <li className="hover:text-indigo-400 cursor-pointer transition-colors opacity-50 cursor-not-allowed">Help</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-black text-sm uppercase tracking-widest mb-6">Support</h3>
          <p className="text-zinc-500 text-xs font-medium mb-4">Support our platform to keep it ad-free and fast.</p>
          <button 
            onClick={() => window.open('https://ko-fi.com', '_blank')}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            Donate ☕
          </button>
        </div>
      </div>
      
      <div className="max-w-[1600px] mx-auto mt-20 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-zinc-600 text-[10px] font-black uppercase tracking-widest">
        <span>© {new Date().getFullYear()} Miruro. All rights reserved.</span>
        <div className="flex gap-6">
          <span className="hover:text-zinc-400 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-zinc-400 cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
