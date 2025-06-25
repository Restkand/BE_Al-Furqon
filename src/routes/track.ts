import { Router } from "express";
import * as TrackController from "../controllers/track";

const router = Router();

router.post("/", TrackController.listTrack);
router.post("/detail/", TrackController.getTrackByID);
router.post("/create", TrackController.createNewTrack);
router.get("/listType", TrackController.listTrackType);
router.post("/createtype", TrackController.createTrackType);
// router.post('/update',VendorControllers.updateVendor);
// router.post('/delete',VendorControllers.delVendor)

export default router;
