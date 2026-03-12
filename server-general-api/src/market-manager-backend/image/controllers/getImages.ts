import { Request, Response } from "express";
import { Image } from "../image.model";

export const getImages = async (req: Request, res: Response) => {
    const all = req.query.all === "true";
    const filter = all ? {} : { isActive: true };

    const images = await Image.find(filter).select("-base64");
    res.json(images);
};
