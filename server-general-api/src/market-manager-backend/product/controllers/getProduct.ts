import { Request, Response } from "express";
import { Product } from "../product.model";

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
};
