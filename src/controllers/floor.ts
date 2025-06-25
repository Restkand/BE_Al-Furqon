import path from "path";
import * as model from "../models/floor";
// import {getListVendor} from "../models/vendor"
import { sendStatus } from "../utils/responseHelper";
import fs from "fs";
import { Request, Response } from "express";

export const listFloor = async (req: Request, res: Response): Promise<void> => {
  try {
    const floor = await model.getListFloor();

    res.json(floor);
  } catch (error) {
    console.error("Error creating floor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createFloor = async (req: Request, res: Response) => {
  try {
    const { floorID, site, nama, area, status, created_by, updated_by } =
      req.body;
    const filename = req.file?.filename || "";

    const result = await model.insertFloor(
      floorID,
      site,
      nama,
      area,
      status,
      created_by,
      updated_by,
      filename
    );

    res.status(200).json({
      success: true,
      message: "Success Add Gateway",
      data: result,
    });
  } catch (error: any) {
    console.error("Error creating floor:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getMapFloorByID = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.body;
    const filename = await model.getMapFloorByID(id);
    // console.log("Filename from DB:", filename);
    if (!filename) {
      return res.status(404).send("Image not found");
    }

    const imagePath = path.join(process.cwd(), "uploads", filename);
    console.log("Image full path:", imagePath);

    if (!fs.existsSync(imagePath)) {
      console.log("File does not exist!");
      res.status(404).send("Image file not found");
    }

    res.sendFile(imagePath);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).send("Server error");
  }
};

export const updateFloor = async (req: Request, res: Response) => {
  try {
    const { vendorName, status, updated_by, id } = req.body;

    const floor = await model.updateFl(vendorName, status, updated_by, id);
    res.status(200).json({
      success: true,
      message: "Success Update Floor",
      data: floor,
    });
  } catch (error: any) {
    console.error("Error creating floor:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching floor",
      error: error.message,
    });
  }
};

export const delFloor = async (req: Request, res: Response) => {
  try {
    const { id, updated_by } = req.body;
    if (!id) {
      res.status(400).json({ message: "Missing user ID" });
    }

    const result = await model.deleteFl(id, updated_by);
    res.status(200).json({
      success: true,
      message: "Success Delete Floor",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch floor",
      error: error.message,
    });
  }
};

export const getListfloorBySite = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { site } = req.body;

    const list = await model.listFloorBySite(site);
    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch floor" });
  }
};
