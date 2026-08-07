import { Request, Response } from "express";
import { LoginRequest, ForgotPassword, ResetPassword } from "../types/auth.types";
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

export const getMe = async (req: Request, res: Response) => {
    try {
        const user = await AuthService.getMe(req.user!.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener información del usuario"
        });
    }
}

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const data: ForgotPassword = req.body

        await AuthService.forgotPassword(data);

        res.json({
            message: "Identidad verificada correctamente."
        })
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const data: ResetPassword = req.body;

        const response = await AuthService.resetPassword(data);

        res.status(200).json({
            message: "Contraseña actualizada correctamente."
        });
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        })
    }
}