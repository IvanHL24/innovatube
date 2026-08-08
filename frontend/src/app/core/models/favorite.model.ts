export class Favorite {
    id: number;
    user_id: number;
    youtube_video_id: string;
    title: string;
    image: string;
    created_at: string;

    constructor(){
        this.id = 0;
        this.user_id = 0;
        this.youtube_video_id = '';
        this.title = '';
        this.image = '';
        this.created_at = '';
    }
}