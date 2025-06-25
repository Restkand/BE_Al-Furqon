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
exports.deleteBeac = exports.updateBeac = exports.createBeac = exports.listBeac = void 0;
const model = __importStar(require("../models/beacon"));
const tools_1 = require("../utils/tools");
const listBeac = async (req, res) => {
    try {
        const beacon = await model.getListBeacon();
        res.status(200).json(beacon);
    }
    catch (error) {
        console.error("Error creating beacon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.listBeac = listBeac;
const createBeac = async (req, res) => {
    try {
        const { site, name, beaconMacAddr, beaconBattery, BeaconBatteryCreat, created_by, updated_by, } = req.body;
        const beaconCode = await (0, tools_1.generateBeaconID)();
        const result = await model.insertBeacon(beaconCode, site, name, beaconMacAddr, beaconBattery, BeaconBatteryCreat, created_by, updated_by);
        res.status(200).json({
            success: true,
            message: "Success Add Beacon",
            data: result,
        });
    }
    catch (error) {
        console.error("Error creating beacon:", error);
        res.status(500).json({
            success: false,
            message: "Error Fetch Insert",
            error: error.message,
        });
    }
};
exports.createBeac = createBeac;
const updateBeac = async (req, res) => {
    try {
        const { site, name, beaconMacAddr, beaconBattery, BeaconBatteryCreat, status, updated_by, id, } = req.body;
        const vendor = await model.updateBeacon(site, name, beaconMacAddr, beaconBattery, BeaconBatteryCreat, status, updated_by, id);
        res.status(200).json({
            success: true,
            message: "Success Update Beacon",
            data: vendor,
        });
    }
    catch (error) {
        console.error("Error creating beacon:", error);
        res.status(500).json({
            success: false,
            message: "Error Fetch Insert",
            error: error.message,
        });
    }
};
exports.updateBeac = updateBeac;
const deleteBeac = async (req, res) => {
    try {
        const { updated_by, id } = req.body;
        const vendor = await model.deleteBeacon(updated_by, id);
        res.status(200).json({
            success: true,
            message: "Success Delete Beacon",
            data: vendor,
        });
    }
    catch (error) {
        console.error("Error delete beacon:", error);
        res.status(500).json({
            success: false,
            message: "Error Fetch Delete",
            error: error.message,
        });
    }
};
exports.deleteBeac = deleteBeac;
