import { Router } from "express";
import * as AlertControllers from '../controllers/alert'

const router = Router();

router.post('/create',AlertControllers.insertAlibi);
router.get('/listAlibi',AlertControllers.listAlibi);
export default router
