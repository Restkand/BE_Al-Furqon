import { PrismaClient } from "@prisma/client";
import express from "express";
import * as model from "../models/users";
import { sendStatus } from "../utils/responseHelper";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const listUser = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const users = await model.getlistUser();
      
      // Convert BigInt fields to strings
    //   const safeUsers = users.map(user => ({
    //     ...user,
    //     id: user.id.toString(), // Assuming id is of type BigInt
    //   }));
      
      res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch users' });        
    }
}

export const createUser = async(
    req: express.Request,
    res: express.Response
)=>{
    try {
        const {
            name,
            username,
            password,
            email,
            role,
            status,
            created_user,
            updated_user
        } = req.body

        const checkuser = await model.checkUserExist(username)

        if (!checkuser) {
            // const user = await prisma.users.create({data: {name,username,password,email,role,status}})
            // res.json(user)
            const hash_random_password = bcrypt.hashSync(password, 10)
            const insert = await model.createUser(
                name,
                username,
                hash_random_password,
                email,
                role,
                status,
                created_user,
                updated_user
            )
            if (insert > 0) {
                return res.status(200).json(sendStatus('User Successfully Regiter'))
            } else {
                return res.status(400).json(sendStatus("Failed To Create User"));
            }
        } else {
            res.status(401).json(sendStatus('User Already Exist'))
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}

export const update = async(
    req: express.Request,
    res: express.Response
)=>{
    try {
        const {
            name,
            email,
            id,
            role,
            status,
            updated_user
        } = req.body

        if (!req.body) {
            return res.status(400).json(sendStatus("Invalid request body"));
          }

        const result = await model.updateUser(
            name,
            email,
            id,
            role,
            status,
            updated_user
        )
        if (result > 0) {
            return res.status(200).json(sendStatus("Update User Successfully"))
        }else{
            return res.status(400).json(sendStatus("Failed Update User"))
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}

export const deleteUser = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const {
            id
        } = req.params
        if (!id) {
            return res.status(400).json({ message: "Missing user ID" });
          }

        const result = await model.deleteUsr(id)
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