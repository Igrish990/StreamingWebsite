import React from 'react';
import { 
  IconPlayerPlay, 
  IconPlayerPause, 
  IconVolume, 
  IconVolume2,
  IconVolumeOff,
  IconMaximize, 
  IconPlayerSkipBack,
  IconPlayerSkipForward,
  IconSettings
} from '@tabler/icons-react';
import ProgressBar from './ProgressBar';

const ControlBar = ({ 
  isPlaying, 
  currentTime, 
  duration, 
  volume, 
  isMuted, 
  onTogglePlay, 
  onSeek, 
  onToggleMute, 
  onVolumeChange, 
  onToggleFullScreen,
  onToggleServerList,
  formatTime 
}) => {
  return (
    <div className="p-4 sm:p-8 space-y-4 pointer-events-auto">
      <ProgressBar currentTime={currentTime} duration={duration} onSeek={onSeek} />

      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            onClick={(e) => { e.stopPropagation(); onTogglePlay(); }}
            className="text-white hover:text-indigo-500 transition-colors transform active:scale-90"
          >
            {isPlaying ? <IconPlayerPause size={32} fill="currentColor" /> : <IconPlayerPlay size={32} fill="currentColor" />}
          </button>

          <div className="hidden sm:flex items-center gap-4">
             <button onClick={(e) => { e.stopPropagation(); onSeek(currentTime - 10); }} className="text-zinc-400 hover:text-white transition-colors">
                <IconPlayerSkipBack size={20} />
             </button>
             <button onClick={(e) => { e.stopPropagation(); onSeek(currentTime + 10); }} className="text-zinc-400 hover:text-white transition-colors">
                <IconPlayerSkipForward size={20} />
             </button>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={(e) => { e.stopPropagation(); onToggleMute(); }}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              {isMuted || volume === 0 ? <IconVolumeOff size={24} /> : volume < 0.5 ? <IconVolume2 size={24} /> : <IconVolume size={24} />}
            </button>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              onClick={(e) => e.stopPropagation()}
              className="w-20 sm:w-24 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="text-zinc-300 text-xs sm:text-sm font-black tabular-nums">
            {formatTime(currentTime)} <span className="text-zinc-600 mx-1">/</span> {formatTime(duration)}
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
           <button 
             onClick={(e) => { e.stopPropagation(); onToggleServerList(); }} 
             className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
             title="Switch Server"
           >
              <IconSettings size={22} />
              <span className="hidden lg:inline text-[10px] font-black uppercase tracking-widest">Server</span>
           </button>
           <button 
            onClick={(e) => { e.stopPropagation(); onToggleFullScreen(); }}
            className="text-zinc-400 hover:text-white transition-colors"
           >
              <IconMaximize size={22} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;
