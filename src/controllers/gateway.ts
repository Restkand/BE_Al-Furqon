import { Request, Response } from "express";
import * as model from "../models/gateway";

export const listGate = async(
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const beacon = await model.getListGateway()

        res.json(beacon)
    } catch (error) {
        console.error("Error creating beacon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const listGateByFloor = async(
  req: Request,
  res: Response
):Promise<void> => {
  try {
    const {floorid, site} = req.body
    const listgate = await model.listGatewayByFloor(floorid,site)
    res.json(listgate)
  } catch (error) {
    console.error("Error creating beacon:", error);
     res.status(500).json({ error: "Internal Server Error" });
  }
}

export const createGateway = async (
    req: Request,
    res: Response
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
  req: Request,
  res: Response
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

    const gateway = await model.updateGateway(
        site,
        name,
        floor, 
        gatewayMacAddr,
        ipAddr,
        status,
        updated_by, 
        id
    )
    res.status(200).json({
      success: true,
      message: 'Success Update Gateway',
      data: gateway
    })
  } catch (error:any) {
    console.error("Error creating beacon:", error);
    res.status(500).json({
      success: false,
      message: 'Error fetching gateway',
      error: error.message
    })
  }
}

export const delBeac = async (
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

        const result = await model.deleteGateway(id,updated_by)
        res.status(200).json({
          success: true,
          message: 'Success Delete Gateway',
          data: result
        })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ 
          success: false,
        message: 'Error fetching gateway',
        error: error.message
         });
    }
}

export const listGatewayByRoute = async(
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {routeid} = req.body
    const list = await model.getListGatewayByRoute(routeid)
     res.status(200).json(list)
  } catch (error) {
    console.error("Error creating vendor:", error);
     res.status(500).json({ error: "Internal Server Error" });
  }
}

