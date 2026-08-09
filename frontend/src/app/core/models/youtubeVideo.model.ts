export interface YouTubeVideo {
  id: {
    videoId: string;
  };

  snippet: {
    title: string;
    publishedAt: string;
    channelTitle: string;

    thumbnails: {
      default: {
        url: string;
      };

      medium: {
        url: string;
      };

      high: {
        url: string;
      };
    };
  };
}