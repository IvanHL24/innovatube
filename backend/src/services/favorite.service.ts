import { CreateFavorite } from "../types/favorite.types";
import { db } from "../config/database";


export const createFavorite = async (userId: number, favorite: CreateFavorite) => {
    const[favoriteExist]: any = await db.execute(
        `SELECT id FROM favorites WHERE user_id = ? AND youtube_video_id = ?`,
        [userId, favorite.youtube_video_id]
    );

    if (favoriteExist.length > 0) {
        throw new Error("El video ya está en favoritos")
    }

    const sql = `INSERT INTO favorites (user_id, youtube_video_id, title, image) VALUES (?, ?, ?, ?)`;

    const[result] = await db.execute(sql, [
        userId,
        favorite.youtube_video_id,
        favorite.title,
        favorite.image
    ])

    return result;
}


export const getFavorites = async (userId: number, search?: string) => {
    let sql = `SELECT * FROM favorites WHERE user_id = ?`;

    const params: any[] = [userId];

    if (search) {
        sql += ` AND title LIKE ?`;
        params.push(`%${search}`);
    }
    
    sql += ` ORDER BY created_at DESC`;
    
    const[favorites] = await db.execute(sql, params);

    return favorites;
}


export const deleteFavorite = async (userId: number, youtubeVideoId: string) => {
    const sql = `DELETE FROM favorites WHERE user_id = ? AND youtube_video_id = ?`;

    console.log([userId, youtubeVideoId])
    const[result] = await db.execute(sql, [userId, youtubeVideoId]);

    return result;
}