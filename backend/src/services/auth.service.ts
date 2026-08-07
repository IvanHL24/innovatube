import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/database";
import {LoginRequest } from "../types/auth.types";

export const login = async (credentials: LoginRequest) => {

    const sql = `SELECT * FROM users WHERE email = ? OR username = ?`;

    const[users]: any = await db.execute(sql, [credentials.identifier, credentials.identifier]);

    if (users.length === 0) {
        throw new Error("Credenciales invalidas")
    }

    const user = users[0];

    const validPassword = await bcrypt.compare(credentials.password, user.password);

    if (!validPassword) {
        throw new Error("Credenciales invalidas");
    }

    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            email: user.email
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "1h"
        }
    );

    return {
        token,
        user: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            email: user.email,
        }
    }
}