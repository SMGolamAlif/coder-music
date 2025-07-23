'use client';

import { useState } from 'react';
import { Search as SearchIcon, Play, Clock } from 'lucide-react';
import { useMusic } from '../../contexts/MusicContext';
import ErrorMessage from '../../components/ErrorMessage';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { playTrack } = useMusic();

  const searchMusic = async (searchQuery) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Search failed');
      }
      
      setResults(data.items || []);
    } catch (error) {
      console.error('Search error:', error);
      setError(error.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchMusic(query);
  };

  const handlePlayTrack = (track) => {
    const trackData = {
      id: track.id.videoId,
      title: track.snippet.title,
      artist: track.snippet.channelTitle,
      thumbnail: track.snippet.thumbnails.medium?.url || track.snippet.thumbnails.default?.url,
      url: `https://www.youtube.com/watch?v=${track.id.videoId}`,
    };
    playTrack(trackData, [trackData], 0);
  };

  const formatDuration = (duration) => {
    // YouTube API duration format: PT4M13S
    const match = duration?.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '0:00';
    
    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const popularQueries = [
    'lofi hip hop coding',
    'synthwave programming',
    'ambient coding music',
    'jazz for focus',
    'electronic study music',
    'deep house coding',
  ];

  return (
    <div className="p-8 bg-gradient-to-b from-gray-900 to-black min-h-full">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-6">Search</h1>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative max-w-lg">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search for songs, artists, or albums..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-gray-800 text-white pl-12 pr-4 py-4 rounded-full border border-gray-700 focus:border-blue-500 focus:outline-none text-base"
          />
        </form>
      </div>

      {/* Popular Searches */}
      {!results.length && !loading && !error && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-6">Popular for Coding</h2>
          <div className="flex flex-wrap gap-3">
            {popularQueries.map((query) => (
              <button
                key={query}
                onClick={() => {
                  setQuery(query);
                  searchMusic(query);
                }}
                className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-full text-sm transition-colors font-medium"
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error */}
      {error && (
        <ErrorMessage
          title="Search Error"
          message={error}
          onRetry={() => searchMusic(query)}
        />
      )}

      {/* Search Results */}
      {results.length > 0 && !loading && !error && (
        <div>
          <h2 className="text-xl font-semibold mb-6">Search Results</h2>
          <div className="space-y-3">
            {results.map((track, index) => (
              <div
                key={track.id.videoId || index}
                className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-800 transition-colors group cursor-pointer"
                onClick={() => handlePlayTrack(track)}
              >
                {/* Play Button */}
                <div className="relative">
                  <img
                    src={track.snippet.thumbnails.medium?.url || track.snippet.thumbnails.default?.url}
                    alt={track.snippet.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <button className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="h-6 w-6 text-white ml-0.5" />
                  </button>
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium truncate text-base">
                    {track.snippet.title}
                  </h3>
                  <p className="text-gray-400 text-sm truncate">
                    {track.snippet.channelTitle}
                  </p>
                </div>

                {/* Duration */}
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{track.contentDetails?.duration ? formatDuration(track.contentDetails.duration) : '0:00'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {results.length === 0 && query && !loading && !error && (
        <div className="text-center py-12">
          <SearchIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No results found</h3>
          <p className="text-gray-500">Try searching for something else</p>
        </div>
      )}
    </div>
  );
}
