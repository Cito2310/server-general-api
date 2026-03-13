import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { MMUser } from "../mmUser.model";
import { incrementVersion } from "../../version/incrementVersion";
import { isMongoError } from "../../shared/isMongoError";
import { auditLog } from "../../shared/auditLog";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await MMUser.create({ name, password: hashedPassword, role });

        await incrementVersion("userVersion");

        const { password: _, ...userWithoutPassword } = user.toObject();
        auditLog("CREATE", "user", user._id.toString(), req.user?.name ?? "unknown");
        res.status(201).json(userWithoutPassword);
    } catch (error: unknown) {
        if (isMongoError(error) && error.code === 11000) {
            res.status(409).json({ message: "Name already exists" });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
    }
};
