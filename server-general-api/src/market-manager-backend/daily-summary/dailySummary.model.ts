import { Schema, model, Types } from "mongoose";

interface IShiftSummary {
    totalTickets: number;
    totalAmount: number;
    methodPayment: Map<string, number>;
}

interface IProductSummary {
    productId: Types.ObjectId;
    name: string;
    quantitySold: number;
    totalAmount: number;
}

interface IDailySummary {
    date: string;
    totalTickets: number;
    totalAmount: number;
    methodPayment: Map<string, number>;
    morning: IShiftSummary;
    night: IShiftSummary;
    products: IProductSummary[];
}

const shiftSummarySchema = new Schema<IShiftSummary>(
    {
        totalTickets: { type: Number, default: 0 },
        totalAmount: { type: Number, default: 0 },
        methodPayment: { type: Map, of: Number, default: {} },
    },
    { _id: false }
);

const productSummarySchema = new Schema<IProductSummary>(
    {
        productId: { type: Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        quantitySold: { type: Number, required: true },
        totalAmount: { type: Number, required: true },
    },
    { _id: false }
);

const dailySummarySchema = new Schema<IDailySummary>(
    {
        date: { type: String, required: true, unique: true },
        totalTickets: { type: Number, default: 0 },
        totalAmount: { type: Number, default: 0 },
        methodPayment: { type: Map, of: Number, default: {} },
        morning: { type: shiftSummarySchema, default: () => ({}) },
        night: { type: shiftSummarySchema, default: () => ({}) },
        products: [productSummarySchema],
    },
    { timestamps: true }
);

export const DailySummary = model<IDailySummary>("MMDailySummary", dailySummarySchema);
