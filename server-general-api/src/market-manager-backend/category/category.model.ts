import { Schema, model } from "mongoose";

interface ISubcategory {
    name: string;
    brands: string[];
}

interface ICategory {
    name: string;
    primary: string;
    subcategories: ISubcategory[];
    isActive: boolean;
}

const subcategorySchema = new Schema<ISubcategory>(
    {
        name: { type: String, required: true },
        brands: [{ type: String }],
    },
    { _id: false }
);

const categorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: true, unique: true },
        primary: { type: String, required: true },
        subcategories: [subcategorySchema],
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const Category = model<ICategory>("Category", categorySchema);
