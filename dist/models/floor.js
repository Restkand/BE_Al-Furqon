"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFl = exports.updateFl = exports.getMapFloorByID = exports.listFloorBySite = exports.getFloorByID = exports.insertFloor = exports.getListFloor = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const getListFloor = async () => {
    try {
        const floor = await prisma_1.default.ms_floor.findMany({
            where: { status: "A" },
        });
        const siteIds = floor
            .map((f) => f.siteid)
            .filter((id) => id !== null && id !== undefined);
        // Convert to numbers, filtering out NaN
        const idAsNumbers = siteIds
            .map((id) => Number(id))
            .filter((id) => !isNaN(id));
        const sites = await prisma_1.default.ms_site.findMany({
            where: {
                siteid: { in: idAsNumbers },
            },
            select: {
                siteid: true,
                site_name: true,
            },
        });
        const siteMap = new Map(sites.map((site) => [site.siteid, site.site_name]));
        const result = floor.map((floor) => {
            const siteIdNumber = floor.siteid ? Number(floor.siteid) : null;
            const siteName = siteIdNumber !== null ? siteMap.get(siteIdNumber) : null;
            return {
                ...floor,
                site_name: siteName || null,
            };
        });
        return result;
    }
    catch (error) {
        console.error("Failed to get list vendor:", error);
        throw error;
    }
};
exports.getListFloor = getListFloor;
const insertFloor = async (floorID, site, nama, area, status, created_by, updated_by, filename) => {
    try {
        return await prisma_1.default.ms_floor.create({
            data: {
                floor_id: floorID,
                siteid: site,
                floor_name: nama,
                filename: filename,
                status: status,
                floor_area: area,
                created_by: created_by,
                created_at: new Date(),
                updated_by: updated_by,
                updated_at: new Date(),
            },
        });
    }
    catch (error) {
        console.error("Failed to create vendor:", error);
        throw error;
    }
};
exports.insertFloor = insertFloor;
const getFloorByID = async (id) => {
    try {
        const idNumber = Number(id);
        return await prisma_1.default.ms_floor.findUnique({
            where: { id: idNumber },
            select: {
                floor_id: true,
                floor_name: true,
                siteid: true,
            },
        });
    }
    catch (err) { }
};
exports.getFloorByID = getFloorByID;
const listFloorBySite = async (site) => {
    try {
        const result = await prisma_1.default.$queryRaw `
        Select id, floor_id, floor_name, filename, status from ms_floor a where a.siteid = ${site} and status = 'A'
        `;
        return result;
    }
    catch (error) { }
};
exports.listFloorBySite = listFloorBySite;
const getMapFloorByID = async (id) => {
    try {
        const idNumber = Number(id);
        const mapfloor = await prisma_1.default.ms_floor.findUnique({
            where: { id: idNumber },
            select: { filename: true },
        });
        return mapfloor?.filename;
    }
    catch (error) {
        console.error("DB error:", error);
        return null;
    }
};
exports.getMapFloorByID = getMapFloorByID;
const updateFl = async (vendorName, status, updated_by, id) => {
    try {
        const idAsNumber = Number(id);
        return await prisma_1.default.ms_vendor.update({
            where: {
                id: idAsNumber,
            },
            data: {
                vendor_name: vendorName,
                status: status,
                updated_by: updated_by,
                updated_at: new Date(),
            },
        });
    }
    catch (error) {
        console.error("Failed to create vendor:", error);
        throw error;
    }
};
exports.updateFl = updateFl;
const deleteFl = async (id, updated_by) => {
    try {
        const idAsNumber = Number(id);
        return await prisma_1.default.ms_floor.update({
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
        console.error("Failed to create vendor:", error);
        throw error;
    }
};
exports.deleteFl = deleteFl;
