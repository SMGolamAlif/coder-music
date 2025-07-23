import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams, Form } from "@remix-run/react";
import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { searchYouTubeVideos, type YouTubeVideo } from "~/utils/youtube";
import TrackCard from "~/components/TrackCard";
import { usePlayer } from "~/context/PlayerContext";
import { useApiKey } from "~/context/ApiKeyContext";

type LoaderData = {
  searchResults: YouTubeVideo[];
  query: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  
  // Return just the query - we'll handle search on client side with user's API key
  return json({ searchResults: [], query });
};

export default function Search() {
  const { searchResults: initialResults, query } = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<YouTubeVideo[]>(initialResults);
  const [isLoading, setIsLoading] = useState(false);
  const { playTrack, currentTrack, isPlaying } = usePlayer();
  const { apiKey, hasApiKey, isLoading: apiKeyLoading } = useApiKey();

  // Perform search when query changes and API key is available
  useEffect(() => {
    if (query && hasApiKey && apiKey) {
      setIsLoading(true);
      searchYouTubeVideos(`${query} music`, apiKey, 24)
        .then((results) => {
          setSearchResults(results);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Search error:", error);
          setSearchResults([]);
          setIsLoading(false);
        });
    } else if (!query) {
      setSearchResults([]);
    }
  }, [query, hasApiKey, apiKey]);

  const handlePlayTrack = (track: YouTubeVideo) => {
    playTrack(track, searchResults);
  };

  if (apiKeyLoading) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-black min-h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-white">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!hasApiKey) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-black min-h-full">
        <div className="px-8 pt-6">
          <h1 className="text-3xl font-bold text-white mb-6">Search</h1>
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-400 mb-2">
              API Key Required
            </h3>
            <p className="text-gray-500">
              Please set up your YouTube API key to search for music.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-full">
      <div className="px-8 pt-6">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">Search</h1>
          
          <Form method="get" className="relative max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              name="q"
              placeholder="What do you want to listen to?"
              defaultValue={query}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              autoComplete="off"
            />
          </Form>
        </div>

        {/* Search Results */}
        {query && (
          <div>
            {isLoading ? (
              <div>
                <h2 className="text-xl font-bold text-white mb-6">
                  Searching for "{query}"...
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {[...Array(12)].map((_, i) => (
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
            ) : searchResults.length > 0 ? (
              <>
                <h2 className="text-xl font-bold text-white mb-6">
                  Results for "{query}"
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {searchResults.map((track) => (
                    <TrackCard
                      key={track.id}
                      track={track}
                      onPlay={handlePlayTrack}
                      isCurrentTrack={currentTrack?.id === track.id}
                      isPlaying={isPlaying}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium text-gray-400 mb-2">
                  No results found for "{query}"
                </h3>
                <p className="text-gray-500">
                  Try searching for something else.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Search Suggestions */}
        {!query && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">
              Popular searches
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Lo-fi hip hop",
                "Ambient coding music",
                "Electronic focus",
                "Classical studying",
                "Jazz programming",
                "Synthwave coding"
              ].map((suggestion) => (
                <Form key={suggestion} method="get">
                  <input type="hidden" name="q" value={suggestion} />
                  <button
                    type="submit"
                    className="w-full text-left p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <h3 className="text-white font-medium">{suggestion}</h3>
                    <p className="text-gray-400 text-sm">Music category</p>
                  </button>
                </Form>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
