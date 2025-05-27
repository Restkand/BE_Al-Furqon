import express from "express";
import * as model from "../models/team";
import { generateTeamID } from "../utils/tools";

export const getListTeam = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const {
            departmentid 
        } = req.body
        const listTeams = await model.listTeam(departmentid)
        res.status(200).json(listTeams)
    } catch (error) {
        console.error("Error creating floor:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


export const insertTeam = async(
    req: express.Request,
    res: express.Response
) =>{
    try {
        const {
            teamName,
            routeId,
            details,
            created_by,
            updated_by,
            departmentID
        } = req.body

        const teamID = await generateTeamID()
        const result = await model.insertTeam(
            teamID,
            teamName,
            routeId,
            details,
            created_by,
            updated_by,
            departmentID
        )

        res.status(200).json({
            success: true,
            message: 'Success Add Team',
            data: result
        })
    } catch (error) {
        
    }
}