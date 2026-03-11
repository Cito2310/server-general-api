import { Schema, model } from "mongoose";

interface IMMUser {
    name: string;
    password: string;
    role: "admin" | "cajero" | "encargado";
    isActive: boolean;
}

const mmUserSchema = new Schema<IMMUser>(
    {
        name: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["admin", "cajero", "encargado"], required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const MMUser = model<IMMUser>("MMUser", mmUserSchema);
