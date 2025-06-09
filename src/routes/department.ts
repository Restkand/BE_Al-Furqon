import { Router } from "express";
import * as DepartControllers from '../controllers/department'

const router = Router();

router.get('/', DepartControllers.listDepartment);
router.post('/create',DepartControllers.createDepartment);
router.post('/update',DepartControllers.updateDepartment);
router.post('/delete',DepartControllers.delDepartment)

export default router