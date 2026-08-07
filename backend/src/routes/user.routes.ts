import { Router } from "express";
import * as UserController from "../controllers/user.controller";

const router = Router();

router.post("/register", UserController.registerUser);

// router.get("/all", userController.getUsers);

export default router;