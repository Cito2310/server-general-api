import { Request, Response } from "express";
import { Product } from "../product.model";

export const updateProductStock = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { newStock, subtractStock } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (newStock !== undefined) {
        product.stock.currentStock = newStock;
    } else if (subtractStock !== undefined) {
        product.stock.currentStock = Math.max(0, product.stock.currentStock - subtractStock);
    }

    await product.save();

    res.json(product);
};
