import { Request, Response } from "express";
import * as UserService from "../services/user.service";
import { CreateUser } from "../types/user.types";
import { verifyRecaptcha } from "../services/recaptcha.service";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const {
            recaptchaToken,
            ...user
        } = req.body;

        if (!recaptchaToken) {
            return res.status(400).json({
                message: 'La validación de reCaptcha es requerida'
            });
        }

        const captchaValid = await verifyRecaptcha(recaptchaToken);

        if (!captchaValid) {
            return res.status(400).json({
                message: 'La validación de reCAPTCHA no fue exitosa'
            });
        }

        await UserService.createUser(user);

        res.status(201).json({
            message: "Usuario registrado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al registrar el usuario"
        });
    }
}