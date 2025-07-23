import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import "./styles/theme.css";
import { PlayerProvider } from "./context/PlayerContext";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import { usePlayer } from "./context/PlayerContext";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

function AppLayout() {
  const { currentTrack, isPlaying, togglePlayPause, nextTrack, previousTrack, playlist } = usePlayer();

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Coder Music - Modern Music Player for Coders</title>
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-black text-white overflow-hidden">
        <div className="flex h-full">
          <Sidebar />
          <main className="flex-1 overflow-auto pb-24">
            <Outlet />
          </main>
        </div>
        <Player
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={togglePlayPause}
          onNext={nextTrack}
          onPrevious={previousTrack}
          playlist={playlist}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <PlayerProvider>
      <AppLayout />
    </PlayerProvider>
  );
}
