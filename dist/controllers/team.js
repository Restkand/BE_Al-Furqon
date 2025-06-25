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
exports.insertTeam = exports.getListTeam = void 0;
const model = __importStar(require("../models/team"));
const tools_1 = require("../utils/tools");
const getListTeam = async (req, res) => {
    try {
        const { departmentid } = req.body;
        const listTeams = await model.listTeam(departmentid);
        res.status(200).json(listTeams);
    }
    catch (error) {
        console.error("Error creating floor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getListTeam = getListTeam;
const insertTeam = async (req, res) => {
    try {
        const { teamName, routeId, details, created_by, updated_by, departmentID } = req.body;
        const teamID = await (0, tools_1.generateTeamID)();
        const result = await model.insertTeam(teamID, teamName, routeId, details, created_by, updated_by, departmentID);
        res.status(200).json({
            success: true,
            message: 'Success Add Team',
            data: result
        });
    }
    catch (error) {
        console.error("Error creating floor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.insertTeam = insertTeam;
