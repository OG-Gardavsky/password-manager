import {isValidObjectId} from "mongoose";
import {RequestHandler} from "express";
import {logError} from "../utils";

export const validateParamId: RequestHandler = (req, res, next) => {
    const paramId = req.params.id;

    if (!paramId) {
        logError('Missing id parameter in URL');
        return res.status(404).send({error: 'Missing id parameter in URL'})
    }

    if (!isValidObjectId(paramId)) {
        const errMsg = `Params id: '${paramId}' is not valid ObjectId.`;
        logError(errMsg);
        return res.status(404).send({error: errMsg});
    }
    next();
}

export const validateNotEmptyBody: RequestHandler = (req, res, next) => {
    console.log(req.body)
    if (!req.body || Object.keys(req.body).length < 1) {
        return res.status(400).send({error: 'missing body of request'});
    }
    next();
}


