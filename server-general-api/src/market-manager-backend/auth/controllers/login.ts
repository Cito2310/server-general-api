import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { MMUser } from "../../users/mmUser.model";

export const login = async (req: Request, res: Response) => {
    try {
        const { name, password } = req.body;

        const user = await MMUser.findOne({ name });
        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        if (!user.isActive) {
            res.status(403).json({ message: "User is inactive" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign(
            { id: user._id, name: user.name, role: user.role },
            process.env.MM_JWT_SECRET!,
            { expiresIn: "24h" }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
