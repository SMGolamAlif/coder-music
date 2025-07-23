import axios from 'axios';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export type YouTubeVideo = {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  duration: string;
  viewCount?: string;
  publishedAt?: string;
};

export async function searchYouTubeVideos(
  query: string,
  apiKey: string,
  maxResults: number = 20
): Promise<YouTubeVideo[]> {
  try {
    const searchResponse = await axios.get(`${YOUTUBE_API_BASE}/search`, {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults,
        key: apiKey,
        videoCategoryId: '10', // Music category
      },
    });

    const videoIds = searchResponse.data.items.map((item: any) => item.id.videoId);
    
    // Get additional details for videos
    const detailsResponse = await axios.get(`${YOUTUBE_API_BASE}/videos`, {
      params: {
        part: 'contentDetails,statistics',
        id: videoIds.join(','),
        key: apiKey,
      },
    });

    const videos: YouTubeVideo[] = searchResponse.data.items.map((item: any, index: number) => {
      const details = detailsResponse.data.items[index];
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channelTitle: item.snippet.channelTitle,
        duration: details?.contentDetails?.duration || '',
        viewCount: details?.statistics?.viewCount || '0',
        publishedAt: item.snippet.publishedAt,
      };
    });

    return videos;
  } catch (error) {
    console.error('Error searching YouTube videos:', error);
    return [];
  }
}

export async function getPlaylistVideos(
  playlistId: string,
  apiKey: string,
  maxResults: number = 50
): Promise<YouTubeVideo[]> {
  try {
    const response = await axios.get(`${YOUTUBE_API_BASE}/playlistItems`, {
      params: {
        part: 'snippet',
        playlistId,
        maxResults,
        key: apiKey,
      },
    });

    const videos: YouTubeVideo[] = response.data.items
      .filter((item: any) => item.snippet.resourceId?.videoId)
      .map((item: any) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channelTitle: item.snippet.channelTitle,
        duration: '',
        publishedAt: item.snippet.publishedAt,
      }));

    return videos;
  } catch (error) {
    console.error('Error fetching playlist videos:', error);
    return [];
  }
}

export function formatDuration(duration: string): string {
  if (!duration) return '';
  
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '';

  const hours = parseInt(match[1]?.replace('H', '') || '0');
  const minutes = parseInt(match[2]?.replace('M', '') || '0');
  const seconds = parseInt(match[3]?.replace('S', '') || '0');

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function formatViewCount(viewCount: string): string {
  const count = parseInt(viewCount);
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M views`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K views`;
  }
  return `${count} views`;
}

// Predefined coding music playlists
export const CODING_PLAYLISTS = {
  lofi: 'PLwkxNyWJmTe6QVJGRVNhM9RdWJ6_C1o8D', // Lo-fi Hip Hop
  electronic: 'PLOzDu-MXXLliO9fBNZOQTBDddoA3FzZUo', // Electronic/Ambient
  classical: 'PLYgJ6tTaBOWHU93L5B8qVKYwCaJa1Fjjh', // Classical for studying
  ambient: 'PLcIuTiT3fU31Q-b0xqreCJzJcNJUILq-C', // Ambient music
  focus: 'PLNS3c0cF-mWC8X5dwBNuzjVPCb7lgGMy6', // Focus music
};

export const CODING_QUERIES = [
  'coding music lofi',
  'programming ambient music',
  'focus music for developers',
  'lo-fi hip hop study',
  'electronic music coding',
  'ambient programming',
  'deep work music',
  'concentration music',
];

export function getRandomCodingQuery(): string {
  return CODING_QUERIES[Math.floor(Math.random() * CODING_QUERIES.length)];
}
