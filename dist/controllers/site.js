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
exports.delSite = exports.updateSite = exports.createSite = exports.getListSite = void 0;
const model = __importStar(require("../models/site"));
const getListSite = async (req, res) => {
    try {
        const site = await model.getListSite();
        res.status(200).json(site);
    }
    catch (error) {
        console.error("Error creating site:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
exports.getListSite = getListSite;
const createSite = async (req, res) => {
    try {
        const { siteCode, site_name, site_address, site_cluster, status, created_by, updated_by } = req.body;
        const result = await model.insertSite(siteCode, site_name, site_address, site_cluster, status, created_by, updated_by);
        res.status(200).json({
            success: true,
            message: 'Success Add Site',
            data: result
        });
    }
    catch (error) {
        console.error("Error creating vendor:", error);
        res.status(500).json({ success: false,
            message: "Internal Server Error",
            error: error.message });
    }
};
exports.createSite = createSite;
const updateSite = async (req, res) => {
    try {
        const { site_name, site_address, site_cluster, status, updated_by, id } = req.body;
        const site = await model.updateSite(site_name, site_address, site_cluster, status, updated_by, id);
        res.status(200).json({
            success: true,
            message: 'Success Update site',
            data: site
        });
    }
    catch (error) {
        console.error("Error creating vendor:", error);
        res.status(500).json({ success: false,
            message: "Internal Server Error",
            error: error.message });
    }
};
exports.updateSite = updateSite;
const delSite = async (req, res) => {
    try {
        const { id, updated_by } = req.body;
        if (!id) {
            res.status(400).json({ message: "Missing user ID" });
        }
        const result = await model.deleteSite(id, updated_by);
        res.status(200).json({
            success: true,
            message: 'Success Delete site',
            data: result
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false,
            message: "Internal Server Error",
            error: error.message });
    }
};
exports.delSite = delSite;
