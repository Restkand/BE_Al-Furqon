"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVndr = exports.updateVndr = exports.insertVendor = exports.getListVendorID = exports.getListVendor = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const getListVendor = async () => {
    try {
        return await prisma_1.default.ms_vendor.findMany({
            where: { status: "A" },
            select: {
                id: true,
                vendor_id: true,
                vendor_name: true,
                status: true
            }
        });
    }
    catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
};
exports.getListVendor = getListVendor;
const getListVendorID = async (id) => {
    try {
        const idAsNumber = Number(id);
        return await prisma_1.default.ms_vendor.findUnique({
            where: { id: idAsNumber },
            select: {
                vendor_id: true,
                vendor_name: true,
                status: true
            }
        });
    }
    catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
};
exports.getListVendorID = getListVendorID;
const insertVendor = async (vendorID, vendorName, status, created_by, updated_by) => {
    try {
        return await prisma_1.default.ms_vendor.create({
            data: {
                vendor_id: vendorID,
                vendor_name: vendorName,
                status: status,
                created_by: created_by,
                created_at: new Date(),
                updated_by: updated_by,
                updated_at: new Date()
            }
        });
    }
    catch (error) {
        console.error('Failed to create vendor:', error);
        throw error;
    }
};
exports.insertVendor = insertVendor;
const updateVndr = async (vendorName, status, updated_by, id) => {
    try {
        const idAsNumber = Number(id);
        return await prisma_1.default.ms_vendor.update({
            where: {
                id: idAsNumber
            },
            data: {
                vendor_name: vendorName,
                status: status,
                updated_by: updated_by,
                updated_at: new Date()
            }
        });
    }
    catch (error) {
        console.error('Failed to create vendor:', error);
        throw error;
    }
};
exports.updateVndr = updateVndr;
const deleteVndr = async (id, updated_by) => {
    try {
        const idAsNumber = Number(id);
        return await prisma_1.default.ms_vendor.update({
            where: {
                id: idAsNumber
            },
            data: {
                status: "X",
                updated_by: updated_by,
                updated_at: new Date()
            }
        });
    }
    catch (error) {
        console.error('Failed to create vendor:', error);
        throw error;
    }
};
exports.deleteVndr = deleteVndr;
