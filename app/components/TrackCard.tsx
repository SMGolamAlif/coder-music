import { PlayIcon } from "@heroicons/react/24/solid";

type Track = {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  duration: string;
};

type TrackCardProps = {
  track: Track;
  onPlay: (track: Track) => void;
  isCurrentTrack?: boolean;
  isPlaying?: boolean;
};

export default function TrackCard({ 
  track, 
  onPlay, 
  isCurrentTrack = false, 
  isPlaying = false 
}: TrackCardProps) {
  return (
    <div className="group bg-gray-900 hover:bg-gray-800 rounded-lg p-4 transition-all duration-200 cursor-pointer relative">
      <div className="relative">
        <img
          src={track.thumbnail}
          alt={track.title}
          className="w-full aspect-square object-cover rounded-md mb-3"
        />
        
        {/* Play Button Overlay */}
        <button
          onClick={() => onPlay(track)}
          className={`absolute bottom-2 right-2 bg-green-500 hover:bg-green-400 rounded-full p-3 shadow-lg transition-all duration-200 ${
            isCurrentTrack && isPlaying
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
          }`}
        >
          <PlayIcon className="w-4 h-4 text-black" />
        </button>
      </div>
      
      <div>
        <h3 className="font-semibold text-white text-sm mb-1 line-clamp-2">
          {track.title}
        </h3>
        <p className="text-gray-400 text-xs">
          {track.channelTitle || "Coding Music"}
        </p>
      </div>
    </div>
  );
}
