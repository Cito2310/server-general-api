import { Request, Response } from "express";
import { Category } from "../category.model";
import { incrementVersion } from "../../version/incrementVersion";

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, primary, subcategories } = req.body;

        const category = await Category.create({ name, primary, subcategories });
        await incrementVersion("categoryVersion");

        res.status(201).json(category);
    } catch (error: any) {
        if (error.code === 11000) {
            res.status(409).json({ message: "Category name already exists" });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
    }
};
