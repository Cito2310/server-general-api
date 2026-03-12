import { Request, Response } from "express";
import { DailySummary } from "../dailySummary.model";

export const getDailySummary = async (req: Request, res: Response) => {
    const { date, from, to, lite } = req.query;
    const select = lite === "true" ? "-products" : "";

    if (date) {
        const summary = await DailySummary.findOne({ date }).select(select);
        if (!summary) return res.status(404).json({ message: "Daily summary not found" });
        return res.json(summary);
    }

    if (from && to) {
        const summaries = await DailySummary.find({
            date: { $gte: from, $lte: to },
        })
            .select(select)
            .sort({ date: 1 });
        return res.json(summaries);
    }

    return res.status(400).json({ message: "Provide ?date= or ?from=&to=" });
};
