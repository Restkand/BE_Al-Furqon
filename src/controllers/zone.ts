import { Request, Response } from "express";
import * as model from "../models/zone"
import { generateZoneID } from "../utils/tools";

export const listZone = async (
    res: Response,
    req: Request
) => {
    try {
        const list = await model.listZone()
        res.status(200).json(list)
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ 
          success: false,
          message: "Internal Server Error" ,
          error: error.message
         });
    }
}

export const createZone = async(
    res: Response,
    req: Request
) => {
    try {
        const {
            zoneName,
            created_by,
            updated_by
        } = req.body
        const zoneID = await generateZoneID()
        const result = await model.addZone(
            zoneID,
            zoneName,
            created_by,
            updated_by
        )
        res.status(200).json({
            success: true,
            message:"Success insert zone",
            data: result
        })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ 
          success: false,
          message: "Internal Server Error" ,
          error: error.message
         });
    }
}

export const insertDetailZone = async(
    res: Response,
    req: Request
) => {
    try {
        const {zone_id, used_gateways = [], unused_gateways = [], created_by, updated_by} = req.body
       
       const result = await model.addDetailZone(
            zone_id, used_gateways , unused_gateways , created_by, updated_by
        )
        res.status(200).json({
            success: true,
            message: "Success Update Zone Detail",
            data: result
        })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ 
          success: false,
          message: "Internal Server Error" ,
          error: error.message
         });
    }
}

export const listDetailZone = async(
    res: Response,
    req: Request
) => {
    try {
        const {zone_id} = req.body
        if (!zone_id || typeof zone_id !== "string") {
             res.status(400).json({ message: "zone_id is required" });
          }
          const result = await model.listDetailZone(zone_id)
          res.status(200).json(result)
    } catch (error : any) {
        console.log(error);
        res.status(500).json({ 
          success: false,
          message: "Internal Server Error" ,
          error: error.message
         });
    }
}



export const deleteZone = async(
    res: Response,
    req: Request
) => {
    try {
        const {zone_id, updated_by} = req.body
        const result = await model.deleteZone(zone_id, updated_by)
        res.status(200).json({
            success: true,
            message: "Success Delete Zone",
            data: result
        })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ 
          success: false,
          message: "Internal Server Error" ,
          error: error.message
         });
    }
}