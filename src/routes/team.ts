import { Router } from "express";
import * as TeamControllers from '../controllers/team'
import { upload } from "../utils/upload";

const router = Router();

router.post('/', TeamControllers.getListTeam);
// router.post('/setSchedule', ScheduleControllers.listSetSchedule);
router.post('/create',TeamControllers.insertTeam);
// router.post('/createschedulecontrol',ScheduleControllers.insertScheduleControl)
// router.get('/image/:id',FloorControllers.getMapFloorByID);
// router.post('/update',FloorControllers.updateFloor);
// router.delete('/delete/:id',FloorControllers.delFloor)

export default router