"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListGatewayByRoute = exports.deleteGateway = exports.updateGateway = exports.addGateway = exports.insertGateway = exports.listGatewayByFloor = exports.getListGateway = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const getListGateway = async () => {
    try {
        return await prisma_1.default.ms_gateway.findMany({
            where: { status: "A" },
            select: {
                id: true,
                gateway_id: true,
                siteid: true,
                gateway_name: true,
                floor_id: true,
                gateway_mac_addr: true,
                ip_address: true,
                status: true,
            },
        });
    }
    catch (error) {
        console.error("Failed to get list vendor:", error);
        throw error;
    }
};
exports.getListGateway = getListGateway;
const listGatewayByFloor = async (floorid, site) => {
    try {
        const result = await prisma_1.default.$queryRaw `
        select id,
        gateway_id,
        siteid,
        gateway_name,
        gateway_mac_addr,
        ip_address,
        x_percent,y_percent,
        status 
        from ms_gateway where floor_id = ${String(floorid)} and siteid = ${site} and status = 'A'
        `;
        return result;
    }
    catch (error) {
        console.error("Failed to get list vendor:", error);
        throw error;
    }
};
exports.listGatewayByFloor = listGatewayByFloor;
const insertGateway = async (gateway_id, site, name, floor, gatewayMacAddr, ipAddr, x_coordinate, y_coordinate, status, created_by, updated_by, area) => {
    try {
        return await prisma_1.default.ms_gateway.create({
            data: {
                gateway_id: gateway_id,
                siteid: site,
                gateway_name: name,
                floor_id: floor,
                gateway_mac_addr: gatewayMacAddr,
                ip_address: ipAddr,
                x_percent: x_coordinate,
                y_percent: y_coordinate,
                status: "A",
                gateway_area: area,
                created_by: created_by,
                created_at: new Date(),
                updated_by: updated_by,
                updated_at: new Date(),
            },
        });
    }
    catch (error) {
        console.error("Failed to create gateway:", error);
        throw error;
    }
};
exports.insertGateway = insertGateway;
const addGateway = async (gatewayID, gateway_name, gateway_addrs, gateway_MQID, gateway_area, site, floor, created_by, updated_by) => {
    try {
        return await prisma_1.default.ms_gateway.create({
            data: {
                gateway_id: gatewayID,
                gateway_name: gateway_name,
                gateway_mac_addr: gateway_MQID,
                ip_address: gateway_addrs,
                gateway_area: gateway_area,
                siteid: site,
                floor_id: floor,
                status: "A",
                created_by: created_by,
                created_at: new Date(),
                updated_by: updated_by,
                updated_at: new Date(),
            },
        });
    }
    catch (error) {
        console.error("Failed to create gateway:", error);
        throw error;
    }
};
exports.addGateway = addGateway;
const updateGateway = async (site, name, floor, gatewayMacAddr, ipAddr, status, updated_by, id) => {
    try {
        const idAsNumber = Number(id);
        return await prisma_1.default.ms_gateway.update({
            where: {
                id: idAsNumber,
            },
            data: {
                siteid: site,
                gateway_name: name,
                floor_id: floor,
                gateway_mac_addr: gatewayMacAddr,
                ip_address: ipAddr,
                status: status,
                updated_by: updated_by,
                updated_at: new Date(),
            },
        });
    }
    catch (error) {
        console.error("Failed to create beacon:", error);
        throw error;
    }
};
exports.updateGateway = updateGateway;
const deleteGateway = async (id, updated_by) => {
    try {
        const idAsNumber = Number(id);
        return await prisma_1.default.ms_gateway.update({
            where: {
                id: idAsNumber,
            },
            data: {
                status: "X",
                updated_by: updated_by,
                updated_at: new Date(),
            },
        });
    }
    catch (error) {
        console.error("Failed to create beacon:", error);
        throw error;
    }
};
exports.deleteGateway = deleteGateway;
const getListGatewayByRoute = async (routeid) => {
    try {
        const result = await prisma_1.default.$queryRaw `
        select a.id, 
        a.gateway_id as gatewayid, 
        gateway_name as name, 
        x_percent as x_coordinate, 
        y_percent as y_coordinate,
        route_seq as seq
         from ms_gateway a inner join ms_route_detail b on a.gateway_id = b.gateway_id where b.route_id = ${routeid}
        `;
        return result;
    }
    catch (error) {
        console.error("Failed to get list route:", error);
        throw error;
    }
};
exports.getListGatewayByRoute = getListGatewayByRoute;
