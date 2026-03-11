import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { MMUser } from "../mmUser.model";
import { incrementVersion } from "../../version/incrementVersion";

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { _id, __v, password, ...updates } = req.body;
        if (password !== undefined) updates.password = await bcrypt.hash(password, 10);

        const user = await MMUser.findByIdAndUpdate(id, updates, { new: true }).select("-password");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        await incrementVersion("userVersion");

        res.json(user);
    } catch (error: any) {
        if (error.code === 11000) {
            res.status(409).json({ message: "Name already exists" });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
    }
};
