import { Request, Response } from "express";
import * as YoutubeService from "../services/youtube.service";

export const search = async (req: Request, res: Response) => {
    try {
        const query = req.query.q as string;
        const videos = await YoutubeService.searchVideos(query);
        res.json(videos);
    } catch (error) {
        res.status(500).json({
            message: "Error al buscar videos"
        });
    }
};