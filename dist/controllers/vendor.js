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
exports.delVendor = exports.updateVendor = exports.createVendor = exports.listVendorID = exports.listVendor = void 0;
const model = __importStar(require("../models/vendor"));
const listVendor = async (req, res) => {
    try {
        const vendor = await model.getListVendor();
        res.status(200).json(vendor);
    }
    catch (error) {
        console.error("Error creating vendor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.listVendor = listVendor;
const listVendorID = async (req, res) => {
    try {
        const { id } = req.params;
        const vendor = await model.getListVendorID(id);
        res.json(vendor);
    }
    catch (error) {
        console.error("Error creating vendor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.listVendorID = listVendorID;
const createVendor = async (req, res) => {
    try {
        const { vendorID, vendorName, status, created_by, updated_by } = req.body;
        const result = await model.insertVendor(vendorID, vendorName, status, created_by, updated_by);
        res.status(200).json({
            success: true,
            message: "Success Insert Vendor",
            data: result
        });
    }
    catch (error) {
        console.error("Error creating vendor:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
exports.createVendor = createVendor;
const updateVendor = async (req, res) => {
    try {
        const { vendorName, status, updated_by, id } = req.body;
        const vendor = await model.updateVndr(vendorName, status, updated_by, id);
        res.status(200).json({
            success: true,
            message: "Success Update Vendor",
            data: vendor
        });
    }
    catch (error) {
        console.error("Error creating vendor:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
exports.updateVendor = updateVendor;
const delVendor = async (req, res) => {
    try {
        const { id, updated_by } = req.body;
        if (!id) {
            res.status(400).json({ message: "Missing user ID" });
        }
        const result = await model.deleteVndr(id, updated_by);
        res.status(200).json({
            success: true,
            message: "Success Delete Vendor",
            data: result
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
exports.delVendor = delVendor;
