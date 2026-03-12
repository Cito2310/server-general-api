import { Request, Response } from "express";
import { Product } from "../product.model";
import { incrementVersion } from "../../version/incrementVersion";

export const createProduct = async (req: Request, res: Response) => {
    const { options, info, extrainfo, expiration, stock } = req.body;

    const product = await Product.create({ options, info, extrainfo, expiration, stock });
    await incrementVersion("productVersion");

    res.status(201).json(product);
};
