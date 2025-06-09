import { Request, Response, Router } from "express";
import * as EmployeeControllers from '../controllers/employee'
import { upload } from "../utils/upload";
import path from "path";
import fs from 'fs'

const router = Router();

router.get('/', EmployeeControllers.listEmployee);
router.post('/dropdownemploy',EmployeeControllers.optionEmployee)
router.post('/insert',upload.single('image'),EmployeeControllers.insertEmployee)
router.post('/update',upload.single('image'),EmployeeControllers.updateEmploy)
router.post('/detail',EmployeeControllers.listDetailEmploy)
router.post('/employee',EmployeeControllers.deleteEmploy)
// router.post('/create',upload.single('image'),FloorControllers.createFloor);
// router.get('/image/:id',FloorControllers.getMapFloorByID);
// router.post('/update',FloorControllers.updateFloor);
// router.delete('/delete/:id',FloorControllers.delFloor)

export default router