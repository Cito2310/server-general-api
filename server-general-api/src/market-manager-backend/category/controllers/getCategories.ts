import { Request, Response } from "express";
import { Category } from "../category.model";

export const getCategories = async (req: Request, res: Response) => {
    try {
        const filter = req.query.all === "true" ? {} : { isActive: true };
        const categories = await Category.find(filter);
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
