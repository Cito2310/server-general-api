import { Request, Response } from "express";
import { Image } from "../image.model";
import { incrementVersion } from "../../version/incrementVersion";

export const updateImage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { _id, __v, ...updates } = req.body;

    const image = await Image.findByIdAndUpdate(id, updates, { new: true });
    if (!image) return res.status(404).json({ message: "Image not found" });

    await incrementVersion("imageVersion");

    res.json(image);
};
