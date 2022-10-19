import {Router} from 'express';
import {
    createPassRecord,
    deletePassRecord,
    getPassRecordById,
    getPassRecords,
    updatePassRecord
} from "../controllers/passRecord";
import {validateNotEmptyBody, validateParamId} from "../middlewares/validateRequests";
import { checkAuthenticated } from '../middlewares/auth';

const router: Router = Router();


router.post('/', checkAuthenticated, validateNotEmptyBody,createPassRecord);

router.get('/', checkAuthenticated, getPassRecords);

router.get('/:id', checkAuthenticated, validateParamId, getPassRecordById);

router.put('/:id', checkAuthenticated, validateNotEmptyBody, validateParamId, updatePassRecord);

router.delete('/:id', checkAuthenticated, validateParamId, deletePassRecord);


export { router };