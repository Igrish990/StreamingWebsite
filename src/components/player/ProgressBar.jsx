import React from 'react';

const ProgressBar = ({ currentTime, duration, onSeek }) => {
  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    onSeek(pos * duration);
  };

  return (
    <div 
      className="relative h-1.5 w-full bg-zinc-800 rounded-full cursor-pointer group/progress pointer-events-auto"
      onClick={(e) => { e.stopPropagation(); handleSeek(e); }}
    >
      <div 
        className="absolute h-full bg-indigo-600 rounded-full flex items-center justify-end"
        style={{ width: `${(currentTime / duration) * 100}%` }}
      >
        <div className="w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover/progress:scale-100 transition-transform translate-x-1/2" />
      </div>
    </div>
  );
};

export default ProgressBar;
