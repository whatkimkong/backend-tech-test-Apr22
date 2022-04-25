const {Schema} = require("mongoose");
import mongoose from "mongoose";

export interface Instance {
    id: string;
    group: string;
    meta?: any;
}

export interface InstanceInterface extends Instance, Document {}

const InstanceSchema: typeof Schema = new Schema(
    {
        id: { type: String, required: true },
        group: { type: String, required: true },
        meta: { required: false }
    },
    {
        timestamps: true,
    }
);

const InstanceModel = mongoose.model<InstanceInterface>("Instance", InstanceSchema);
module.exports = InstanceModel;