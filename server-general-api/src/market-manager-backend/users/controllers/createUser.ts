import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { MMUser } from "../mmUser.model";
import { incrementVersion } from "../../version/incrementVersion";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await MMUser.create({ name, password: hashedPassword, role });

        await incrementVersion("userVersion");

        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(201).json(userWithoutPassword);
    } catch (error: any) {
        if (error.code === 11000) {
            res.status(409).json({ message: "Name already exists" });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
    }
};
