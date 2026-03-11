import mongoose from "mongoose";

export const connectDB = async(): Promise<void> => {
    const uri = process.env.MONGODB_URL;
    if (!uri) throw new Error("MONGODB_URL is not defined in .env");

    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
}
