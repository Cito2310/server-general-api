import { Request, Response } from "express";
import { Image } from "../image.model";

export const getImage = async (req: Request, res: Response) => {
    const { id } = req.params;

    const image = await Image.findById(id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    res.json(image);
};
