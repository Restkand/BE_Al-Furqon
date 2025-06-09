import { Router } from "express";
import * as VendorControllers from '../controllers/vendor'

const router = Router();

router.get('/', VendorControllers.listVendor);
router.get('/detail/:id', VendorControllers.listVendorID);
router.post('/create',VendorControllers.createVendor);
router.post('/update',VendorControllers.updateVendor);
router.post('/delete',VendorControllers.delVendor)

export default router