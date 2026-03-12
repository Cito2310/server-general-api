import { Schema, model } from "mongoose";

interface IImage {
    name: string;
    base64: string;
    isActive: boolean;
}

const imageSchema = new Schema<IImage>(
    {
        name: { type: String, required: true },
        base64: { type: String, required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const Image = model<IImage>("MMImage", imageSchema);
