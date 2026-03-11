import { Request, Response } from "express";
import { UserModel } from "../user.model";

export const getUserMe = async(_req: Request, res: Response) => {
    const { id } = res.locals.user;

    const user = await UserModel.findById(id).select("-password");
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    res.json(user);
}
