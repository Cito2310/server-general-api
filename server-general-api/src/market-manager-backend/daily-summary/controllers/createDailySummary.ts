import { Request, Response } from "express";
import { DailySummary } from "../dailySummary.model";
import { incrementVersion } from "../../version/incrementVersion";

export const createDailySummary = async (req: Request, res: Response) => {
    const { date, totalTickets, totalAmount, methodPayment, morning, night, products } = req.body;

    const existing = await DailySummary.findOne({ date });
    if (existing) return res.status(409).json({ message: "A summary for this date already exists" });

    const summary = await DailySummary.create({
        date,
        totalTickets,
        totalAmount,
        methodPayment,
        morning,
        night,
        products,
    });

    await incrementVersion("dailySummaryVersion");

    res.status(201).json(summary);
};
