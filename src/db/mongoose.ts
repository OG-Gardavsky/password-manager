import { connect } from 'mongoose';
import { mongoDbAddress } from '../config/generalConfig';
import {PassRecord} from "../models/passRecord";


export const dbConnect = async () => {
    try {
        await connect(String(mongoDbAddress))
        console.log(`connected to db: '${mongoDbAddress}'`);

        await PassRecord.createIndexes({name: "text"});

    } catch (err) {
        console.error(mongoDbAddress, err);
    }
}
