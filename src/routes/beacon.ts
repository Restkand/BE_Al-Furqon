import { Router } from "express";
import * as BeaconControllers from '../controllers/beacon'

const router = Router();

router.get('/', BeaconControllers.listBeac);
router.post('/create',BeaconControllers.createBeac);
router.post('/update',BeaconControllers.updateBeac);
router.post('/delete',BeaconControllers.deleteBeac)

export default router