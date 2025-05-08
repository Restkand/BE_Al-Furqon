import { Router } from "express";
import * as FloorControllers from '../controllers/floor'

const router = Router();

router.get('/', FloorControllers.listFloor);
router.post('/create',FloorControllers.createFloor);
router.post('/update',FloorControllers.updateFloor);
router.delete('/delete/:id',FloorControllers.delFloor)

export default router