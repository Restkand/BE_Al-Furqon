"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTrackType = exports.listTrackType = exports.createTrack = exports.getTrackByID = exports.getListTrack = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const getListTrack = async (site, floor) => {
    try {
        return await prisma_1.default.ms_track.findMany({
            where: { status: "A", siteid: site, floor: floor },
            select: {
                trackid: true,
                track_name: true,
                status: true,
                floor: true,
                siteid: true,
            },
        });
    }
    catch (error) {
        console.error("Failed to get list track:", error);
        throw error;
    }
};
exports.getListTrack = getListTrack;
const getTrackByID = async (id) => {
    try {
        const idAsNumber = Number(id);
        const track = await prisma_1.default.ms_track.findUnique({
            where: { trackid: idAsNumber },
            select: {
                trackid: true,
                siteid: true,
                track_name: true,
                floor: true,
            },
        });
        if (!track) {
            throw new Error(`Track with ID ${idAsNumber} not found`);
        }
        const floorid = await prisma_1.default.ms_floor.findFirst({
            where: { floor_id: track.floor },
            select: {
                id: true,
                floor_area: true,
                floor_name: true,
                floor_id: true,
            },
        });
        return {
            ...track,
            floorid, // return floor details under the key "floor"
        };
    }
    catch (error) {
        console.error("Failed to get list track:", error);
        throw error;
    }
};
exports.getTrackByID = getTrackByID;
const createTrack = async (trackName, site, floor, created_by, updated_by) => {
    try {
        return await prisma_1.default.ms_track.create({
            data: {
                track_name: trackName,
                siteid: String(site),
                floor: floor,
                created_at: new Date(),
                created_by: created_by,
                updated_at: new Date(),
                updated_by: updated_by,
                status: "A",
            },
        });
    }
    catch (error) {
        console.error("Failed to create vendor:", error);
        throw error;
    }
};
exports.createTrack = createTrack;
const listTrackType = async () => {
    try {
        return await prisma_1.default.ms_track_type.findMany({
            select: {
                id: true,
                track_type: true,
            },
        });
    }
    catch (error) {
        console.error("Failed to create vendor:", error);
        throw error;
    }
};
exports.listTrackType = listTrackType;
const createTrackType = async (type, created_by, updated_by) => {
    try {
        return await prisma_1.default.ms_track_type.create({
            data: {
                track_type: type,
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
exports.createTrackType = createTrackType;
