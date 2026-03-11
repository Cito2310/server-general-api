import { Schema, model, Document, Types } from "mongoose";

interface INode {
    _id: Types.ObjectId;
    label: string;
    description?: string;
    type: string;
    children: Types.ObjectId[];
}

export interface IMap extends Document {
    title: string;
    owner: Types.ObjectId;
    nodes: INode[];
}

const nodeSchema = new Schema<INode>({
    label: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    type: { type: String, required: true, trim: true },
    children: { type: [Schema.Types.ObjectId], default: [] },
});

const mapSchema = new Schema<IMap>(
    {
        title: { type: String, required: true, trim: true },
        owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
        nodes: { type: [nodeSchema], default: [] },
    },
    { timestamps: true }
);

export const MapModel = model<IMap>("Map", mapSchema);
