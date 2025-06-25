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
exports.deleteAlertType = exports.updateAlertType = exports.insertAlertType = exports.listAlertType = exports.deleteAlibi = exports.updateAlibi = exports.insertAlibi = exports.listAlibi = void 0;
const model = __importStar(require("../models/alert"));
const tools_1 = require("../utils/tools");
const listAlibi = async (req, res) => {
    try {
        const list = await model.listAlibi();
        res.status(200).json(list); // ❌ No need to return
    }
    catch (error) {
        console.error("Error listing alibi:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.listAlibi = listAlibi;
const insertAlibi = async (req, res) => {
    try {
        const { name, created_by, updated_by } = req.body;
        const alibicode = await (0, tools_1.generateAlibiID)();
        const result = await model.insertAlibi(alibicode, name, created_by, updated_by);
        res.status(200).json({
            success: true,
            message: 'Success Add Alibi',
            data: result
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
exports.insertAlibi = insertAlibi;
const updateAlibi = async (req, res) => {
    try {
        const { id, name, updated_by } = req.body;
        const alibi = await model.updateAlibiAlert(id, name, updated_by);
        res.status(200).json({
            success: true,
            message: 'Success Update Alibi',
            data: alibi
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
exports.updateAlibi = updateAlibi;
const deleteAlibi = async (req, res) => {
    try {
        const { id, updated_by } = req.body;
        const alibi = await model.deleteAlibiAlert(id, updated_by);
        res.status(200).json({
            success: true,
            message: 'Success Delete Alibi',
            data: alibi
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
exports.deleteAlibi = deleteAlibi;
const listAlertType = async (req, res) => {
    try {
        const list = await model.listAlertType();
        res.status(200).json(list); // ❌ No need to return
    }
    catch (error) {
        console.error("Error listing alibi:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.listAlertType = listAlertType;
const insertAlertType = async (req, res) => {
    try {
        const { type_name, created_by, updated_by } = req.body;
        const alertType = await model.insertAlertType(type_name, created_by, updated_by);
        res.status(200).json({
            success: true,
            message: 'Success Insert Alert type',
            data: alertType
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
exports.insertAlertType = insertAlertType;
const updateAlertType = async (req, res) => {
    try {
        const { type_id, type_name, updated_by } = req.body;
        const alertType = await model.updateAlertType(type_id, type_name, updated_by);
        res.status(200).json({
            success: true,
            message: 'Success Update Alert type',
            data: alertType
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
exports.updateAlertType = updateAlertType;
const deleteAlertType = async (req, res) => {
    try {
        const { type_id, updated_by } = req.body;
        const alertType = await model.deleteAlertType(type_id, updated_by);
        res.status(200).json({
            success: true,
            message: 'Success Delete Alert type',
            data: alertType
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
exports.deleteAlertType = deleteAlertType;
