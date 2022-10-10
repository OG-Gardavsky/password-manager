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
