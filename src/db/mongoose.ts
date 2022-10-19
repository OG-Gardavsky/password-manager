import { connect } from 'mongoose';
import { mongoDbAddress } from '../config/generalConfig';


export const dbConnect = async () => {
    try {
        await connect(String(mongoDbAddress))
        console.log(`connected to db: '${mongoDbAddress}'`);
    } catch (err) {
        console.error(mongoDbAddress, err);
    }
}
