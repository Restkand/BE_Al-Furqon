import * as model from "../models/department";
// import {getListVendor} from "../models/vendor"
import { sendStatus } from "../utils/responseHelper";
import express from "express";

export const listDepartment = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const vendor = await model.getListDepart()

        res.json(vendor)
    } catch (error) {
        console.error("Error creating department:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const createDepartment = async (
    req: express.Request,
    res: express.Response
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
  req: express.Request,
  res: express.Response
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
    if (depart > 0) {
      return res.status(200).json(sendStatus('Success Update Department'))
    }else{
      return res.status(400).json(sendStatus('Failed Update Department'))
    }
  } catch (error) {
    console.error("Error creating department:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export const delDepartment = async (
    req: express.Request,
    res: express.Response
) => {
  console.log('Received Headers:', req.headers);
  console.log('Received Body:', req.body);
    try {
        const {
            id
        } = req.params
        const {
          updated_by
        }= req.body
        if (!id) {
            return res.status(400).json({ message: "Missing user ID" });
          }

        const result = await model.deleteDepart(id,updated_by)
        if (result > 0) {
            return res.status(200).json(sendStatus("Success delete department"))
        }else{
            return res.status(400).json(sendStatus("Failed Delete department"))
        
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch department' });
    }
}


