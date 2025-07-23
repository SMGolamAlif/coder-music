import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams, Form } from "@remix-run/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { searchYouTubeVideos, type YouTubeVideo } from "~/utils/youtube";
import TrackCard from "~/components/TrackCard";
import { usePlayer } from "~/context/PlayerContext";

type LoaderData = {
  searchResults: YouTubeVideo[];
  query: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!query || !apiKey) {
    return json({ searchResults: [], query });
  }

  try {
    const searchResults = await searchYouTubeVideos(`${query} music`, apiKey, 24);
    return json({ searchResults, query });
  } catch (error) {
    console.error("Search error:", error);
    return json({ searchResults: [], query });
  }
};

export default function Search() {
  const { searchResults, query } = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const { playTrack, currentTrack, isPlaying } = usePlayer();

  const handlePlayTrack = (track: YouTubeVideo) => {
    playTrack(track, searchResults);
  };

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
            {searchResults.length > 0 ? (
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
