import { Router } from "express";
import * as ScheduleControllers from '../controllers/schedule'
import { upload } from "../utils/upload";

const router = Router();

router.get('/', ScheduleControllers.listSchedule);
router.post('/setSchedule', ScheduleControllers.listSetSchedule);
router.post('/create',ScheduleControllers.insertSetSchedule);
router.post('/updateSetSchedule',ScheduleControllers.updateSetSchedule);
router.post('/deleteSetSchedule',ScheduleControllers.deleteSetSchedule);
router.post('/createschedulecontrol',ScheduleControllers.insertScheduleControl)
router.post('/updateScheduleControl',ScheduleControllers.updateSchControl);
// router.get('/image/:id',FloorControllers.getMapFloorByID);
// router.post('/update',FloorControllers.updateFloor);
// router.delete('/delete/:id',FloorControllers.delFloor)

export default router