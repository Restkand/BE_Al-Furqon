import * as model from "../models/vendor";
// import {getListVendor} from "../models/vendor"
import { sendMessageStatus, sendStatus } from "../utils/responseHelper";
import express from "express";

export const listVendor = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const vendor = await model.getListVendor()

        res.json(vendor)
    } catch (error) {
        console.error("Error creating vendor:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const listVendorID = async(
  req: express.Request,
  res: express.Response
) => {
  try {
    const {
      id
    } = req.params
    const vendor = await model.getListVendorID(id)

        res.json(vendor)
  } catch (error) {
    console.error("Error creating vendor:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
 

}

export const createVendor = async (
    req: express.Request,
    res: express.Response
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

    if (result > 0) {
      return res.status(200).json(sendMessageStatus("Vendor Successfully Created", 200));
    } else {
      return res.status(400).json(sendMessageStatus("Failed To Create Vendor",404));
    }
  } catch (error) {
    console.error("Error creating vendor:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateVendor = async(
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

    const vendor = await model.updateVndr(
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

export const delVendor = async (
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

        const result = await model.deleteVndr(id,updated_by)
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


