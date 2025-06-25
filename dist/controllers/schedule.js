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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchControl = exports.insertScheduleControl = exports.deleteSetSchedule = exports.updateSetSchedule = exports.insertSetSchedule = exports.listSetSchedule = exports.listSchedule = void 0;
const model = __importStar(require("../models/schedule"));
const tools_1 = require("../utils/tools");
const listSchedule = async (req, res) => {
    try {
        const sch = await model.getListSchedule();
        res.json(sch);
    }
    catch (error) {
        console.error("Error creating floor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.listSchedule = listSchedule;
const listSetSchedule = async (req, res) => {
    const { department } = req.body;
    try {
        const setSch = await model.getListSetSchedule(department);
        res.json(setSch);
    }
    catch (error) {
        console.error("Error creating floor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.listSetSchedule = listSetSchedule;
const insertSetSchedule = async (req, res) => {
    try {
        const { scheduleName, scheduleDesc, department, created_by, updated_by } = req.body;
        const newSchedule = await model.insertSetChedule(scheduleName, scheduleDesc, department, created_by, updated_by);
        res.status(200).json({
            success: true,
            message: 'Success Add Set Schedule',
            data: newSchedule
        });
    }
    catch (error) {
        console.error('Insert failed:', error);
        res.status(500).json({
            success: false,
            message: 'Error Fetch Insert',
            error: error.message
        });
    }
};
exports.insertSetSchedule = insertSetSchedule;
const updateSetSchedule = async (req, res) => {
    try {
        const { id, scheduleName, scheduleDesc, department, updated_by } = req.body;
        const newSchedule = await model.updateSetChedule(id, scheduleName, scheduleDesc, department, updated_by);
        res.status(200).json({
            success: true,
            message: 'Success Update Set Schedule',
            data: newSchedule
        });
    }
    catch (error) {
        console.error('Insert failed:', error);
        res.status(500).json({
            success: false,
            message: 'Error Fetch Insert',
            error: error.message
        });
    }
};
exports.updateSetSchedule = updateSetSchedule;
const deleteSetSchedule = async (req, res) => {
    try {
        const { id, updated_by } = req.body;
        const newSchedule = await model.deleteSetChedule(id, updated_by);
        res.status(200).json({
            success: true,
            message: 'Success Delete Set Schedule',
            data: newSchedule
        });
    }
    catch (error) {
        console.error('Insert failed:', error);
        res.status(500).json({
            success: false,
            message: 'Error Fetch Insert',
            error: error.message
        });
    }
};
exports.deleteSetSchedule = deleteSetSchedule;
const insertScheduleControl = async (req, res) => {
    try {
        const { details, employee, created_by, updated_by } = req.body;
        const scheduleID = await (0, tools_1.generateScheduleID)();
        const result = await model.insertScheduleControl(scheduleID, details, employee, created_by, updated_by);
        res.status(200).json({
            success: true,
            message: 'Success Add Set Schedule',
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error Fetch Insert',
            error: error.message
        });
    }
};
exports.insertScheduleControl = insertScheduleControl;
const updateSchControl = async (req, res) => {
    try {
        const updatedResults = [];
        const { details, updated_by } = req.body;
        if (!Array.isArray(details)) {
            return res.status(400).json({ success: false, message: "Invalid details format" });
        }
        for (const detail of details) {
            const { id, set_id, track_id, sch_start, sch_end } = detail;
            const updated = await model.updateScheduleControl(id, set_id, track_id, new Date(sch_start), new Date(sch_end), updated_by);
            updatedResults.push(updated);
        }
        res.status(200).json({
            success: true,
            message: "Success update schedule control",
            data: updatedResults
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error Fetch Insert',
            error: error.message
        });
    }
};
exports.updateSchControl = updateSchControl;
