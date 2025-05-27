import * as model from "../models/gateway";
import { sendStatus } from "../utils/responseHelper";
import express from "express";

export const listGate = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const beacon = await model.getListGateway()

        res.json(beacon)
    } catch (error) {
        console.error("Error creating beacon:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const listGateByFloor = async(
  req: express.Request,
  res: express.Response
) => {
  try {
    const {floorid, site} = req.body
    const listgate = await model.listGatewayByFloor(floorid,site)
    res.json(listgate)
  } catch (error) {
    console.error("Error creating beacon:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export const createGateway = async (
    req: express.Request,
    res: express.Response
) => {
  try {
    const {
        gateway_id,
        site,
        name,
        floor, 
        gatewayMacAddr,
        ipAddr,
        x_coordinate,
        y_coordinate,
        status,
        created_by,
        updated_by
    } = req.body;

    const result = await model.insertGateway(
        gateway_id,
        site,
        name,
        floor, 
        gatewayMacAddr,
        ipAddr,
        x_coordinate,
        y_coordinate,
        status,
        created_by,
        updated_by
    );

    res.status(200).json({
      success: true,
      message: 'Success Add Gateway',
      data: result
  })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error Fetch Insert',
      error: error.message
  })
  }
};

export const updateGateway = async(
  req: express.Request,
  res: express.Response
)=>{
  
  try {
    const {
        site,
        name,
        floor, 
        gatewayMacAddr,
        ipAddr,
        status,
        updated_by, 
        id
    } = req.body

    const vendor = await model.updateGateway(
        site,
        name,
        floor, 
        gatewayMacAddr,
        ipAddr,
        status,
        updated_by, 
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

        const result = await model.deleteGateway(id,updated_by)
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

export const listGatewayByRoute = async(
  req: express.Request,
  res: express.Response
) => {
  try {
    const {routeid} = req.body
    const list = await model.getListGatewayByRoute(routeid)
    res.status(200).json(list)
  } catch (error) {
    console.error("Error creating vendor:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

