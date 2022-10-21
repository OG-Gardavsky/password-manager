import { RequestHandler} from "express";
import {HydratedDocument} from "mongoose";
import {IPassRecord, PassRecord} from "../models/passRecord";
import {getOwnerFromSession, logError, logUserAction, userActionsEnum} from "../utils";



const findRecordById: Function = async (req: any,res: any): Promise<HydratedDocument<IPassRecord> | null>  => {
    const passRecord: HydratedDocument<IPassRecord> | null = await PassRecord.findOne({
        _id: req.params.id,
        owner: getOwnerFromSession(req),
    });
    return passRecord;
}

export const createPassRecord: RequestHandler = async (req, res, next) => {

    let userIdentification: string;
    try {
        userIdentification = getOwnerFromSession(req);
    } catch (err) {
        logError(err);
        return res.status(500).send({error: 'Unexpected server error'});
    }

    const passRecord: HydratedDocument<IPassRecord>  = new PassRecord({
        ...req.body,
        owner: userIdentification
    })

    try {
        await passRecord.validate();
    } catch (err) {
        logError(`PassRecord for user ${userIdentification} was not save due to validation errors`)
        return res.status(400).send(err);
    }

    try {
        await passRecord.save();
        logUserAction(userIdentification, userActionsEnum.POST, passRecord.name);

        res.send(passRecord);
    } catch (err) {
        logError(err);
        return res.status(500).send({error: 'Unexpected server error'});
    }
}

export const getPassRecords: RequestHandler = async (req, res, next) => {
    try {
        const userIdentification: string =  getOwnerFromSession(req);

        const passRecords: HydratedDocument<IPassRecord>[] = await PassRecord.find({
            owner: getOwnerFromSession(req),
        });
        logUserAction(userIdentification, userActionsEnum.GET, 'all his/her passwords');
        res.send(passRecords);
    } catch (err) {
        logError(err)
        return res.status(500).send({error: 'Unexpected server error'});
    }
}

export const getPassRecordById: RequestHandler = async (req, res, next) => {
    try {
        const userIdentification: string =  getOwnerFromSession(req);

        const passRecord: HydratedDocument<IPassRecord> = await findRecordById(req, res);
        if (!passRecord) {
            return res.status(404).send();
        }

        res.send(passRecord);
        logUserAction(userIdentification, userActionsEnum.GET, passRecord.name);
    } catch (err) {
        logError(err);
        return res.status(500).send({error: 'Unexpected server error'});
    }
}

export const searchPassRecord: RequestHandler = async (req, res, next) => {

    if (!req.params.searched) {
        return res.status(400).send({error: 'Missing parameter "searched" '});
    }

    try {
        const userIdentification: string =  getOwnerFromSession(req);

        const searched = req.params.searched.toLowerCase();
        const resultsDiacritics = await PassRecord.find(
            { owner: getOwnerFromSession(req), $text: { $search: searched } }
        );

        const searchRgx = new RegExp(`.*${searched}.*`);
        const resultsPartial = await PassRecord.aggregate([
            { $match: { owner: getOwnerFromSession(req) } },
            { $match: {
                    $or: [
                        { userName: { $regex: searchRgx, $options: "i" } },
                        { name: { $regex: searchRgx, $options: "i" } },
                    ],
                }},
        ]);

        const results = resultsDiacritics.concat(resultsPartial);

        // const ids = results.map(result => result._id.toString());
        // const uniqueIds = [...new Set(ids)];
        // const resultsToSend = uniqueIds.map(id => results.find(result => result._id.toString() === id))

        const uniqueRecordsObject: {[key: string]: Object} = {};
        results.forEach(result => {
            const id = result._id.toString();
            uniqueRecordsObject[id] = result;
        });
        const uniqueRecordIds: string[] = Object.keys(uniqueRecordsObject)
        const resultsToSend: Object[] = uniqueRecordIds.map(recordId => uniqueRecordsObject[recordId]);

        logUserAction(userIdentification, userActionsEnum.GET, `passwords with key ${searched}`);
        res.status(200).send(resultsToSend);
    } catch (err) {
        logError(err);
        return res.status(500).send({error: 'Unexpected server error'});
    }
}

export const updatePassRecord: RequestHandler = async (req, res, next) => {
    const allowedUpdates =  ['name', 'userName', 'password', 'loginLink'];
    const receivedKeys = Object.keys(req.body);

    const isOperationValid = receivedKeys.every((key) => allowedUpdates.includes(key));
    if (!isOperationValid) {
        return res.status(400).send({ error: 'Invalid body of request, in request should be only fields ' + allowedUpdates.toString()});
    }

    try {
        const userIdentification: string =  getOwnerFromSession(req);

        const passRecord = await findRecordById(req, res);
        if (!passRecord) {
            return res.status(404).send();
        }

        receivedKeys.forEach((key) => passRecord[key] = req.body[key])
        await passRecord.save();
        logUserAction(userIdentification, userActionsEnum.PUT, passRecord.name);

        res.send(passRecord);
    } catch (err) {
        logError(err);
        return res.status(500).send({error: 'Unexpected server error'});
    }
}

export const deletePassRecord: RequestHandler = async (req, res, next) => {
   try {
       const passRecord: HydratedDocument<IPassRecord> = await findRecordById(req, res);
       if (!passRecord) {
           return res.status(404).send();
       }

       const userIdentification: string =  getOwnerFromSession(req);

       await passRecord.remove();
       logUserAction(userIdentification, userActionsEnum.DELETE, passRecord.name);
       res.send();

   } catch (err) {
       logError(err);
       return res.status(500).send({error: 'Unexpected server error'});
   }
}