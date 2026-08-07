import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { CreateUser } from "../types/user.types";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const user: CreateUser = req.body;

        await userService.createUser(user);

        res.status(201).json({
            message: "Usuario registrado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al registrar el usuario" + error
        });
    }
}

// export const getUsers = async (req: Request, res: Response) => {
//     try {
//         const users = await userService.getUsers();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({
//             message: "Error al obtener usuarios"
//         });
//     }
// };