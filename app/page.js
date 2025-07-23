'use client';

import { useState, useEffect } from 'react';
import { Play, Clock, Code, Coffee, Zap } from 'lucide-react';
import { useMusic } from '../contexts/MusicContext';

const codingPlaylists = [
  {
    id: 1,
    title: 'Deep Focus',
    description: 'Instrumental beats for deep concentration',
    image: 'https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg',
    color: 'from-blue-500 to-purple-600',
    icon: Code,
  },
  {
    id: 2,
    title: 'Late Night Sessions',
    description: 'Chill beats for those midnight coding sessions',
    image: 'https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault.jpg',
    color: 'from-purple-500 to-pink-600',
    icon: Coffee,
  },
  {
    id: 3,
    title: 'High Energy Code',
    description: 'Upbeat tracks to boost your productivity',
    image: 'https://i.ytimg.com/vi/Dx5qFachd3A/hqdefault.jpg',
    color: 'from-green-500 to-blue-600',
    icon: Zap,
  },
];

const recentlyPlayed = [
  {
    id: 1,
    title: 'Lofi Hip Hop Study Mix',
    artist: 'ChilledCow',
    duration: '3:45',
    thumbnail: 'https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg',
  },
  {
    id: 2,
    title: 'Synthwave for Programming',
    artist: 'The Midnight',
    duration: '4:12',
    thumbnail: 'https://i.ytimg.com/vi/Dx5qFachd3A/hqdefault.jpg',
  },
  {
    id: 3,
    title: 'Ambient Coding',
    artist: 'Brian Eno',
    duration: '5:23',
    thumbnail: 'https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault.jpg',
  },
  {
    id: 4,
    title: 'Jazz for Focus',
    artist: 'Bill Evans',
    duration: '3:58',
    thumbnail: 'https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg',
  },
];

export default function Home() {
  const { playTrack } = useMusic();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const handlePlayTrack = (track) => {
    playTrack(track, recentlyPlayed, recentlyPlayed.findIndex(t => t.id === track.id));
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 to-black min-h-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{greeting}</h1>
        <p className="text-gray-400">Ready to code with some great music?</p>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {codingPlaylists.map((playlist) => {
          const Icon = playlist.icon;
          return (
            <div
              key={playlist.id}
              className={`bg-gradient-to-r ${playlist.color} p-6 rounded-lg cursor-pointer hover:scale-105 transition-transform`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{playlist.title}</h3>
                  <p className="text-white/80 text-sm">{playlist.description}</p>
                </div>
                <Icon className="h-8 w-8 text-white" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recently Played */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Recently Played</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentlyPlayed.map((track) => (
            <div
              key={track.id}
              className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer group"
              onClick={() => handlePlayTrack(track)}
            >
              <div className="relative mb-4">
                <img
                  src={track.thumbnail}
                  alt={track.title}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <button className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 hover:scale-105 transition-all">
                  <Play className="h-5 w-5 text-black ml-0.5" />
                </button>
              </div>
              <h3 className="font-semibold text-white mb-1 truncate">{track.title}</h3>
              <p className="text-gray-400 text-sm truncate">{track.artist}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Made for Coders */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Made for Coders</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Debugging Mix',
              description: 'Calm tracks for bug hunting',
              image: 'https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg',
            },
            {
              title: 'Algorithm Focus',
              description: 'Sharp beats for complex problems',
              image: 'https://i.ytimg.com/vi/Dx5qFachd3A/hqdefault.jpg',
            },
            {
              title: 'Refactoring Vibes',
              description: 'Smooth sounds for code cleanup',
              image: 'https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault.jpg',
            },
            {
              title: 'Sprint Energy',
              description: 'High tempo for sprint sessions',
              image: 'https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg',
            },
          ].map((playlist, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer group"
            >
              <div className="relative mb-4">
                <img
                  src={playlist.image}
                  alt={playlist.title}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <button className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 hover:scale-105 transition-all">
                  <Play className="h-5 w-5 text-black ml-0.5" />
                </button>
              </div>
              <h3 className="font-semibold text-white mb-1">{playlist.title}</h3>
              <p className="text-gray-400 text-sm">{playlist.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Coding Languages */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Code by Language</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: 'JavaScript', color: 'bg-yellow-500' },
            { name: 'Python', color: 'bg-blue-500' },
            { name: 'React', color: 'bg-cyan-500' },
            { name: 'Node.js', color: 'bg-green-500' },
            { name: 'TypeScript', color: 'bg-blue-600' },
            { name: 'CSS', color: 'bg-purple-500' },
          ].map((lang) => (
            <div
              key={lang.name}
              className={`${lang.color} p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform`}
            >
              <h3 className="font-bold text-white text-center">{lang.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
