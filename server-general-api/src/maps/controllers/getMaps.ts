import { Request, Response } from "express";
import { MapModel } from "../map.model";

export const getMaps = async (_req: Request, res: Response) => {
    const { id } = res.locals.user;
    const maps = await MapModel.find({ owner: id });
    res.json(maps);
};
