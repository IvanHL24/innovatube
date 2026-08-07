import { Request, Response } from "express";
import { LoginRequest } from "../types/auth.types";
import * as AuthService from "../services/auth.service";

export const login = async (req: Request, res: Response) => {
    try {
        const credentials: LoginRequest = req.body;

        const result = await AuthService.login(credentials);

        res.status(200).json(result);
    } catch (error: any) {
        res.status(401).json({
            message: error.message
        })
    }
}