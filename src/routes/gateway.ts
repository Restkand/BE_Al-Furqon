import { Router } from "express";
import * as GatewayControllers from '../controllers/gateway'

const router = Router();

router.get('/', GatewayControllers.listGate);
router.post('/create',GatewayControllers.createGateway);
router.post('/listgatebyroute',GatewayControllers.listGatewayByRoute);
router.post('/listgate',GatewayControllers.listGateByFloor);
router.post('/update',GatewayControllers.updateGateway);
router.post('/delete',GatewayControllers.delBeac)

export default router