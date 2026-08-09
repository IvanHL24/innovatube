import axios from "axios";

export const searchVideos = async (query?: string) => {

    const url = query ? "https://www.googleapis.com/youtube/v3/search" : "https://www.googleapis.com/youtube/v3/videos";

    const params = query
        ? {
            part: "snippet",
            q: query,
            type: "video",
            maxResults: 12,
            relevanceLanguage: "es",
            key: process.env.YOUTUBE_API_KEY
        }
        : {
            part: "snippet",
            chart: "mostPopular",
            regionCode: "MX",
            maxResults: 3,
            key: process.env.YOUTUBE_API_KEY
        }

    const response = await axios.get(url, { params })

    return response.data.items;
}