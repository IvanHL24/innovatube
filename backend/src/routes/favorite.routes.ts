import { Router } from "express";
import * as FavoriteController from "../controllers/favorite.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

router.post("/create", verifyToken, FavoriteController.createFavorite);

router.get("/search", verifyToken, FavoriteController.getFavorites);

router.delete("/delete/:youtubeVideoId", verifyToken, FavoriteController.deleteFavorite);

export default router;