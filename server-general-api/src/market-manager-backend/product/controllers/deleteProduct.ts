import { Request, Response } from "express";
import { Product } from "../product.model";
import { incrementVersion } from "../../version/incrementVersion";

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, { "options.isActive": false }, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });

    await incrementVersion("productVersion");

    res.json(product);
};
