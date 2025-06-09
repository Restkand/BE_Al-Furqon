import { Request, Response } from "express";
import * as model from "../models/department";
// import {getListVendor} from "../models/vendor"
import { sendStatus } from "../utils/responseHelper";

export const listDepartment = async(
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const vendor = await model.getListDepart()

        res.status(200).json(vendor)
    } catch (error) {
        console.error("Error creating department:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const createDepartment = async (
    req: Request,
    res: Response
) => {
  try {
    const {
        departmentCode,
        departmentName,
      status,
      created_by,
      updated_by
    } = req.body;

    const result = await model.insertDepart(
        departmentCode,
        departmentName,
      status,
      created_by,
      updated_by
    );

    res.status(200).json({
      success: true,
      message: 'Success Add Set Schedule',
      data: result
    })
  } catch (error:any) {
    console.error("Error creating department:", error);
    res.status(500).json({
      success: true,
      message: 'Error creating department',
      error: error.message
    })
  }
};

export const updateDepartment = async(
  req: Request,
  res: Response
)=>{
  
  try {
    const {
        departmentCode,
        departmentName,
      status,
      updated_by,
      id
    } = req.body

    const depart = await model.updateDepart(
        departmentCode,
        departmentName,
      status,
      updated_by,
      id
    )
    res.status(200).json({
      success: true,
      message: "Success Update Department",
      data: depart
    })
  } catch (error: any) {
    console.error("Error creating department:", error);
     res.status(500).json({ 
      success: false,
      message: "Internal Server Error",
      error: error.message
     });
  }
}

export const delDepartment = async(
  req: Request,
  res: Response
)=>{
  
  try {
    const {
      id,
      updated_by
    } = req.body
    if (!id) {
       res.status(400).json({ message: "Missing user ID" });
    }
    const result = await model.deleteDepart(id,updated_by)
    res.status(200).json({
      success: true,
      message: "Success Update Department",
      data: result
    })
  } catch (error: any) {
    console.error("Error creating department:", error);
     res.status(500).json({ 
      success: false,
      message: "Internal Server Error",
      error: error.message
     });
  }
}


