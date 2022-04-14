import mongoose, { Document, Schema } from 'mongoose';

export interface InstanceService extends Document {}

const ClientSchema: Schema = new Schema(
    {
        group: { type: String, required: true },
        meta: { required: false }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<InstanceService>('Client', ClientSchema);