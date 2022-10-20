import {Router} from 'express';
import {
    createPassRecord,
    deletePassRecord,
    getPassRecordById,
    getPassRecords, searchPassRecord,
    updatePassRecord
} from "../controllers/passRecord";
import {validateNotEmptyBody, validateParamId} from "../middlewares/validateRequests";
import { checkAuthenticated } from '../middlewares/auth';

const router: Router = Router();


router.post('/', checkAuthenticated, validateNotEmptyBody,createPassRecord);

router.get('/', checkAuthenticated, getPassRecords);

router.get('/id::id', checkAuthenticated, validateParamId, getPassRecordById);

// router.get('/searched::searched', checkAuthenticated, searchPassRecord);
router.get('/searched::searched', searchPassRecord);

router.put('/id::id', checkAuthenticated, validateNotEmptyBody, validateParamId, updatePassRecord);

router.delete('/id::id', checkAuthenticated, validateParamId, deletePassRecord);


export { router };