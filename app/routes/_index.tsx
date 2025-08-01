import { json, type MetaFunction, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import { searchYouTubeVideos, getPlaylistVideos, CODING_QUERIES, type YouTubeVideo } from "~/utils/youtube";
import TrackCard from "~/components/TrackCard";
import { usePlayer } from "~/context/PlayerContext";
import { useApiKey } from "~/context/ApiKeyContext";

export const meta: MetaFunction = () => {
  return [
    { title: "Coder Music - Your Coding Companion" },
    { name: "description", content: "A modern music player for productive coding sessions" },
  ];
};

type LoaderData = {
  featuredTracks: YouTubeVideo[];
  lofiTracks: YouTubeVideo[];
  ambientTracks: YouTubeVideo[];
  electronicTracks: YouTubeVideo[];
  focusTracks: YouTubeVideo[];
};

export const loader: LoaderFunction = async () => {
  // Return empty data - we'll fetch on client side with user's API key
  return json({
    featuredTracks: [],
    lofiTracks: [],
    ambientTracks: [],
    electronicTracks: [],
    focusTracks: [],
  });
};

export default function Index() {
  const loaderData = useLoaderData<LoaderData>();
  const [tracks, setTracks] = useState(loaderData);
  const [isLoading, setIsLoading] = useState(false);
  const { playTrack, currentTrack, isPlaying } = usePlayer();
  const { apiKey, hasApiKey, isLoading: apiKeyLoading } = useApiKey();

  // Fetch tracks when API key becomes available
  useEffect(() => {
    if (hasApiKey && apiKey && tracks.featuredTracks.length === 0) {
      setIsLoading(true);
      Promise.all([
        searchYouTubeVideos('coding music productivity', apiKey, 12),
        searchYouTubeVideos('lofi hip hop programming', apiKey, 8),
        searchYouTubeVideos('ambient music focus coding', apiKey, 8),
        searchYouTubeVideos('electronic music programming', apiKey, 8),
        searchYouTubeVideos('deep focus music work', apiKey, 8),
      ]).then(([featuredTracks, lofiTracks, ambientTracks, electronicTracks, focusTracks]) => {
        setTracks({
          featuredTracks,
          lofiTracks,
          ambientTracks,
          electronicTracks,
          focusTracks,
        });
        setIsLoading(false);
      }).catch((error) => {
        console.error("Error fetching videos:", error);
        setIsLoading(false);
      });
    }
  }, [hasApiKey, apiKey]);

  const handlePlayTrack = (track: YouTubeVideo, playlist: YouTubeVideo[]) => {
    playTrack(track, playlist);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  if (apiKeyLoading) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-black min-h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-white">Loading Coder Music...</h1>
        </div>
      </div>
    );
  }

  if (!hasApiKey) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-black min-h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Welcome to Coder Music</h1>
          <p className="text-gray-400 mb-6">Please set up your YouTube API key to get started</p>
          <div className="animate-pulse bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
            <div className="h-4 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-black min-h-full">
        <div className="px-8 pt-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{getGreeting()}</h1>
            <p className="text-gray-400">Loading your coding music...</p>
          </div>
          
          <div className="space-y-8">
            {[1, 2, 3].map((section) => (
              <div key={section}>
                <div className="h-6 bg-gray-800 rounded w-48 mb-6"></div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="w-full aspect-square bg-gray-700 rounded-md mb-3"></div>
                        <div className="h-4 bg-gray-700 rounded mb-2"></div>
                        <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-full">
      <div className="px-8 pt-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {getGreeting()}
          </h1>
          <p className="text-gray-400">Ready for a productive coding session?</p>
        </div>

        {/* Featured Section */}
        {tracks.featuredTracks.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Featured for Coding</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {tracks.featuredTracks.slice(0, 6).map((track: YouTubeVideo) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  onPlay={(t) => handlePlayTrack(t, tracks.featuredTracks)}
                  isCurrentTrack={currentTrack?.id === track.id}
                  isPlaying={isPlaying}
                />
              ))}
            </div>
          </section>
        )}

        {/* Lo-Fi Hip Hop */}
        {tracks.lofiTracks.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Lo-Fi Hip Hop</h2>
              <button className="text-gray-400 hover:text-white text-sm font-medium">
                Show all
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {tracks.lofiTracks.map((track: YouTubeVideo) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  onPlay={(t) => handlePlayTrack(t, tracks.lofiTracks)}
                  isCurrentTrack={currentTrack?.id === track.id}
                  isPlaying={isPlaying}
                />
              ))}
            </div>
          </section>
        )}

        {/* Ambient & Focus */}
        {tracks.ambientTracks.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Ambient & Focus</h2>
              <button className="text-gray-400 hover:text-white text-sm font-medium">
                Show all
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {tracks.ambientTracks.map((track: YouTubeVideo) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  onPlay={(t) => handlePlayTrack(t, tracks.ambientTracks)}
                  isCurrentTrack={currentTrack?.id === track.id}
                  isPlaying={isPlaying}
                />
              ))}
            </div>
          </section>
        )}

        {/* Electronic */}
        {tracks.electronicTracks.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Electronic</h2>
              <button className="text-gray-400 hover:text-white text-sm font-medium">
                Show all
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {tracks.electronicTracks.map((track: YouTubeVideo) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  onPlay={(t) => handlePlayTrack(t, tracks.electronicTracks)}
                  isCurrentTrack={currentTrack?.id === track.id}
                  isPlaying={isPlaying}
                />
              ))}
            </div>
          </section>
        )}

        {/* Deep Focus */}
        {tracks.focusTracks.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Deep Focus</h2>
              <button className="text-gray-400 hover:text-white text-sm font-medium">
                Show all
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {tracks.focusTracks.map((track: YouTubeVideo) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  onPlay={(t) => handlePlayTrack(t, tracks.focusTracks)}
                  isCurrentTrack={currentTrack?.id === track.id}
                  isPlaying={isPlaying}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

const resources = [
  {
    href: "https://remix.run/start/quickstart",
    text: "Quick Start (5 min)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M8.51851 12.0741L7.92592 18L15.6296 9.7037L11.4815 7.33333L12.0741 2L4.37036 10.2963L8.51851 12.0741Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "https://remix.run/start/tutorial",
    text: "Tutorial (30 min)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M4.561 12.749L3.15503 14.1549M3.00811 8.99944H1.01978M3.15503 3.84489L4.561 5.2508M8.3107 1.70923L8.3107 3.69749M13.4655 3.84489L12.0595 5.2508M18.1868 17.0974L16.635 18.6491C16.4636 18.8205 16.1858 18.8205 16.0144 18.6491L13.568 16.2028C13.383 16.0178 13.0784 16.0347 12.915 16.239L11.2697 18.2956C11.047 18.5739 10.6029 18.4847 10.505 18.142L7.85215 8.85711C7.75756 8.52603 8.06365 8.21994 8.39472 8.31453L17.6796 10.9673C18.0223 11.0653 18.1115 11.5094 17.8332 11.7321L15.7766 13.3773C15.5723 13.5408 15.5554 13.8454 15.7404 14.0304L18.1868 16.4767C18.3582 16.6481 18.3582 16.926 18.1868 17.0974Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "https://remix.run/docs",
    text: "Remix Docs",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M9.99981 10.0751V9.99992M17.4688 17.4688C15.889 19.0485 11.2645 16.9853 7.13958 12.8604C3.01467 8.73546 0.951405 4.11091 2.53116 2.53116C4.11091 0.951405 8.73546 3.01467 12.8604 7.13958C16.9853 11.2645 19.0485 15.889 17.4688 17.4688ZM2.53132 17.4688C0.951566 15.8891 3.01483 11.2645 7.13974 7.13963C11.2647 3.01471 15.8892 0.951453 17.469 2.53121C19.0487 4.11096 16.9854 8.73551 12.8605 12.8604C8.73562 16.9853 4.11107 19.0486 2.53132 17.4688Z"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "https://rmx.as/discord",
    text: "Join Discord",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 24 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M15.0686 1.25995L14.5477 1.17423L14.2913 1.63578C14.1754 1.84439 14.0545 2.08275 13.9422 2.31963C12.6461 2.16488 11.3406 2.16505 10.0445 2.32014C9.92822 2.08178 9.80478 1.84975 9.67412 1.62413L9.41449 1.17584L8.90333 1.25995C7.33547 1.51794 5.80717 1.99419 4.37748 2.66939L4.19 2.75793L4.07461 2.93019C1.23864 7.16437 0.46302 11.3053 0.838165 15.3924L0.868838 15.7266L1.13844 15.9264C2.81818 17.1714 4.68053 18.1233 6.68582 18.719L7.18892 18.8684L7.50166 18.4469C7.96179 17.8268 8.36504 17.1824 8.709 16.4944L8.71099 16.4904C10.8645 17.0471 13.128 17.0485 15.2821 16.4947C15.6261 17.1826 16.0293 17.8269 16.4892 18.4469L16.805 18.8725L17.3116 18.717C19.3056 18.105 21.1876 17.1751 22.8559 15.9238L23.1224 15.724L23.1528 15.3923C23.5873 10.6524 22.3579 6.53306 19.8947 2.90714L19.7759 2.73227L19.5833 2.64518C18.1437 1.99439 16.6386 1.51826 15.0686 1.25995ZM16.6074 10.7755L16.6074 10.7756C16.5934 11.6409 16.0212 12.1444 15.4783 12.1444C14.9297 12.1444 14.3493 11.6173 14.3493 10.7877C14.3493 9.94885 14.9378 9.41192 15.4783 9.41192C16.0471 9.41192 16.6209 9.93851 16.6074 10.7755ZM8.49373 12.1444C7.94513 12.1444 7.36471 11.6173 7.36471 10.7877C7.36471 9.94885 7.95323 9.41192 8.49373 9.41192C9.06038 9.41192 9.63892 9.93712 9.6417 10.7815C9.62517 11.6239 9.05462 12.1444 8.49373 12.1444Z"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
];
