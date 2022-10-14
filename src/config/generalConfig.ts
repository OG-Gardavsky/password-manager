import dotenv from 'dotenv';

dotenv.config();

export const generalConfig = {
    mongoDbAddress: process.env.MONGO_DB_ADDRESS,
    googleAuthclientID: process.env.GOOGLE_AUTH_CLIENT_ID,
    googleAuthclientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
}