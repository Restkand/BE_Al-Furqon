import { Request, Response } from "express";
import * as model from "../models/track";

export const listTrack = async (req: Request, res: Response) => {
  try {
    const { site, floor } = req.body;
    const list = await model.getListTrack(site, floor);
    res.status(200).json(list);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTrackByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const track = await model.getTrackByID(id);
    res.status(200).json(track);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createNewTrack = async (req: Request, res: Response) => {
  try {
    const { trackName, site, floor, created_by, updated_by } = req.body;
    const result = await model.createTrack(
      trackName,
      site,
      floor,
      created_by,
      updated_by
    );
    res.status(200).json({
      success: true,
      message: "Success Add Team",
      data: result,
    });
  } catch (error) {
    console.error("Error creating floor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createTrackType = async (req: Request, res: Response) => {
  try {
    const { type, created_by, updated_by } = req.body;
    const result = await model.createTrackType(type, created_by, updated_by);
    res.status(200).json({
      success: true,
      message: "Success Add Team",
      data: result,
    });
  } catch (error) {
    console.error("Error creating floor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const listTrackType = async (req: Request, res: Response) => {
  try {
    const result = await model.listTrackType();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error creating floor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
