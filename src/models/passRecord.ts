import { Schema, model } from 'mongoose';

export interface IPassRecord {
    name: string;
    userName: string;
    password: string;
    owner: string;
    loginLink?: string;
}

const passRecordSchema = new Schema<IPassRecord>({
    name: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    owner: { type: String, required: true },
    loginLink: { type: String, required: false },
});

passRecordSchema.index( { name: 'text', userName: 'text' } );


export const PassRecord = model<IPassRecord>('PassRecord', passRecordSchema);