import express from "express";
import * as model from "../models/schedule";
import { sendSuccess } from "../utils/responseHelper";
import { generateScheduleID } from "../utils/tools";

export const listSchedule = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const sch = await model.getListSchedule()

        res.json(sch)
    } catch (error) {
        console.error("Error creating floor:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const listSetSchedule = async (
    req: express.Request,
    res: express.Response
) => {
    const {department} = req.body
    try {
        const setSch = await model.getListSetSchedule(department)

        res.json(setSch)
    } catch (error) {
        console.error("Error creating floor:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const insertSetSchedule = async(
    req: express.Request,
    res: express.Response
)=>{
    try {
        const {
            scheduleName, 
            scheduleDesc , 
            department , 
            created_by, 
            updated_by
        } = req.body

        const newSchedule = await model.insertSetChedule(
            scheduleName, 
            scheduleDesc , 
            department , 
            created_by, 
            updated_by
        )

        res.status(200).json({
            success: true,
            message: 'Success Add Set Schedule',
            data: newSchedule
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

export const insertScheduleControl = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const {
           details,
            employee,
            created_by,
            updated_by
        } = req.body

        const scheduleID = await generateScheduleID()
        const result = await model.insertScheduleControl(
            scheduleID,
            details,
            employee,
            created_by,
            updated_by
        )
        res.status(200).json({
            success: true,
            message: 'Success Add Set Schedule',
            data: result
        })
    } catch (error) {
        
    }
}