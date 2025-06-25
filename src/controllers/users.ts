import * as model from "../models/users";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const listUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await model.getlistUser();

    // Convert BigInt fields to strings
    //   const safeUsers = users.map(user => ({
    //     ...user,
    //     id: user.id.toString(), // Assuming id is of type BigInt
    //   }));

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      name,
      username,
      password,
      email,
      role,
      status,
      site,
      created_user,
      updated_user,
    } = req.body;

    const checkuser = await model.checkUserExist(username);

    if (!checkuser) {
      const hash_random_password = bcrypt.hashSync(password, 10);
      const insert = await model.createUser(
        name,
        username,
        hash_random_password,
        email,
        role,
        status,
        site,
        created_user,
        updated_user
      );
      res.status(200).json({
        success: true,
        message: "Success Registered User",
        data: insert,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "User Already Exist",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, id, role, status, site, updated_user } =
      req.body;

    const result = await model.updateUser(
      name,
      email,
      password,
      id,
      role,
      status,
      site,
      updated_user
    );
    res.status(200).json({
      success: true,
      message: "Success Update User Data",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Fetch update",
      error: error.message,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id, updated_user } = req.body;
    if (!id) {
      res.status(400).json({ message: "Missing user ID" });
    }

    const result = await model.deleteUsr(id, updated_user);
    res.status(200).json({
      success: true,
      message: "Success Delete User",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Fetch Insert",
      error: error.message,
    });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const user = await model.loginUser(email, password);
    if (!user || !user.email || !user.id) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token, user });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Fetch Insert",
      error: error.message,
    });
  }
};
