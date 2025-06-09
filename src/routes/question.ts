import { Router } from "express";
import * as QuestionController from '../controllers/question'

const router = Router();

router.get('/',QuestionController.listQre);
router.post('/create',QuestionController.createQrelist);
router.post('/createdetail',QuestionController.createQreDetail);
router.post('/detail',QuestionController.listDetailQre);
router.post('/update',QuestionController.updateQre);
router.post('/updatedetail',QuestionController.updateQreDetail);
router.post('/delete',QuestionController.deleteQre);
router.post('/deletedetail',QuestionController.deleteQreDetail)

export default router