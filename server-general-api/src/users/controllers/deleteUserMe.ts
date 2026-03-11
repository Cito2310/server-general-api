import { Request, Response } from "express";
import { UserModel } from "../user.model";

export const deleteUserMe = async(_req: Request, res: Response) => {
    const { id } = res.locals.user;
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.status(204).send();
}
