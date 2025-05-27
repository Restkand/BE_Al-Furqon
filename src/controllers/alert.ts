import express from "express";
import * as model from "../models/alert";
import { generateAlibiID } from "../utils/tools";

export const listAlibi = async(
    req: express.Request,
    res: express.Response
)=>{
    try {
        const list = await model.listAlibi()
        res.json(list).status(200)
    } catch (error) {
        console.error("Error creating floor:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const insertAlibi = async(
    req: express.Request,
        res: express.Response
) => {
    try {
        const {
            name,
            created_by, 
            updated_by
        } = req.body

        const alibicode = await generateAlibiID()
        const result = await model.insertAlibi(
            alibicode,
            name,
            created_by, 
            updated_by
        )
        res.status(200).json({
            success: true,
            message: 'Success Add Alibi',
            data: result
        })
    } catch (error : any) {
        console.error('Insert failed:', error);
        res.status(500).json({
            success: false,
            message: 'Error Fetch Insert',
            error: error.message
        })
    }
}