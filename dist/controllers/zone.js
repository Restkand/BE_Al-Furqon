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
exports.deleteZone = exports.listDetailZone = exports.insertDetailZone = exports.createZone = exports.listZone = void 0;
const model = __importStar(require("../models/zone"));
const tools_1 = require("../utils/tools");
const listZone = async (req, res) => {
    try {
        const list = await model.listZone();
        res.status(200).json(list);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.listZone = listZone;
const createZone = async (req, res) => {
    try {
        const { zoneName, created_by, updated_by } = req.body;
        const zoneID = await (0, tools_1.generateZoneID)();
        const result = await model.addZone(zoneID, zoneName, created_by, updated_by);
        res.status(200).json({
            success: true,
            message: "Success insert zone",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
exports.createZone = createZone;
const insertDetailZone = async (req, res) => {
    try {
        const { zone_id, used_gateways = [], unused_gateways = [], created_by, updated_by, } = req.body;
        const result = await model.addDetailZone(zone_id, used_gateways, unused_gateways, created_by, updated_by);
        res.status(200).json({
            success: true,
            message: "Success Update Zone Detail",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
exports.insertDetailZone = insertDetailZone;
const listDetailZone = async (req, res) => {
    try {
        const { zone_id } = req.body;
        if (!zone_id || typeof zone_id !== "string") {
            res.status(400).json({ message: "zone_id is required" });
        }
        const result = await model.listDetailZone(zone_id);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
exports.listDetailZone = listDetailZone;
const deleteZone = async (req, res) => {
    try {
        const { zone_id, updated_by } = req.body;
        const result = await model.deleteZone(zone_id, updated_by);
        res.status(200).json({
            success: true,
            message: "Success Delete Zone",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
exports.deleteZone = deleteZone;
