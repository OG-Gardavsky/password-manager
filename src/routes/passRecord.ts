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


router.post('/', checkAuthenticated, createPassRecord);

router.get('/', checkAuthenticated, getPassRecords);

router.get('/:id', checkAuthenticated, validateParamId, getPassRecordById);

router.put('/:id', checkAuthenticated, validateParamId, updatePassRecord);

router.delete('/:id', checkAuthenticated, validateParamId, deletePassRecord);


export { router };