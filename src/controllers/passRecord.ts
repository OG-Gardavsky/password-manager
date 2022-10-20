import { RequestHandler} from "express";
import {HydratedDocument} from "mongoose";
import {IPassRecord, PassRecord} from "../models/passRecord";
import {getUserIdFromSession, logError, logUserAction, userActionsEnum} from "../utils";

const user: string = 'John doe';

const findRecordById: Function = async (req: any,res: any): Promise<HydratedDocument<IPassRecord> | null>  => {
    const passRecord: HydratedDocument<IPassRecord> | null = await PassRecord.findOne({
        _id: req.params.id,
        owner: getUserIdFromSession(req),
    });
    return passRecord;
}

export const createPassRecord: RequestHandler = async (req, res, next) => {
    const passRecord: HydratedDocument<IPassRecord>  = new PassRecord({
        ...req.body,
        owner: getUserIdFromSession(req)
    })

    try {
        await passRecord.validate();
    } catch (err) {
        logError(`PassRecord for user ${user} was not save due to validation errors`)
        return res.status(400).send(err);
    }

    try {
        await passRecord.save();
        logUserAction(user, userActionsEnum.POST, passRecord.name);

        res.send(passRecord);
        next();
    } catch (err) {
        logError(err);
        return res.status(500).send({error: 'Unexpected server error'});
    }
}

export const getPassRecords: RequestHandler = async (req, res, next) => {
    try {
        const passRecords: HydratedDocument<IPassRecord>[] = await PassRecord.find({
            owner: getUserIdFromSession(req),
        });
        res.send(passRecords);
        next();
    } catch (err) {
        logError(err)
        return res.status(500).send({error: 'Unexpected server error'});
    }
}

export const getPassRecordById: RequestHandler = async (req, res, next) => {
    try {
        const passRecord = await findRecordById(req, res);
        if (!passRecord) {
            return res.status(404).send();
        }

        res.send(passRecord);
        logUserAction(user, userActionsEnum.GET, passRecord.name);
        next();
    } catch (err) {
        logError(err);
        return res.status(500).send({error: 'Unexpected server error'});
    }
}

export const searchPassRecord: RequestHandler = async (req, res, next) => {
    // const searchedResult = req.params.searched.toLowerCase();
    //
    // console.log(searchedResult)
    //
    // const results = await PassRecord.find(
    //     {
    //         $text: { $search: searchedResult, $caseSensitive: false }
    //     })
    //
    // res.send(results)


    const searchedResult = req.params.searched.toLowerCase();
    const rgx = (pattern: string) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(searchedResult);

    const peers = await PassRecord.find({
        $or: [
            { name: { $regex: searchRgx, $options: "i" } },
            // { email: { $regex: searchRgx, $options: "i" } },
        ],
    })

    // const results = await PassRecord.find(
    //     {
    //         $text: { $search: searchedResult, $caseSensitive: false }
    //     })
    //     .limit(2)

    res.status(200).send(peers)
}

export const updatePassRecord: RequestHandler = async (req, res, next) => {
    const allowedUpdates =  ['name', 'userName', 'password', 'loginLink'];
    const receivedKeys = Object.keys(req.body);

    const isOperationValid = receivedKeys.every((key) => allowedUpdates.includes(key));
    if (!isOperationValid) {
        return res.status(400).send({ error: 'Invalid body of request, in request should be only fields ' + allowedUpdates.toString()});
    }

    try {
        const passRecord = await findRecordById(req, res);
        if (!passRecord) {
            return res.status(404).send();
        }

        receivedKeys.forEach((key) => passRecord[key] = req.body[key])
        await passRecord.save();
        logUserAction(user, userActionsEnum.PUT, passRecord.name);

        res.send(passRecord);
    } catch (err) {
        logError(err);
        return res.status(500).send({error: 'Unexpected server error'});
    }
}

export const deletePassRecord: RequestHandler = async (req, res, next) => {
   try {
       const passRecord = await findRecordById(req, res);
       if (!passRecord) {
           return res.status(404).send();
       }

       await passRecord.remove();
       logUserAction(user, userActionsEnum.DELETE, passRecord.name);
       res.send();

   } catch (err) {
       logError(err);
       return res.status(500).send({error: 'Unexpected server error'});
   }
}