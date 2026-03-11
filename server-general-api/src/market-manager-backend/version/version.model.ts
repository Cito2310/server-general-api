import { Schema, model } from "mongoose";

interface IMMVersion {
    productVersion: number;
    categoryVersion: number;
    imageVersion: number;
    userVersion: number;
    dailySummaryVersion: number;
}

const mmVersionSchema = new Schema<IMMVersion>({
    productVersion: { type: Number, default: 0 },
    categoryVersion: { type: Number, default: 0 },
    imageVersion: { type: Number, default: 0 },
    userVersion: { type: Number, default: 0 },
    dailySummaryVersion: { type: Number, default: 0 },
});

export const MMVersion = model<IMMVersion>("MMVersion", mmVersionSchema);
