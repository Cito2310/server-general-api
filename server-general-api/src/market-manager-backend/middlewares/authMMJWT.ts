import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface MMJWTPayload {
    id: string;
    name: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: MMJWTPayload;
        }
    }
}

export const authMMJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "No token provided" });
        return;
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.MM_JWT_SECRET;

    if (!secret) {
        res.status(500).json({ message: "MM_JWT_SECRET not configured" });
        return;
    }

    try {
        const payload = jwt.verify(token, secret) as MMJWTPayload;
        req.user = payload;
        next();
    } catch {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
