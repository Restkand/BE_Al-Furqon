import { Router } from "express";
import * as BeaconControllers from '../controllers/beacon'

const router = Router();

router.get('/', BeaconControllers.listBeac);
router.post('/create',BeaconControllers.createBeac);
router.post('/update',BeaconControllers.updateBeac);
router.delete('/delete/:id',BeaconControllers.delBeac)

export default router