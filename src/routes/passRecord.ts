import {Router} from 'express';
import {
    createPassRecord,
    deletePassRecord,
    getPassRecordById,
    getPassRecords,
    updatePassRecord
} from "../controllers/passRecord";
import {validateParamId} from "../middlewares/validateParams";

const router: Router = Router();


router.post('/', createPassRecord);

router.get('/', getPassRecords);

router.get('/:id', validateParamId, getPassRecordById);

router.put('/:id', validateParamId, updatePassRecord);

router.delete('/:id', validateParamId, deletePassRecord);


export { router };