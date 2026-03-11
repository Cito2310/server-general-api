import { Request, Response } from "express";
import { MapModel } from "../map.model";

export const updateMap = async (req: Request, res: Response) => {
    const { id } = res.locals.user;

    const map = await MapModel.findById(req.params.id);
    if (!map) {
        res.status(404).json({ message: "Map not found" });
        return;
    }

    if (map.owner.toString() !== id) {
        res.status(403).json({ message: "Access denied" });
        return;
    }

    const { title, nodes } = req.body;
    const updated = await MapModel.findByIdAndUpdate(
        req.params.id,
        { title, nodes },
        { new: true }
    );

    res.json(updated);
};
