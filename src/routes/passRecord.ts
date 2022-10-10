import {Request, Response, Router} from 'express';
import {IPassRecord, PassRecord} from "../models/passRecord";
import {HydratedDocument} from 'mongoose';
import {logError, logUserAction, userActionsEnum} from '../utils';

const router: Router = Router();

//TODO fill user from auth token
const user: string = 'John doe';

router.post('/', async (req: Request, res: Response) => {

    const passRecord: HydratedDocument<IPassRecord>  = new PassRecord({
        ...req.body
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
    } catch (err) {
        logError(err);
        return res.status(500).send({error: 'Unexpected server error'});
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {

        const passRecords: HydratedDocument<IPassRecord>[] = await PassRecord.find();
        res.send(passRecords);

    } catch (err) {
        logError(err)
        return res.status(500).send({error: 'Unexpected server error'});
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {

        const passRecord: HydratedDocument<IPassRecord> | null = await PassRecord.findOne({_id: req.params.id});
        const passRecordRes = !passRecord ? [] : passRecord;
        res.send(passRecordRes);

    } catch (err) {
        logError(err)
        return res.status(500).send({error: 'Unexpected server error'});
    }
});

router.put('/', async (req: Request, res: Response) => {

});

router.delete('/:id', async (req: Request, res: Response) => {

});


export { router };