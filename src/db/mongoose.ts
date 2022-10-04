import { Mongoose } from 'mongoose';
import mongoose from 'mongoose';
import { generalConfig } from '../config/generalConfig';

export const dbConnect = () => {
    mongoose.connect(String(generalConfig.mongoDbAddress))
        .then((mongoose: Mongoose) => console.log(`connected to db: '${generalConfig.mongoDbAddress}'`))
        .catch((err) => console.error(generalConfig.mongoDbAddress, err))
}

