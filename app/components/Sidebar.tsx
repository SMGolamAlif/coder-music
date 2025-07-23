import { NavLink } from "@remix-run/react";
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  MusicalNoteIcon,
  HeartIcon,
  PlusIcon
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const navigation = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Search", href: "/search", icon: MagnifyingGlassIcon },
    { name: "Your Library", href: "/library", icon: MusicalNoteIcon },
  ];

  const playlists = [
    "Coding Focus",
    "Deep Work",
    "Ambient Coding",
    "Lo-Fi Programming",
    "Electronic Focus"
  ];

  return (
    <div className="w-64 bg-black h-full flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Coder Music
        </h1>
      </div>

      {/* Main Navigation */}
      <nav className="px-6 pb-6">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Library Section */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Your Library
          </h3>
          <button className="text-gray-400 hover:text-white">
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
        <ul className="space-y-1">
          {playlists.map((playlist) => (
            <li key={playlist}>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors">
                {playlist}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Liked Songs */}
      <div className="px-6 mt-auto pb-6">
        <button className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors">
          <HeartIcon className="w-5 h-5 mr-3" />
          Liked Songs
        </button>
      </div>
    </div>
  );
}
