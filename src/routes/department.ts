import { Router } from "express";
import * as DepartControllers from '../controllers/department'

const router = Router();

router.get('/', DepartControllers.listDepartment);
router.post('/create',DepartControllers.createDepartment);
router.post('/update',DepartControllers.updateDepartment);
router.delete('/delete/:id',DepartControllers.delDepartment)

export default router