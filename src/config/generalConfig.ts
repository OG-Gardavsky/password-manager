import dotenv from 'dotenv';

dotenv.config();

export const mongoDbAddress = process.env.MONGO_DB_ADDRESS;
export const googleAuthclientID = String(process.env.GOOGLE_AUTH_CLIENT_ID);
export const googleAuthclientSecret = String(process.env.GOOGLE_AUTH_CLIENT_SECRET);
export const port = process.env.PORT;
export const sessionSecret = String(process.env.PORT);