import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../../users/user.model";

export const login = async(req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET!,
        { expiresIn: "8h" }
    );

    res.json({ token });
}
