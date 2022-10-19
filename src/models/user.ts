import { Schema, model } from 'mongoose';

export interface IUser {
    email: string;
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true },
});

export const User = model<IUser>('User', userSchema);