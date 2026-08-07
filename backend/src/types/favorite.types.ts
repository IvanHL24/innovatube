export interface CreateFavorite {
    youtube_video_id: string;
    title: string;
    image: string;
}

export interface Favorite {
    id: number;
    user_id: number;
    youtube_video_id: string;
    title: string;
    image: string;
    created_at: Date;
}