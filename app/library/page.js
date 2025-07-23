'use client';

import { useState } from 'react';
import { Play, Heart, Clock, MoreHorizontal, Music, Playlist } from 'lucide-react';
import { useMusic } from '../../contexts/MusicContext';

export default function Library() {
  const { playTrack } = useMusic();
  const [activeTab, setActiveTab] = useState('playlists');

  // Mock data for user's library
  const playlists = [
    {
      id: 1,
      name: 'My Coding Mix',
      description: 'Your favorite coding tracks',
      trackCount: 42,
      image: 'https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg',
      isLiked: false,
    },
    {
      id: 2,
      name: 'Late Night Code',
      description: 'Perfect for those 3 AM sessions',
      trackCount: 28,
      image: 'https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault.jpg',
      isLiked: true,
    },
    {
      id: 3,
      name: 'Debug Mode',
      description: 'Calm vibes for bug hunting',
      trackCount: 35,
      image: 'https://i.ytimg.com/vi/Dx5qFachd3A/hqdefault.jpg',
      isLiked: false,
    },
  ];

  const likedSongs = [
    {
      id: 1,
      title: 'Resonance',
      artist: 'HOME',
      album: 'Odyssey',
      duration: '3:32',
      thumbnail: 'https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg',
    },
    {
      id: 2,
      title: 'Synthwave Dreams',
      artist: 'The Midnight',
      album: 'Endless Summer',
      duration: '4:15',
      thumbnail: 'https://i.ytimg.com/vi/Dx5qFachd3A/hqdefault.jpg',
    },
    {
      id: 3,
      title: 'Code Flow',
      artist: 'Tycho',
      album: 'Dive',
      duration: '5:02',
      thumbnail: 'https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault.jpg',
    },
  ];

  const recentlyPlayed = [
    {
      id: 1,
      title: 'Lo-Fi Study Session',
      artist: 'ChilledCow',
      playedAt: '2 hours ago',
      thumbnail: 'https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg',
    },
    {
      id: 2,
      title: 'Ambient Coding',
      artist: 'Brian Eno',
      playedAt: '1 day ago',
      thumbnail: 'https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault.jpg',
    },
  ];

  const handlePlayTrack = (track) => {
    playTrack(track, [track], 0);
  };

  const tabs = [
    { id: 'playlists', label: 'Playlists', icon: Playlist },
    { id: 'liked', label: 'Liked Songs', icon: Heart },
    { id: 'recent', label: 'Recently Played', icon: Clock },
  ];

  return (
    <div className="p-8 bg-gradient-to-b from-gray-900 to-black min-h-full">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-8">Your Library</h1>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-colors font-medium ${
                  activeTab === tab.id
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Playlists Tab */}
      {activeTab === 'playlists' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Your Playlists</h2>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
              Create Playlist
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer group"
              >
                <div className="relative mb-4">
                  <img
                    src={playlist.image}
                    alt={playlist.name}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <button className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 hover:scale-105 transition-all">
                    <Play className="h-5 w-5 text-black ml-0.5" />
                  </button>
                </div>
                <h3 className="font-semibold text-white mb-1">{playlist.name}</h3>
                <p className="text-gray-400 text-sm mb-1">{playlist.description}</p>
                <p className="text-gray-500 text-xs">{playlist.trackCount} songs</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Liked Songs Tab */}
      {activeTab === 'liked' && (
        <div>
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-lg mr-6">
              <Heart className="h-8 w-8 text-white fill-current" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Liked Songs</h2>
              <p className="text-gray-400">{likedSongs.length} songs</p>
            </div>
          </div>

          <div className="space-y-2">
            {likedSongs.map((song, index) => (
              <div
                key={song.id}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 transition-colors group cursor-pointer"
                onClick={() => handlePlayTrack(song)}
              >
                <div className="w-8 text-gray-400 text-sm">
                  {index + 1}
                </div>
                <img
                  src={song.thumbnail}
                  alt={song.title}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium truncate">{song.title}</h3>
                  <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                </div>
                <div className="hidden md:block text-gray-400 text-sm">
                  {song.album}
                </div>
                <div className="text-gray-400 text-sm">
                  {song.duration}
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-700 rounded transition-all">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recently Played Tab */}
      {activeTab === 'recent' && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Recently Played</h2>
          
          <div className="space-y-4">
            {recentlyPlayed.map((track) => (
              <div
                key={track.id}
                className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
                onClick={() => handlePlayTrack(track)}
              >
                <img
                  src={track.thumbnail}
                  alt={track.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-white font-medium">{track.title}</h3>
                  <p className="text-gray-400 text-sm">{track.artist}</p>
                  <p className="text-gray-500 text-xs">{track.playedAt}</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 bg-green-500 rounded-full p-3 hover:scale-105 transition-all">
                  <Play className="h-5 w-5 text-black ml-0.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
