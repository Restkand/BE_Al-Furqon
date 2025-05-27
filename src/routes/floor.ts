import { Router } from "express";
import * as FloorControllers from '../controllers/floor'
import { upload } from "../utils/upload";

const router = Router();

router.get('/', FloorControllers.listFloor);
router.post('/create',upload.single('image'),FloorControllers.createFloor);
router.post('/listfloor',FloorControllers.getListfloorBySite);
router.get('/image/:id',FloorControllers.getMapFloorByID);
router.post('/update',FloorControllers.updateFloor);
router.delete('/delete/:id',FloorControllers.delFloor)

export default router