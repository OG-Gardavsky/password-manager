import { Schema, model } from 'mongoose';

export interface IPassRecord {
    name: string;
    userName: string;
    password: string;
    owner: number;
    loginLink?: string;
}

const passRecordSchema = new Schema<IPassRecord>({
    name: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    owner: { type: Number, required: true },
    loginLink: { type: String, required: false },
});

passRecordSchema.index({ "name" : 1 },
{   collation: {
            locale : 'cs',
            strength : 2
        }
})

export const PassRecord = model<IPassRecord>('PassRecord', passRecordSchema);