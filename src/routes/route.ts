import { Router } from "express";
import * as RouteControllers from '../controllers/route'

const router = Router();

router.get('/', RouteControllers.listRoute);
router.get('/dropdownroute',RouteControllers.dropDownRoute);
router.post('/listRoute', RouteControllers.listRouteByID);
// router.get('/detail/:id', VendorControllers.listVendorID);
router.post('/create',RouteControllers.createRoute);
router.post('/createroute',RouteControllers.createRouteNew)
// router.post('/update',VendorControllers.updateVendor);
// router.delete('/delete/:id',VendorControllers.delVendor)

export default router