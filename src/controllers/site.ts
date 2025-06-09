import { Request, Response } from "express";
import * as model from "../models/site";
// import {getListVendor} from "../models/vendor"
import { sendStatus } from "../utils/responseHelper";

export const getListSite = async(
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const site = await model.getListSite()

        res.status(200).json(site)
    } catch (error: any) {
        console.error("Error creating site:", error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: error.message });
    }
}

export const createSite = async (
    req: Request,
    res: Response
) => {
  try {
    const {
      siteCode,
        site_name,
        site_address,
        site_cluster,
        status,
        created_by,
        updated_by
        
    } = req.body;

    const result = await model.insertSite(
      siteCode,
        site_name,
        site_address,
        site_cluster,
        status,
        created_by,
        updated_by
    );

    res.status(200).json({
      success: true,
      message: 'Success Add Site',
      data: result
  })
  } catch (error:any) {
    console.error("Error creating vendor:", error);
    res.status(500).json({ success: false,
      message: "Internal Server Error",
      error: error.message });
  }
};

export const updateSite = async(
  req: Request,
  res: Response
)=>{
  
  try {
    const {
        site_name,
        site_address,
        site_cluster,
      status,
      updated_by,
      id
    } = req.body

    const site = await model.updateSite(
        site_name,
        site_address,
        site_cluster,
      status,
      updated_by,
      id
    )
    res.status(200).json({
      success: true,
      message: 'Success Update site',
      data: site
  })
  } catch (error: any) {
    console.error("Error creating vendor:", error);
     res.status(500).json({ success: false,
      message: "Internal Server Error",
      error: error.message });
  }
}

export const delSite = async (
    req: Request,
    res: Response
) => {
    try {
        const {
          id,
          updated_by
        }= req.body
        if (!id) {
             res.status(400).json({ message: "Missing user ID" });
          }

        const result = await model.deleteSite(id,updated_by)
        res.status(200).json({
          success: true,
          message: 'Success Delete site',
          data: result
      })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ success: false,
          message: "Internal Server Error",
          error: error.message });
    }
}


