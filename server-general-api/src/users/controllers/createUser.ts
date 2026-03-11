import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../user.model";

const SALT_ROUNDS = 10;

export const createUser = async(req: Request, res: Response) => {
    const { username, password } = req.body;

    const exists = await UserModel.findOne({ username });
    if (exists) {
        res.status(409).json({ message: "Username already taken" });
        return;
    }

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await UserModel.create({ username, password: hashed });
    const { password: _, ...data } = user.toObject();
    res.status(201).json(data);
}
