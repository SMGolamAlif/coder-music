import { useState, useRef, useEffect } from "react";
import YouTube from "react-youtube";
import { 
  PlayIcon, 
  PauseIcon, 
  ForwardIcon, 
  BackwardIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon 
} from "@heroicons/react/24/solid";

type Track = {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  duration: string;
};

type PlayerProps = {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  playlist: Track[];
};

export default function Player({ 
  currentTrack, 
  isPlaying, 
  onPlayPause, 
  onNext, 
  onPrevious 
}: PlayerProps) {
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<any>(null);

  const onReady = (event: any) => {
    playerRef.current = event.target;
    setDuration(event.target.getDuration());
    if (isPlaying) {
      event.target.playVideo();
    } else {
      event.target.pauseVideo();
    }
  };

  const onStateChange = (event: any) => {
    if (event.data === 1) { // playing
      const interval = setInterval(() => {
        if (playerRef.current) {
          setCurrentTime(playerRef.current.getCurrentTime());
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  };

  // Handle play/pause when isPlaying prop changes
  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying]);

  // Handle when currentTrack changes
  useEffect(() => {
    if (playerRef.current && currentTrack && isPlaying) {
      // Small delay to ensure the new video is loaded
      setTimeout(() => {
        if (playerRef.current) {
          playerRef.current.playVideo();
        }
      }, 500);
    }
  }, [currentTrack]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.setVolume(volume);
      } else {
        playerRef.current.setVolume(0);
      }
    }
  };

  if (!currentTrack) {
    return null;
  }

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 0, // Don't autoplay, we'll control it manually
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-3">
      <YouTube
        videoId={currentTrack.id}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
        className="hidden"
      />
      
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Track Info */}
        <div className="flex items-center space-x-4 w-1/4">
          <img
            src={currentTrack.thumbnail}
            alt={currentTrack.title}
            className="w-14 h-14 rounded-md object-cover"
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {currentTrack.title}
            </p>
            <p className="text-xs text-gray-400">Coding Music</p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center w-1/2">
          <div className="flex items-center space-x-4 mb-2">
            <button
              onClick={onPrevious}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <BackwardIcon className="w-5 h-5" />
            </button>
            
            <button
              onClick={onPlayPause}
              className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <PauseIcon className="w-5 h-5" />
              ) : (
                <PlayIcon className="w-5 h-5" />
              )}
            </button>
            
            <button
              onClick={onNext}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ForwardIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full max-w-md">
            <span className="text-xs text-gray-400 w-10">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 bg-gray-600 rounded-full h-1">
              <div
                className="bg-white h-1 rounded-full transition-all"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center space-x-2 w-1/4 justify-end">
          <button
            onClick={toggleMute}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isMuted || volume === 0 ? (
              <SpeakerXMarkIcon className="w-5 h-5" />
            ) : (
              <SpeakerWaveIcon className="w-5 h-5" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>
    </div>
  );
}
