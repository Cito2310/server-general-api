import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../user.model";

const SALT_ROUNDS = 10;

export const updateUserMe = async(req: Request, res: Response) => {
    const { password, ...rest } = req.body;
    const updateData: Record<string, unknown> = { ...rest };

    if (password) {
        updateData.password = await bcrypt.hash(password, SALT_ROUNDS);
    }

    const { id } = res.locals.user;
    const user = await UserModel.findByIdAndUpdate(id, updateData, { new: true }).select("-password");
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.json(user);
}
