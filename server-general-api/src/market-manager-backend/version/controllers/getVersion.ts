import { Request, Response } from "express";
import { MMVersion } from "../version.model";

export const getVersion = async (req: Request, res: Response) => {
    try {
        const version = await MMVersion.findOneAndUpdate(
            {},
            {},
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        res.json(version);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
