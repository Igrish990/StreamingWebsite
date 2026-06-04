import { useState, useEffect, useCallback } from 'react';

export const usePlayerJS = (iframeRef) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const sendCommand = useCallback((method, value = null) => {
    if (!iframeRef.current?.contentWindow) return;

    // Standard contexts
    ['player.js', 'playerjs'].forEach(context => {
      const msg = JSON.stringify({
        context: context,
        method: method,
        value: value
      });
      iframeRef.current.contentWindow.postMessage(msg, '*');
    });
  }, [iframeRef]);

  const play = useCallback(() => {
    setIsPlaying(true);
    sendCommand('play');
  }, [sendCommand]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    sendCommand('pause');
  }, [sendCommand]);

  const seek = useCallback((time) => {
    setCurrentTime(time);
    sendCommand('setCurrentTime', time);
  }, [sendCommand]);

  const setPlayerVolume = useCallback((val) => {
    setVolume(val);
    setIsMuted(val === 0);
    sendCommand('setVolume', val);
  }, [sendCommand]);

  useEffect(() => {
    const handleMessage = (event) => {
      let data;
      try {
        data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
      } catch (e) { return; }
      
      if (!data) return;

      // Handle both 'event' and 'method' keys as some players use 'method' for outgoing messages
      const eventName = data.event || data.method;
      const eventValue = data.value || data.data;

      switch (eventName) {
        case 'ready':
        case 'onReady':
          sendCommand('getDuration');
          sendCommand('getVolume');
          // Try to autoplay after a short delay
          setTimeout(() => sendCommand('play'), 1000);
          break;
        case 'play':
        case 'onPlay':
          setIsPlaying(true);
          break;
        case 'pause':
        case 'onPause':
          setIsPlaying(false);
          break;
        case 'timeupdate':
        case 'onTimeUpdate':
          if (eventValue) {
            const current = typeof eventValue === 'number' ? eventValue : (eventValue.seconds || eventValue.currentTime || 0);
            const total = eventValue.duration || duration;
            setCurrentTime(current);
            if (total > 0) setDuration(total);
          }
          break;
        case 'volumechange':
        case 'onVolumeChange':
          if (typeof eventValue === 'number') {
            setVolume(eventValue);
            setIsMuted(eventValue === 0);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [sendCommand]);

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    play,
    pause,
    seek,
    setVolume: setPlayerVolume
  };
};
