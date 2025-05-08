import * as model from "../models/site";
// import {getListVendor} from "../models/vendor"
import { sendStatus } from "../utils/responseHelper";
import express from "express";

export const getListSite = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const site = await model.getListSite()

        res.json(site)
    } catch (error) {
        console.error("Error creating site:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const createSite = async (
    req: express.Request,
    res: express.Response
) => {
  try {
    const {
        site_name,
        site_address,
        site_cluster,
        status,
        created_by,
        updated_by
        
    } = req.body;

    const result = await model.insertSite(
        site_name,
        site_address,
        site_cluster,
        status,
        created_by,
        updated_by
    );

    if (result > 0) {
      return res.status(200).json(sendStatus("Site Successfully Created"));
    } else {
      return res.status(400).json(sendStatus("Failed To Create Site"));
    }
  } catch (error) {
    console.error("Error creating vendor:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateSite = async(
  req: express.Request,
  res: express.Response
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

    const vendor = await model.updateSite(
        site_name,
        site_address,
        site_cluster,
      status,
      updated_by,
      id
    )
    if (vendor > 0) {
      return res.status(200).json(sendStatus('Success Update Site'))
    }else{
      return res.status(400).json(sendStatus('Failed Update Site'))
    }
  } catch (error) {
    console.error("Error creating vendor:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export const delSite = async (
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

        const result = await model.deleteSite(id,updated_by)
        if (result > 0) {
            return res.status(200).json(sendStatus("Success delete site"))
        }else{
            return res.status(400).json(sendStatus("Failed Delete Site"))
        
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}


