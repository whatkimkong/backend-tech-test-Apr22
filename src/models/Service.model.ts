import mongoose, { Document, Schema } from 'mongoose';

export interface Service extends Document {}

const GroupSchema: Schema = new Schema(
    {
        group: { type: Schema.Types.ObjectId, ref: 'Client'},
        instances: { type: String, required: true }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<Service>('Group', GroupSchema);