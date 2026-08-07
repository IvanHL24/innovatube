import { Router } from "express";
import * as YoutubeController from "../controllers/youtube.controller";

const router = Router();

router.get("/search", YoutubeController.search);

export default router;