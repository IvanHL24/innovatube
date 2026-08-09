import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtUser } from "../types/auth.types";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token no enviado"
        });
    }
    
    const token = authHeader.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({
            message: "Token inválido"
        });
    }
    
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtUser;

        req.user = decoded;

        next();
    } catch {
        next()
    }
    
}