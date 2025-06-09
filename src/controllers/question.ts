import { Request, Response } from "express";
import * as model from "../models/question"
import { generateQuestionID } from "../utils/tools";
export const listQre = async (
    res: Response,
    req: Request
) => {
    try {
        const list = await model.listquestion
        res.status(200).json(list)
    } catch (error) {
        console.error("Error creating beacon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const createQrelist = async(
    res: Response,
    req: Request
) => {
    try {
        const {
            qre_listname,
            qre_point_plus,
            qre_point_min,
            created_by,
            updated_by
        } = req.body
        const qre_id = await generateQuestionID()
        const result = await model.createQuestList(
            qre_id,
            qre_listname,
            qre_point_plus,
            qre_point_min,
            created_by,
            updated_by
        )
        res.status(200).json({
            success: true,
            message: 'Success Insert Questionaire Point',
            data: result
        })
    } catch (error) {
        console.error("Error creating beacon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const createQreDetail = async(
    res: Response,
    req: Request
) => {
    try {
        const {
            detailid,
            question,
            qre_point_plus,
            qre_point_min,
            created_by,
            updated_by
        } = req.body
        const result = await model.createQuestDetail(
            detailid,
            question,
            qre_point_plus,
            qre_point_min,
            created_by,
            updated_by
        )
        res.status(200).json({
            success: true,
            message: "Success Insert Questionaire Detail",
            data: result
        })
    } catch (error) {
        console.error("Error creating beacon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const listDetailQre = async(
    res: Response,
    req: Request
) => {
    try {
        const {
            qre_id
        } = req.body

        const list = await model.listDetailQuest(qre_id)
        res.status(200).json(list)
    } catch (error) {
        console.error("Error creating beacon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const updateQre = async(
    res: Response,
    req: Request
) => {
    try {
        const{
            qre_id,
            qre_for,
            qre_type,
            updated_by
        } = req.body
        const result = await model.updateQre(
            qre_id,
            qre_for,
            qre_type,
            updated_by
        )
        res.status(200).json({
            success: true,
            message: "Update Success",
            data: result
        })
    } catch (error) {
        console.error("Error creating beacon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const updateQreDetail = async(
    res: Response,
    req: Request
) => {
    try {
        const {
            qre_id,
            qre_quest,
            qre_point_plus, 
            qre_point_min,
            question, 
            qre_point_plus_quest, 
            qre_point_min_quesst,
            updated_by 
        } = req.body

        const result = await model.updateQreDetail(
            qre_id,
            qre_quest,
            qre_point_plus, 
            qre_point_min,
            question, 
            qre_point_plus_quest, 
            qre_point_min_quesst,
            updated_by 
        )
        res.status(200).json({
            success: true,
            message: "Update Detail Success",
            data: result
        })
    } catch (error) {
        console.error("Error creating beacon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteQre = async (
    res: Response,
    req: Request
) => {
    try {
        const {
            id,
            updated_by
        } = req.body
        const result = await model.deleteQre(id,updated_by)
        res.status(200).json({
            success: true,
            message: "Success Delete Data",
            data: result
        })
    } catch (error) {
        console.error("Error creating beacon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteQreDetail = async (
    res: Response,
    req: Request
) => {
    try {
        const {
            id,
            updated_by
        } = req.body
        const result = await model.deleteQreDetail(id,updated_by)
        res.status(200).json({
            success: true,
            message: "Success Delete Data",
            data: result
        })
    } catch (error) {
        console.error("Error creating beacon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
