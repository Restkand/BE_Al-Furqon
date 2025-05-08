import * as model from "../models/floor";
// import {getListVendor} from "../models/vendor"
import { sendStatus } from "../utils/responseHelper";
import express from "express";

export const listFloor = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const floor = await model.getListFloor()

        res.json(floor)
    } catch (error) {
        console.error("Error creating floor:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const createFloor = async (
    req: express.Request,
    res: express.Response
) => {
  try {
    const {
      site,
      nama,
      area,
      status,
      created_by,
      updated_by
    } = req.body;

    const result = await model.insertFloor(
      site,
      nama,
      area,
      status,
      created_by,
      updated_by
    );

    if (result > 0) {
      return res.status(200).json(sendStatus("Floor Successfully Created"));
    } else {
      return res.status(400).json(sendStatus("Failed To Create Floor"));
    }
  } catch (error) {
    console.error("Error creating floor:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateFloor = async(
  req: express.Request,
  res: express.Response
)=>{
  
  try {
    const {
      vendorName,
      status,
      updated_by,
      id
    } = req.body

    const vendor = await model.updateFl(
      vendorName,
      status,
      updated_by,
      id
    )
    if (vendor > 0) {
      return res.status(200).json(sendStatus('Success Update Vendor'))
    }else{
      return res.status(400).json(sendStatus('Failed Update Vendor'))
    }
  } catch (error) {
    console.error("Error creating vendor:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export const delFloor = async (
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

        const result = await model.deleteFl(id,updated_by)
        if (result > 0) {
            return res.status(200).json(sendStatus("Success delete user"))
        }else{
            return res.status(400).json(sendStatus("Failed Delete User"))
        
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}


