import { Schema, model, Types } from "mongoose";

interface IPriceHistory {
    date: Date;
    price: number;
}

interface IBatch {
    expirationDate: string;
    quantity: number;
    addedAt: Date;
}

interface IProductOptions {
    hasExpirationControl: boolean;
    hasStockControl: boolean;
    isActive: boolean;
}

interface IProductInfo {
    name: string;
    category: string;
    subcategory: string;
    brand: string;
    barcode: string;
    size: number;
    sizeType: "kg" | "g" | "oz" | "cm3" | "l" | "ml" | "u" | "cc";
    price: number;
    unitType: "unit" | "weight";
    imgId: Types.ObjectId | null;
    primary: string;
}

interface IProductExtraInfo {
    priceHistory: IPriceHistory[];
    associatedProduct: string | null;
}

interface IProductExpiration {
    batches: IBatch[];
    alertExpiration: number;
}

interface IProductStock {
    currentStock: number;
    mediumStockAlert: number;
    lowStockAlert: number;
    veryLowStockAlert: number;
}

interface IProduct {
    options: IProductOptions;
    info: IProductInfo;
    extrainfo: IProductExtraInfo;
    expiration: IProductExpiration;
    stock: IProductStock;
}

const priceHistorySchema = new Schema<IPriceHistory>(
    {
        date: { type: Date, required: true },
        price: { type: Number, required: true },
    },
    { _id: false }
);

const batchSchema = new Schema<IBatch>(
    {
        expirationDate: { type: String, required: true },
        quantity: { type: Number, required: true },
        addedAt: { type: Date, default: Date.now },
    },
    { _id: false }
);

const optionsSchema = new Schema<IProductOptions>(
    {
        hasExpirationControl: { type: Boolean, default: false },
        hasStockControl: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
    },
    { _id: false }
);

const infoSchema = new Schema<IProductInfo>(
    {
        name: { type: String, required: true, lowercase: true },
        category: { type: String, required: true, lowercase: true },
        subcategory: { type: String, required: true, lowercase: true },
        brand: { type: String, required: true, lowercase: true },
        barcode: { type: String, required: true, lowercase: true },
        size: { type: Number, required: true },
        sizeType: { type: String, enum: ["kg", "g", "oz", "cm3", "l", "ml", "u", "cc"], required: true },
        price: { type: Number, required: true },
        unitType: { type: String, enum: ["unit", "weight"], required: true },
        imgId: { type: Schema.Types.ObjectId, default: null },
        primary: { type: String, required: true, lowercase: true },
    },
    { _id: false }
);

const extrainfoSchema = new Schema<IProductExtraInfo>(
    {
        priceHistory: [priceHistorySchema],
        associatedProduct: { type: String, default: null, lowercase: true },
    },
    { _id: false }
);

const expirationSchema = new Schema<IProductExpiration>(
    {
        batches: [batchSchema],
        alertExpiration: { type: Number, default: 0 },
    },
    { _id: false }
);

const stockSchema = new Schema<IProductStock>(
    {
        currentStock: { type: Number, default: 0 },
        mediumStockAlert: { type: Number, default: 0 },
        lowStockAlert: { type: Number, default: 0 },
        veryLowStockAlert: { type: Number, default: 0 },
    },
    { _id: false }
);

const productSchema = new Schema<IProduct>(
    {
        options: { type: optionsSchema, default: () => ({}) },
        info: { type: infoSchema, required: true },
        extrainfo: { type: extrainfoSchema, default: () => ({}) },
        expiration: { type: expirationSchema, default: () => ({}) },
        stock: { type: stockSchema, default: () => ({}) },
    },
    { timestamps: true }
);

export const Product = model<IProduct>("MMProduct", productSchema);
