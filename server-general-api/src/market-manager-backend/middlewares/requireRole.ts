import { Request, Response, NextFunction } from "express";

export const requireRole = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        if (!roles.includes(req.user.role)) {
            res.status(403).json({ message: "Forbidden" });
            return;
        }

        next();
    };
};
