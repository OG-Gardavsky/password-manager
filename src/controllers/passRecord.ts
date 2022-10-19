import { RequestHandler} from "express";
import {HydratedDocument} from "mongoose";
import {IPassRecord, PassRecord} from "../models/passRecord";
import {getUserIdFromSession, logError, logUserAction, userActionsEnum} from "../utils";

const user: string = 'John doe';

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
        const passRecord: HydratedDocument<IPassRecord> | null = await PassRecord.findOne({
            _id: req.params.id,
            owner: getUserIdFromSession(req),
        });
        if (!passRecord) {
            return res.status(404).send();
        }
        res.send(passRecord);
        logUserAction(user, userActionsEnum.GET, passRecord.name)
        next();
    } catch (err) {
        logError(err);
        return res.status(500).send({error: 'Unexpected server error'});
    }
}

export const updatePassRecord: RequestHandler = async (req, res, next) => {
    const allowedUpdates =  ['name', 'userName', 'password', 'loginLink'];

    Object.keys(req.body)


}

export const deletePassRecord: RequestHandler = async (req, res, next) => {

}