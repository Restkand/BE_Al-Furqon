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
exports.listGatewayByRoute = exports.delBeac = exports.updateGateway = exports.createGateway = exports.addGateway = exports.listGateByFloor = exports.listGate = void 0;
const model = __importStar(require("../models/gateway"));
const listGate = async (req, res) => {
    try {
        const beacon = await model.getListGateway();
        res.json(beacon);
    }
    catch (error) {
        console.error("Error creating beacon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.listGate = listGate;
const listGateByFloor = async (req, res) => {
    try {
        const { floorid, site } = req.body;
        const listgate = await model.listGatewayByFloor(floorid, site);
        res.json(listgate);
    }
    catch (error) {
        console.error("Error creating beacon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.listGateByFloor = listGateByFloor;
const addGateway = async (req, res) => {
    try {
        const { gateway_name, gateway_addrs, gateway_MQID, gateway_area, site, floor, created_by, updated_by, } = req.body;
        const gatewayID = gateway_name.replace(/\s+/g, "-");
        const result = await model.addGateway(gatewayID, gateway_name, gateway_addrs, gateway_MQID, gateway_area, site, floor, created_by, updated_by);
        res.status(200).json({
            success: true,
            message: "Success Add Gateway",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error Fetch Insert",
            error: error.message,
        });
    }
};
exports.addGateway = addGateway;
const createGateway = async (req, res) => {
    try {
        const { gateway_id, site, name, floor, gatewayMacAddr, ipAddr, x_coordinate, y_coordinate, status, created_by, updated_by, area, } = req.body;
        const result = await model.insertGateway(gateway_id, site, name, floor, gatewayMacAddr, ipAddr, x_coordinate, y_coordinate, status, created_by, updated_by, area);
        res.status(200).json({
            success: true,
            message: "Success Add Gateway",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error Fetch Insert",
            error: error.message,
        });
    }
};
exports.createGateway = createGateway;
const updateGateway = async (req, res) => {
    try {
        const { site, name, floor, gatewayMacAddr, ipAddr, status, updated_by, id, } = req.body;
        const gateway = await model.updateGateway(site, name, floor, gatewayMacAddr, ipAddr, status, updated_by, id);
        res.status(200).json({
            success: true,
            message: "Success Update Gateway",
            data: gateway,
        });
    }
    catch (error) {
        console.error("Error creating beacon:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching gateway",
            error: error.message,
        });
    }
};
exports.updateGateway = updateGateway;
const delBeac = async (req, res) => {
    try {
        const { id, updated_by } = req.body;
        if (!id) {
            res.status(400).json({ message: "Missing user ID" });
        }
        const result = await model.deleteGateway(id, updated_by);
        res.status(200).json({
            success: true,
            message: "Success Delete Gateway",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error fetching gateway",
            error: error.message,
        });
    }
};
exports.delBeac = delBeac;
const listGatewayByRoute = async (req, res) => {
    try {
        const { routeid } = req.body;
        const list = await model.getListGatewayByRoute(routeid);
        res.status(200).json(list);
    }
    catch (error) {
        console.error("Error creating vendor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.listGatewayByRoute = listGatewayByRoute;
