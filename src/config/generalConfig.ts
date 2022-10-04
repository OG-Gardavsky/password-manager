import dotenv from 'dotenv';

dotenv.config();

export const generalConfig = {
    mongoDbAddress: process.env.MONGO_DB_ADDRESS,

}