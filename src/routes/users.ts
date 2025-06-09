import { Router } from "express";
import * as UserControllers from '../controllers/users'

const router = Router();

router.get('/', UserControllers.listUser);
router.post('/create',UserControllers.createUser);
router.post('/update',UserControllers.updateUser);
router.post('/delete',UserControllers.deleteUser)

export default router