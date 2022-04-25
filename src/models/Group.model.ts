const {Schema} = require("mongoose");
import mongoose from "mongoose";

export interface GroupInterface extends Document {}

const GroupSchema: typeof Schema = new Schema(
    {
        group: { type: Schema.Types.ObjectId, required: true, ref: "Instance"},
        instances: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const GroupModel = mongoose.model<GroupInterface>("Group", GroupSchema);
module.exports = GroupModel;