import { Router } from "express";
import * as ZoneControllers from '../controllers/zone'

const router = Router();

router.get('/',ZoneControllers.listZone)
router.post('/create',ZoneControllers.createZone)
router.post('/listDetail',ZoneControllers.listDetailZone)
router.post('/updateDetail',ZoneControllers.insertDetailZone)
router.post('/delete',ZoneControllers.deleteZone)

export default router