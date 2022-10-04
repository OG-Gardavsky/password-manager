import { Schema, model } from 'mongoose';

export interface IPassRecord {
    name: string;
    userName: string;
    password: string;
    loginLink?: string;
}

const passRecordSchema = new Schema<IPassRecord>({
    name: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    loginLink: { type: String, required: false },
});

export const PassRecord = model<IPassRecord>('PassRecord', passRecordSchema);