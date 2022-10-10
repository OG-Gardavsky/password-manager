import { connect } from 'mongoose';
import { generalConfig } from '../config/generalConfig';


export const dbConnect = async () => {
    try {
        await connect(String(generalConfig.mongoDbAddress))
        console.log(`connected to db: '${generalConfig.mongoDbAddress}'`);
    } catch (err) {
        console.error(generalConfig.mongoDbAddress, err);
    }
}
