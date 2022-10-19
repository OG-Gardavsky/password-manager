import {Router} from 'express';
import {
    createPassRecord,
    deletePassRecord,
    getPassRecordById,
    getPassRecords,
    updatePassRecord
} from "../controllers/passRecord";
import {validateParamId} from "../middlewares/validateParams";
import { checkAuthenticated } from '../middlewares/auth';

const router: Router = Router();


router.post('/', createPassRecord);

router.get('/', checkAuthenticated, getPassRecords);

router.get('/:id', validateParamId, getPassRecordById);

router.put('/:id', validateParamId, updatePassRecord);

router.delete('/:id', validateParamId, deletePassRecord);


export { router };