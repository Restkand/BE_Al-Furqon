
import { Request, Response } from "express";
import * as model from "../models/employee";
import { generateEmpID } from "../utils/tools";
import path from "path";

export const listEmployee  = async(
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const emp = await model.getListEmployee()

        res.status(200).json(emp)
    } catch (error) {
        console.error("Error creating floor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const optionEmployee = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {routeid} = req.body
        const list = await model.listemploy(routeid)
        res.status(200).json(list)
    } catch (error) {
        console.error("Error creating floor:", error);
         res.status(500).json({ error: "Internal Server Error" });
    }
}

export const insertEmployee = async(
    req: Request,
    res: Response
) => {
    try {
        const {
            employeename,
            employeetype,
            vendor,
            beacon,
            site,
            department,
            phone,
            status,
            created_by,
            updated_by
        } = req.body

        const filename = req.file?.filename || ''

        const employeeid = await generateEmpID()
        const result = await model.insertEmp(
            employeeid,
            employeename,
            employeetype,
            vendor,
            beacon,
            site,
            department,
            phone,
            filename,
            status,
            created_by,
            updated_by
        )
        res.status(200).json({
            success: true,
            message: 'Success Insert Employee',
            data: result
        })
    } catch (error : any) {
        console.error("Error creating floor:", error);
     res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message 
     });
    }
}

export const updateEmploy = async (
    req: Request,
    res: Response
) => {
    try {
        const {
            id, 
            employeeName,
            employeePhone, 
            department, 
            employeeType,
            vendor,
            beacon,
            status,
            updated_by
        } = req.body
        const filename = req.file?.filename || ''
        const result = await model.updateEmployee(
            id, 
            employeeName,
            employeePhone, 
            department, 
            employeeType,
            vendor,
            beacon,
            status,
            filename,
            updated_by
        )
        res.status(200).json({
            success: true,
            message: "Success Update Employee",
            data: result
        })
    } catch (error: any) {
        console.error("Error creating floor:", error);
        res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message 
        });
    }
}

export const listDetailEmploy = async(
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const {id} = req.body
        const employee = await model.getEmployeeDetail(id)
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
          }
          if (!employee.photo) {
            return res.status(404).send('Image not found');
          }
          // Assuming your photos are served from this URL
        //   const photoBaseUrl = "https://yourdomain.com/uploads/photos/";
      const photoUrl = path.join(process.cwd(), 'uploads', employee.photo);
        //   const photoUrl = employee.photo ? photoBaseUrl + employee.photo : null;
      
          res.status(200).json({
            ...employee,
            photoUrl, // Add photoUrl to response
          });
    } catch (error: any) {
        console.error("Error creating floor:", error);
        res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message 
        });
    }
    
}

export const deleteEmploy = async(
    req: Request,
    res: Response
)=>{
    try {
        const {id, updated_by} = req.body
        const result = await model.deleteEmployee(
            id,
            updated_by
        )
        res.status(200).json({
            success: true,
            message: "Success Delete employee",
            data: result
        })
    } catch (error: any) {
        console.error("Error creating floor:", error);
        res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message 
        });
    }
}