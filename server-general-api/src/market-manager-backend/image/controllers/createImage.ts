import { Request, Response } from "express";
import { Image } from "../image.model";
import { incrementVersion } from "../../version/incrementVersion";

export const createImage = async (req: Request, res: Response) => {
    const { name, base64 } = req.body;

    const image = await Image.create({ name, base64 });
    await incrementVersion("imageVersion");

    res.status(201).json(image);
};
