# 🎵 Coder Music

A modern, sleek music player designed specifically for developers and coders. Enjoy curated coding playlists, search for your favorite tracks, and maintain your flow state with an intuitive interface.

![Coder Music](https://img.shields.io/badge/Built%20with-Remix-blue?style=flat&logo=remix)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![YouTube API](https://img.shields.io/badge/YouTube-FF0000?style=flat&logo=youtube&logoColor=white)

## ✨ Features

### 🎧 **Music Player**
- **Interactive Timeline**: Click or drag to seek through tracks
- **Loading States**: Visual feedback with spinner during track loading
- **Auto-progression**: Seamlessly moves to next track when current ends
- **Volume Control**: Adjustable volume with mute functionality
- **Play/Pause Controls**: Responsive player controls with visual feedback

### 🔍 **Smart Search**
- **YouTube Integration**: Search and play music directly from YouTube
- **Popular Suggestions**: Quick access to coding-focused music categories
- **Real-time Results**: Instant search results with thumbnails and details

### 📚 **Curated Content**
- **Coding Playlists**: Pre-curated playlists for different coding moods
  - Lo-Fi Hip Hop for focused coding
  - Ambient music for deep concentration
  - Electronic beats for high-energy sessions
  - Classical music for analytical thinking
- **Featured Tracks**: Handpicked tracks for productive coding sessions

### 🎨 **Modern UI/UX**
- **Dark Theme**: Easy on the eyes during long coding sessions
- **Responsive Design**: Works perfectly on all screen sizes
- **Smooth Animations**: Polished transitions and hover effects
- **Intuitive Navigation**: Clean sidebar with easy access to all features

## 🚀 Getting Started

### Prerequisites
- Node.js 20.0.0 or higher
- npm or yarn package manager
- YouTube Data API v3 key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SMGolamAlif/coder-music.git
   cd coder-music
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   YOUTUBE_API_KEY=your_youtube_api_key_here
   ```

   To get a YouTube API key:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the YouTube Data API v3
   - Create credentials (API Key)
   - Copy the API key to your `.env` file

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the app for production
- `npm run start` - Run the production build
- `npm run lint` - Run ESLint for code quality
- `npm run typecheck` - Run TypeScript type checking

### Project Structure

```
coder-music/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── Player.tsx      # Main music player component
│   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   ├── TrackCard.tsx   # Individual track display
│   │   └── ...
│   ├── context/            # React context providers
│   │   └── PlayerContext.tsx # Music player state management
│   ├── routes/             # Remix route components
│   │   ├── _index.tsx      # Home page with featured content
│   │   ├── search.tsx      # Search functionality
│   │   └── library.tsx     # User library (future feature)
│   ├── styles/             # Global styles and themes
│   ├── utils/              # Utility functions
│   │   └── youtube.ts      # YouTube API integration
│   └── root.tsx            # Root app component
├── public/                 # Static assets
└── ...config files
```

## 🎯 Tech Stack

- **Framework**: [Remix](https://remix.run/) - Full-stack web framework
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Icons**: [Heroicons](https://heroicons.com/) - Beautiful hand-crafted SVG icons
- **API**: [YouTube Data API v3](https://developers.google.com/youtube/v3) - Music content
- **Player**: [react-youtube](https://github.com/tjallingt/react-youtube) - YouTube player component

## 🎨 Styling

This project uses Tailwind CSS for styling with a custom dark theme optimized for coding environments. The design focuses on:

- **Minimal distractions**: Clean, focused interface
- **Eye comfort**: Dark theme with carefully chosen colors
- **Accessibility**: Proper contrast ratios and focus states
- **Responsiveness**: Mobile-first design approach

## 🔧 Configuration

### Tailwind CSS
The project includes a custom Tailwind configuration with:
- Custom color palette for coding themes
- Typography optimized for music metadata
- Custom animations for player controls

### TypeScript
Strict TypeScript configuration ensuring type safety across:
- Component props and state
- API responses and data models
- Event handlers and callbacks

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates optimized bundles in the `build/` directory.

### Deployment Options

1. **Vercel** (Recommended)
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Netlify**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `build/client`

3. **Railway/Render**
   - Connect repository
   - Set start command: `npm start`
   - Add environment variables

Remember to set your `YOUTUBE_API_KEY` environment variable in your deployment platform.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Remix](https://remix.run/) for an amazing full-stack experience
- Music content powered by [YouTube](https://youtube.com/)
- Icons by [Heroicons](https://heroicons.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**Happy Coding! 🚀** Enjoy your productive coding sessions with Coder Music!
