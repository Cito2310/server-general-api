import { Request, Response } from "express";
import { Category } from "../category.model";
import { incrementVersion } from "../../version/incrementVersion";

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { _id, __v, ...updates } = req.body;

        const category = await Category.findByIdAndUpdate(id, updates, { new: true });
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }

        await incrementVersion("categoryVersion");

        res.json(category);
    } catch (error: any) {
        if (error.code === 11000) {
            res.status(409).json({ message: "Category name already exists" });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
    }
};
