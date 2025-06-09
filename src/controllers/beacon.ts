import * as model from "../models/beacon";
import { Request, Response } from "express";
import { generateBeaconID } from "../utils/tools";

export const listBeac = async (req: Request, res: Response): Promise<void> => {
  try {
    const beacon = await model.getListBeacon();

    res.status(200).json(beacon);
  } catch (error) {
    console.error("Error creating beacon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createBeac = async (req: Request, res: Response) => {
  try {
    const {
      site,
      name,
      beaconMacAddr,
      beaconBattery,
      BeaconBatteryCreat,
      created_by,
      updated_by,
    } = req.body;

    const beaconCode = await generateBeaconID();

    const result = await model.insertBeacon(
      beaconCode,
      site,
      name,
      beaconMacAddr,
      beaconBattery,
      BeaconBatteryCreat,
      created_by,
      updated_by
    );

    res.status(200).json({
      success: true,
      message: "Success Add Beacon",
      data: result,
    });
  } catch (error: any) {
    console.error("Error creating beacon:", error);
    res.status(500).json({
      success: false,
      message: "Error Fetch Insert",
      error: error.message,
    });
  }
};

export const updateBeac = async (req: Request, res: Response) => {
  try {
    const {
      site,
      name,
      beaconMacAddr,
      beaconBattery,
      BeaconBatteryCreat,
      status,
      updated_by,
      id,
    } = req.body;

    const vendor = await model.updateBeacon(
      site,
      name,
      beaconMacAddr,
      beaconBattery,
      BeaconBatteryCreat,
      status,
      updated_by,
      id
    );
    res.status(200).json({
      success: true,
      message: "Success Update Beacon",
      data: vendor,
    });
  } catch (error: any) {
    console.error("Error creating beacon:", error);
    res.status(500).json({
      success: false,
      message: "Error Fetch Insert",
      error: error.message,
    });
  }
};

export const deleteBeac = async (req: Request, res: Response) => {
  try {
    const { updated_by, id } = req.body;

    const vendor = await model.deleteBeacon(updated_by, id);
    res.status(200).json({
      success: true,
      message: "Success Delete Beacon",
      data: vendor,
    });
  } catch (error: any) {
    console.error("Error delete beacon:", error);
    res.status(500).json({
      success: false,
      message: "Error Fetch Delete",
      error: error.message,
    });
  }
};
