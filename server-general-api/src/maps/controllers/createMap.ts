import { Request, Response } from "express";
import { MapModel } from "../map.model";

export const createMap = async (req: Request, res: Response) => {
    const { id } = res.locals.user;
    const { title, nodes } = req.body;

    const map = await MapModel.create({ title, owner: id, nodes: nodes ?? [] });
    res.status(201).json(map);
};
