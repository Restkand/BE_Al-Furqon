
import { Request, Response } from "express";
import * as model from "../models/schedule";
import { generateScheduleID } from "../utils/tools";

export const listSchedule = async(
    req: Request,
    res: Response
) => {
    try {
        const sch = await model.getListSchedule()

        res.json(sch)
    } catch (error) {
        console.error("Error creating floor:", error);
         res.status(500).json({ error: "Internal Server Error" });
    }
}

export const listSetSchedule = async (
    req: Request,
    res: Response
) => {
    const {department} = req.body
    try {
        const setSch = await model.getListSetSchedule(department)

        res.json(setSch)
    } catch (error) {
        console.error("Error creating floor:", error);
         res.status(500).json({ error: "Internal Server Error" });
    }
}

export const insertSetSchedule = async(
    req: Request,
    res: Response
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

export const updateSetSchedule = async(
    req: Request,
    res: Response
)=>{
    try {
        const {
            id,
            scheduleName, 
            scheduleDesc , 
            department , 
            updated_by
        } = req.body

        const newSchedule = await model.updateSetChedule(
            id,
            scheduleName, 
            scheduleDesc , 
            department , 
            updated_by
        )

        res.status(200).json({
            success: true,
            message: 'Success Update Set Schedule',
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

export const deleteSetSchedule = async(
    req: Request,
    res: Response
)=>{
    try {
        const {
            id,
            updated_by
        } = req.body

        const newSchedule = await model.deleteSetChedule(
            id, 
            updated_by
        )

        res.status(200).json({
            success: true,
            message: 'Success Delete Set Schedule',
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
    req: Request,
    res: Response
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
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error Fetch Insert',
            error: error.message
        })
    }
}

export const updateSchControl = async(
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const updatedResults = [];
        const {
            details,
            updated_by
        } = req.body
        if (!Array.isArray(details)) {
            return res.status(400).json({ success: false, message: "Invalid details format" });
          }
          for (const detail of details) {
            const { id, set_id, track_id, sch_start, sch_end } = detail;
      
            const updated =  await model.updateScheduleControl(
              id,
              set_id,
              track_id,
              new Date(sch_start),
              new Date(sch_end),
              updated_by
            );
            updatedResults.push(updated);
          }
          res.status(200).json({
            success: true,
            message: "Success update schedule control",
            data: updatedResults
          })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error Fetch Insert',
            error: error.message
        })
    }
}