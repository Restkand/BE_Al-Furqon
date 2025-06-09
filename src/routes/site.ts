import { Router } from "express";
import * as SiteControllers from '../controllers/site'

const router = Router();

router.get('/', SiteControllers.getListSite);
router.post('/create',SiteControllers.createSite);
router.post('/update',SiteControllers.updateSite);
router.post('/delete',SiteControllers.delSite)

export default router