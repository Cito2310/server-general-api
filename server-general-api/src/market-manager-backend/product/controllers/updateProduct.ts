import { Request, Response } from "express";
import { Product } from "../product.model";
import { incrementVersion } from "../../version/incrementVersion";

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { _id, __v, ...updates } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const newPrice = updates?.info?.price;
    const priceChanged = newPrice !== undefined && newPrice !== product.info.price;

    if (priceChanged) {
        updates["$push"] = {
            "extrainfo.priceHistory": { date: new Date(), price: newPrice },
        };
    }

    await Product.findByIdAndUpdate(id, updates, { new: true });
    const updated = await Product.findById(id);

    await incrementVersion("productVersion");

    res.json(updated);
};
