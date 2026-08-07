import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/database";
import {ForgotPassword, LoginRequest, ResetPassword } from "../types/auth.types";
import { ResultSetHeader } from "mysql2";

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

export const getMe = async (userId: number) => {
    const sql = `SELECT id, first_name, last_name, username, email, created_at FROM users WHERE id = ?`;
    
    const[info] = await db.execute(sql, [userId]);
    
    return (info as any[])[0];
}

export const forgotPassword = async (data: ForgotPassword) => {
    const sql = `SELECT id FROM users WHERE username = ? AND email = ?`;

    const [rows] = await db.execute(sql, [data.username, data.email]);

    const users = rows as any[];

    if (users.length === 0) {
        throw new Error("El usuario o correo son incorrectos.")
    }

    return true;
}

export const resetPassword = async (data: ResetPassword) => {
    if (data.password !== data.confirmPassword) {
        throw new Error("Las contraseñas no coinciden.");
    }

    const sql = `SELECT id FROM users WHERE username = ? AND email = ?`;

    const[rows] = await db.execute(sql, [data.username, data.email]);

    const users = rows as any[];

    if (users.length === 0) {
        throw new Error("Usuario no encontrado.");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const updateSql = `UPDATE users SET password = ? WHERE id = ?`;

    const [result] = await db.execute<ResultSetHeader>(
        updateSql,
        [
            hashedPassword,
            users[0].id
        ]
    );

    if (result.affectedRows === 0) {
        throw new Error("No fue posible actualizar la contraseña.");
    }

    return true;
}