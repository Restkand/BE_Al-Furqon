"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmploy = exports.listDetailEmploy = exports.updateEmploy = exports.insertEmployee = exports.optionEmployee = exports.listEmployee = void 0;
const model = __importStar(require("../models/employee"));
const tools_1 = require("../utils/tools");
const path_1 = __importDefault(require("path"));
const listEmployee = async (req, res) => {
    try {
        const emp = await model.getListEmployee();
        res.status(200).json(emp);
    }
    catch (error) {
        console.error("Error creating floor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.listEmployee = listEmployee;
const optionEmployee = async (req, res) => {
    try {
        const { routeid } = req.body;
        const list = await model.listemploy(routeid);
        res.status(200).json(list);
    }
    catch (error) {
        console.error("Error creating floor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.optionEmployee = optionEmployee;
const insertEmployee = async (req, res) => {
    try {
        const { employeename, employeetype, vendor, beacon, site, department, phone, status, created_by, updated_by } = req.body;
        const filename = req.file?.filename || '';
        const employeeid = await (0, tools_1.generateEmpID)();
        const result = await model.insertEmp(employeeid, employeename, employeetype, vendor, beacon, site, department, phone, filename, status, created_by, updated_by);
        res.status(200).json({
            success: true,
            message: 'Success Insert Employee',
            data: result
        });
    }
    catch (error) {
        console.error("Error creating floor:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
exports.insertEmployee = insertEmployee;
const updateEmploy = async (req, res) => {
    try {
        const { id, employeeName, employeePhone, department, employeeType, vendor, beacon, status, updated_by } = req.body;
        const filename = req.file?.filename || '';
        const result = await model.updateEmployee(id, employeeName, employeePhone, department, employeeType, vendor, beacon, status, filename, updated_by);
        res.status(200).json({
            success: true,
            message: "Success Update Employee",
            data: result
        });
    }
    catch (error) {
        console.error("Error creating floor:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
exports.updateEmploy = updateEmploy;
const listDetailEmploy = async (req, res) => {
    try {
        const { id } = req.body;
        const employee = await model.getEmployeeDetail(id);
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }
        if (!employee.photo) {
            return res.status(404).send('Image not found');
        }
        // Assuming your photos are served from this URL
        //   const photoBaseUrl = "https://yourdomain.com/uploads/photos/";
        const photoUrl = path_1.default.join(process.cwd(), 'uploads', employee.photo);
        //   const photoUrl = employee.photo ? photoBaseUrl + employee.photo : null;
        res.status(200).json({
            ...employee,
            photoUrl, // Add photoUrl to response
        });
    }
    catch (error) {
        console.error("Error creating floor:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
exports.listDetailEmploy = listDetailEmploy;
const deleteEmploy = async (req, res) => {
    try {
        const { id, updated_by } = req.body;
        const result = await model.deleteEmployee(id, updated_by);
        res.status(200).json({
            success: true,
            message: "Success Delete employee",
            data: result
        });
    }
    catch (error) {
        console.error("Error creating floor:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
exports.deleteEmploy = deleteEmploy;
