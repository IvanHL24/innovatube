import { Router } from "express";
import * as AuthController from "../controllers/auth.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

router.post("/login", AuthController.login);

router.get("/me", verifyToken, AuthController.getMe);

router.post("/forgot-password", AuthController.forgotPassword);

router.post("/reset-password", AuthController.resetPassword);

export default router;