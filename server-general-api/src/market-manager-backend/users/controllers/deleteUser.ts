import { Request, Response } from "express";
import { MMUser } from "../mmUser.model";
import { incrementVersion } from "../../version/incrementVersion";

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await MMUser.findByIdAndUpdate(id, { isActive: false }, { new: true }).select("-password");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        await incrementVersion("userVersion");

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
