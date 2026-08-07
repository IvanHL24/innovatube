import axios from "axios";

export const searchVideos = async (query?: string) => {

    if (!query) {
        const response = await axios.get(
            "https://www.googleapis.com/youtube/v3/videos",
            {
                params: {
                    part: "snippet",
                    chart: "mostPopular",
                    regionCode: "MX",
                    maxResults: 3,
                    key: process.env.YOUTUBE_API_KEY
                }
            }
        );

        return response.data.items;
    }

    const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
            params: {
                part: "snippet",
                q: query,
                type: "video",
                maxResults: 3,
                relevanceLanguage: "es",
                key: process.env.YOUTUBE_API_KEY
            }
        }
    )
    return response.data.items;
}