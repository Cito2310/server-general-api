import { Request, Response } from "express";
import { Product } from "../product.model";

export const getProducts = async (req: Request, res: Response) => {
    const all = req.query.all === "true";
    const filter = all ? {} : { "options.isActive": true };

    const products = await Product.find(filter);
    res.json(products);
};
