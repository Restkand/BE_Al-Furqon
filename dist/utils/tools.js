"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBeaconID = exports.generateEmpID = exports.generateZoneID = exports.generateQuestionID = exports.generateAlibiID = exports.generateTeamID = exports.generateScheduleID = exports.generateId = void 0;
const prisma_1 = __importDefault(require("../models/prisma"));
const generateId = async () => {
    try {
        const result = await prisma_1.default.$queryRawUnsafe(`
        SELECT COUNT(route_id) AS counted
        FROM ms_route
      `);
        const count = result[0]?.counted || 0;
        const nextNumber = count + 1;
        // Format to "RTE00001", "RTE00002", etc.
        const generatedId = `RTE${nextNumber.toString().padStart(5, "0")}`;
        return generatedId;
    }
    catch (error) {
        console.error("Error generating ID:", error);
        throw error;
    }
};
exports.generateId = generateId;
const generateScheduleID = async () => {
    try {
        const result = await prisma_1.default.$queryRawUnsafe(`
        SELECT COUNT(scheduleid) AS counted
        FROM ms_schcontrols
      `);
        // Convert to BigInt explicitly, then back to string
        const count = BigInt(result[0]?.counted || 0);
        const nextNumber = count + BigInt(1);
        const generate = `SCH${nextNumber.toString().padStart(5, "0")}`;
        return generate;
    }
    catch (error) {
        console.error("Error generating ID:", error);
        throw error;
    }
};
exports.generateScheduleID = generateScheduleID;
const generateTeamID = async () => {
    try {
        const result = await prisma_1.default.$queryRawUnsafe(`
        SELECT COUNT(team_id) AS counted
        FROM ms_batch_team
        `);
        // Convert to BigInt explicitly, then back to string
        const count = BigInt(result[0]?.counted || 0);
        const nextNumber = count + BigInt(1);
        const generate = `BAT${nextNumber.toString().padStart(5, "0")}`;
        return generate;
    }
    catch (error) {
        console.error("Error generating ID:", error);
        throw error;
    }
};
exports.generateTeamID = generateTeamID;
const generateAlibiID = async () => {
    try {
        const result = await prisma_1.default.$queryRawUnsafe(`
        SELECT Count(reason_id) 
        from ms_alert_reason
        `);
        const count = BigInt(result[0]?.counted || 0);
        const nextNumber = count + BigInt(1);
        const generate = `ALB${nextNumber.toString().padStart(5, "0")}`;
        return generate;
    }
    catch (error) {
        console.error("Error generating ID:", error);
        throw error;
    }
};
exports.generateAlibiID = generateAlibiID;
const generateQuestionID = async () => {
    try {
        const result = await prisma_1.default.$queryRawUnsafe(`
        SELECT COUNT(qre_id) AS counted
        FROM ms_qre
      `);
        // Convert to BigInt explicitly, then back to string
        const count = BigInt(result[0]?.counted || 0);
        const nextNumber = count + BigInt(1);
        const generate = `QRE${nextNumber.toString().padStart(5, "0")}`;
        return generate;
    }
    catch (error) {
        console.error("Error generating ID:", error);
        throw error;
    }
};
exports.generateQuestionID = generateQuestionID;
const generateZoneID = async () => {
    try {
        const result = await prisma_1.default.$queryRawUnsafe(`
        SELECT COUNT(zone_id) AS counted
        FROM ms_zone
      `);
        // Convert to BigInt explicitly, then back to string
        const count = BigInt(result[0]?.counted || 0);
        const nextNumber = count + BigInt(1);
        const generate = `ZNE${nextNumber.toString().padStart(5, "0")}`;
        return generate;
    }
    catch (error) {
        console.error("Error generating ID:", error);
        throw error;
    }
};
exports.generateZoneID = generateZoneID;
const generateEmpID = async () => {
    try {
        const result = await prisma_1.default.$queryRawUnsafe(`
        SELECT COUNT(employee_id) AS counted
        FROM ms_employee
      `);
        // Convert to BigInt explicitly, then back to string
        const count = BigInt(result[0]?.counted || 0);
        const nextNumber = count + BigInt(1);
        const generate = `EMP${nextNumber.toString().padStart(5, "0")}`;
        return generate;
    }
    catch (error) {
        console.error("Error generating ID:", error);
        throw error;
    }
};
exports.generateEmpID = generateEmpID;
const generateBeaconID = async () => {
    try {
        const result = await prisma_1.default.$queryRawUnsafe(`
        SELECT COUNT(beacon_id) AS counted
        FROM ms_beacon
      `);
        // Convert to BigInt explicitly, then back to string
        const count = BigInt(result[0]?.counted || 0);
        const nextNumber = count + BigInt(1);
        const generate = `BE${nextNumber.toString().padStart(6, "0")}`;
        return generate;
    }
    catch (error) {
        console.error("Error generating ID:", error);
        throw error;
    }
};
exports.generateBeaconID = generateBeaconID;
