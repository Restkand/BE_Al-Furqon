import express from "express";
import * as model from "../models/employee";

export const listEmployee  = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const emp = await model.getListEmployee()

        res.json(emp)
    } catch (error) {
        console.error("Error creating floor:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const optionEmployee = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const {routeid} = req.body
        const list = await model.listemploy(routeid)
        res.json(list)
    } catch (error) {
        console.error("Error creating floor:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}