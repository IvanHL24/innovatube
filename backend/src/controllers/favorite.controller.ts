import { Request, Response } from "express";
import { CreateFavorite } from "../types/favorite.types";
import * as FavoriteService from "../services/favorite.service";


export const createFavorite = async (req: Request, res: Response) => {
    try {
        const favorite: CreateFavorite = req.body;
        const userId = req.user!.id;

        await FavoriteService.createFavorite(userId, favorite);

        res.status(201).json({
            message: "Favorito agregado con exito"
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const getFavorites = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const search = req.query.search as string | undefined;
        
        const favorites = await FavoriteService.getFavorites(userId, search);
        
        res.json(favorites);
    } catch {
        res.status(500).json({
            message: "Error al obtener favoritos"
        })
    }
}

export const deleteFavorite = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const youtubeVideoId = req.params.youtubeVideoId as string;

        await FavoriteService.deleteFavorite(userId, youtubeVideoId);

        res.json({
            message: "Favorito eliminado con exito"
        })
    } catch {
        res.status(500).json({
            message: "Error al eliminar favorito"
        })
    }
}