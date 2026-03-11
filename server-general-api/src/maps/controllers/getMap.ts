import { Request, Response } from "express";
import { MapModel } from "../map.model";

export const getMap = async (req: Request, res: Response) => {
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

    res.json(map);
};
