import { Router } from "express";
import * as AlertControllers from "../controllers/alert";

const router = Router();

router.post("/createAlibi", AlertControllers.insertAlibi);
router.post("/updateAlibi", AlertControllers.updateAlibi);
router.post("/deleteAlibi", AlertControllers.deleteAlibi);
router.get("/listAlibi", AlertControllers.listAlibi);
router.get("/listAlertType", AlertControllers.listAlertType);
router.post("/insertAlertType", AlertControllers.insertAlertType);
router.post("/updateAlertType", AlertControllers.updateAlertType);
router.post("/deleteAlertType", AlertControllers.deleteAlertType);
router.post("/insertAlert", AlertControllers.insertAlert);
router.get("/", AlertControllers.listAlert);
router.get("/statusAlert", AlertControllers.statusAlert);
export default router;
