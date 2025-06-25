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
exports.listTrackType = exports.createTrackType = exports.createNewTrack = exports.getTrackByID = exports.listTrack = void 0;
const model = __importStar(require("../models/track"));
const listTrack = async (req, res) => {
    try {
        const { site, floor } = req.body;
        const list = await model.getListTrack(site, floor);
        res.status(200).json(list);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.listTrack = listTrack;
const getTrackByID = async (req, res) => {
    try {
        const { id } = req.body;
        const track = await model.getTrackByID(id);
        res.status(200).json(track);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getTrackByID = getTrackByID;
const createNewTrack = async (req, res) => {
    try {
        const { trackName, site, floor, created_by, updated_by } = req.body;
        const result = await model.createTrack(trackName, site, floor, created_by, updated_by);
        res.status(200).json({
            success: true,
            message: "Success Add Team",
            data: result,
        });
    }
    catch (error) {
        console.error("Error creating floor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.createNewTrack = createNewTrack;
const createTrackType = async (req, res) => {
    try {
        const { type, created_by, updated_by } = req.body;
        const result = await model.createTrackType(type, created_by, updated_by);
        res.status(200).json({
            success: true,
            message: "Success Add Team",
            data: result,
        });
    }
    catch (error) {
        console.error("Error creating floor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.createTrackType = createTrackType;
const listTrackType = async (req, res) => {
    try {
        const result = await model.listTrackType();
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Error creating floor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.listTrackType = listTrackType;
