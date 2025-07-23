export default function Library() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-full">
      <div className="px-8 pt-6">
        <h1 className="text-3xl font-bold text-white mb-6">Your Library</h1>
        
        <div className="text-center py-16">
          <h3 className="text-xl font-medium text-gray-400 mb-2">
            Your library is empty
          </h3>
          <p className="text-gray-500 mb-6">
            Start building your music collection by liking songs and creating playlists.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-full transition-colors">
            Browse Music
          </button>
        </div>
      </div>
    </div>
  );
}
