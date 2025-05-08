import * as model from "../models/beacon";
import { sendStatus } from "../utils/responseHelper";
import express from "express";

export const listBeac = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const beacon = await model.getListBeacon()

        res.json(beacon)
    } catch (error) {
        console.error("Error creating beacon:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const createBeac = async (
    req: express.Request,
    res: express.Response
) => {
  try {
    const {
        beaconCode,
        site,
        name,
        employee,
        beaconMacAddr,
        beaconBattery,
        BeaconBatteryCreat,
        status,
        created_by ,
        updated_by
    } = req.body;

    const result = await model.insertBeacon(
        beaconCode,
        site,
        name,
        employee,
        beaconMacAddr,
        beaconBattery,
        BeaconBatteryCreat,
        status,
        created_by ,
        updated_by
    );

    if (result > 0) {
      return res.status(200).json(sendStatus("Beacon Successfully Created"));
    } else {
      return res.status(400).json(sendStatus("Failed To Create Beacon"));
    }
  } catch (error) {
    console.error("Error creating beacon:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateBeac = async(
  req: express.Request,
  res: express.Response
)=>{
  
  try {
    const {
        site,
        name,
        employee,
        beaconMacAddr,
        beaconBattery,
        BeaconBatteryCreat,
        status , 
        updated_by , 
        id
    } = req.body

    const vendor = await model.updateBeacon(
        site,
        name,
        employee,
        beaconMacAddr,
        beaconBattery,
        BeaconBatteryCreat,
        status , 
        updated_by , 
        id
    )
    if (vendor > 0) {
      return res.status(200).json(sendStatus('Success Update Beacon'))
    }else{
      return res.status(400).json(sendStatus('Failed Update Beacon'))
    }
  } catch (error) {
    console.error("Error creating beacon:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export const delBeac = async (
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

        const result = await model.deleteBeacon(id,updated_by)
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


