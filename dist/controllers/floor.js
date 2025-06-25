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
exports.getListfloorBySite = exports.delFloor = exports.updateFloor = exports.getMapFloorByID = exports.createFloor = exports.listFloor = void 0;
const path_1 = __importDefault(require("path"));
const model = __importStar(require("../models/floor"));
const fs_1 = __importDefault(require("fs"));
const listFloor = async (req, res) => {
    try {
        const floor = await model.getListFloor();
        res.json(floor);
    }
    catch (error) {
        console.error("Error creating floor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.listFloor = listFloor;
const createFloor = async (req, res) => {
    try {
        const { floorID, site, nama, area, status, created_by, updated_by } = req.body;
        const filename = req.file?.filename || "";
        const result = await model.insertFloor(floorID, site, nama, area, status, created_by, updated_by, filename);
        res.status(200).json({
            success: true,
            message: "Success Add Gateway",
            data: result,
        });
    }
    catch (error) {
        console.error("Error creating floor:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
exports.createFloor = createFloor;
const getMapFloorByID = async (req, res) => {
    try {
        const { id } = req.body;
        const filename = await model.getMapFloorByID(id);
        // console.log("Filename from DB:", filename);
        if (!filename) {
            return res.status(404).send("Image not found");
        }
        const imagePath = path_1.default.join(process.cwd(), "uploads", filename);
        console.log("Image full path:", imagePath);
        if (!fs_1.default.existsSync(imagePath)) {
            console.log("File does not exist!");
            res.status(404).send("Image file not found");
        }
        res.sendFile(imagePath);
    }
    catch (error) {
        console.error("Error fetching image:", error);
        res.status(500).send("Server error");
    }
};
exports.getMapFloorByID = getMapFloorByID;
const updateFloor = async (req, res) => {
    try {
        const { vendorName, status, updated_by, id } = req.body;
        const floor = await model.updateFl(vendorName, status, updated_by, id);
        res.status(200).json({
            success: true,
            message: "Success Update Floor",
            data: floor,
        });
    }
    catch (error) {
        console.error("Error creating floor:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching floor",
            error: error.message,
        });
    }
};
exports.updateFloor = updateFloor;
const delFloor = async (req, res) => {
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch floor",
            error: error.message,
        });
    }
};
exports.delFloor = delFloor;
const getListfloorBySite = async (req, res) => {
    try {
        const { site } = req.body;
        const list = await model.listFloorBySite(site);
        res.status(200).json(list);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch floor" });
    }
};
exports.getListfloorBySite = getListfloorBySite;
