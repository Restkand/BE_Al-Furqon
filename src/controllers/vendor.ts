import { Request, Response } from "express";
import * as model from "../models/vendor";
// import {getListVendor} from "../models/vendor"
import { sendMessageStatus, sendStatus } from "../utils/responseHelper";

export const listVendor = async(
    req: Request,
    res: Response
) => {
    try {
        const vendor = await model.getListVendor()

        res.status(200).json(vendor)
    } catch (error) {
        console.error("Error creating vendor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const listVendorID = async(
  req: Request,
  res: Response
) => {
  try {
    const {
      id
    } = req.params
    const vendor = await model.getListVendorID(id)

        res.json(vendor)
  } catch (error) {
    console.error("Error creating vendor:", error);
     res.status(500).json({ error: "Internal Server Error" });
  }
 

}

export const createVendor = async (
    req: Request,
    res: Response
) => {
  try {
    const {
      vendorID,
      vendorName,
      status,
      created_by,
      updated_by
    } = req.body;
    

    const result = await model.insertVendor(
      vendorID,
      vendorName,
      status,
      created_by,
      updated_by
    );

    res.status(200).json({
      success: true,
      message: "Success Insert Vendor",
      data: result
    })

  } catch (error: any) {
    console.error("Error creating vendor:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal Server Error" ,
      error: error.message
    });
  }
};

export const updateVendor = async(
  req: Request,
  res: Response
)=>{
  
  try {
    const {
      vendorName,
      status,
      updated_by,
      id
    } = req.body

    const vendor = await model.updateVndr(
      vendorName,
      status,
      updated_by,
      id
    )
    res.status(200).json({
      success: true,
      message: "Success Update Vendor",
      data: vendor
    })
  } catch (error:any) {
    console.error("Error creating vendor:", error);
     res.status(500).json({ 
      success: false,
      message: "Internal Server Error" ,
      error: error.message
     });
  }
}

export const delVendor = async (
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

        const result = await model.deleteVndr(id,updated_by)
        res.status(200).json({
          success: true,
          message: "Success Delete Vendor",
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


