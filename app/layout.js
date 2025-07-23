import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";
import Sidebar from "../components/Sidebar";
import Player from "../components/Player";
import Header from "../components/Header";
import ErrorBoundary from "../components/ErrorBoundary";
import AudioNotification from "../components/AudioNotification";
import { MusicProvider } from "../contexts/MusicContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});  
 
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Coder Music",
  description: "A modern music player for coders",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white`}
      >
        <ErrorBoundary>
          <MusicProvider>
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <main className="flex-1 flex flex-col min-w-0">
                <Header />
                <div className="flex-1 overflow-y-auto pb-32">
                  <div className="min-h-full">
                    {children}
                  </div>
                </div>
              </main>
            </div>
            <Player />
            <AudioNotification />
          </MusicProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
