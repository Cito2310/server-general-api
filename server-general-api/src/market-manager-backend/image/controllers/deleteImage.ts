import { Request, Response } from "express";
import { Image } from "../image.model";
import { incrementVersion } from "../../version/incrementVersion";

export const deleteImage = async (req: Request, res: Response) => {
    const { id } = req.params;

    const image = await Image.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!image) return res.status(404).json({ message: "Image not found" });

    await incrementVersion("imageVersion");

    res.json(image);
};
