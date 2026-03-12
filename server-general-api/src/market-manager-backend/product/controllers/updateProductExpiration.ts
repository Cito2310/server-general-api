import { Request, Response } from "express";
import { Product } from "../product.model";

export const updateProductExpiration = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { subtractQuantity } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let remaining = subtractQuantity;

    const batches = product.expiration.batches.sort(
        (a, b) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime()
    );

    for (const batch of batches) {
        if (remaining <= 0) break;

        if (batch.quantity <= remaining) {
            remaining -= batch.quantity;
            batch.quantity = 0;
        } else {
            batch.quantity -= remaining;
            remaining = 0;
        }
    }

    product.expiration.batches = batches.filter(b => b.quantity > 0);

    await product.save();

    res.json(product);
};
