import { Request, Response } from "express";
import { MMUser } from "../mmUser.model";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const filter = req.query.all === "true" ? {} : { isActive: true };
        const users = await MMUser.find(filter).select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
