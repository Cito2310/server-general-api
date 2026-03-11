import { Request, Response } from "express";
import { Category } from "../category.model";
import { incrementVersion } from "../../version/incrementVersion";

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const category = await Category.findByIdAndUpdate(id, { isActive: false }, { new: true });
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }

        await incrementVersion("categoryVersion");

        res.json(category);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
