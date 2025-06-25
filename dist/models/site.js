"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSite = exports.updateSite = exports.insertSite = exports.getListSite = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const getListSite = async () => {
    try {
        return await prisma_1.default.ms_site.findMany({
            where: { status: "A" },
            select: {
                siteid: true,
                site_name: true,
                site_address: true,
                site_cluster: true,
                site_code: true,
                status: true
            }
        });
    }
    catch (error) {
        console.error('Failed to get list site:', error);
        throw error;
    }
};
exports.getListSite = getListSite;
const insertSite = async (siteCode, site_name, site_address, site_cluster, status, created_by, updated_by) => {
    try {
        return await prisma_1.default.ms_site.create({
            data: {
                site_name: site_name,
                site_address: site_address,
                status: status,
                site_code: siteCode,
                site_cluster: site_cluster,
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
exports.insertSite = insertSite;
const updateSite = async (site_name, site_address, site_cluster, status, updated_by, id) => {
    try {
        const idAsNumber = Number(id);
        return await prisma_1.default.ms_site.update({
            where: {
                siteid: idAsNumber
            },
            data: {
                site_name: site_name,
                site_address: site_address,
                site_cluster: site_cluster,
                status: status,
                updated_by: updated_by,
                updated_at: new Date()
            }
        });
    }
    catch (error) {
        console.error('Failed to create site:', error);
        throw error;
    }
};
exports.updateSite = updateSite;
const deleteSite = async (id, updated_by) => {
    try {
        const idAsNumber = Number(id);
        return await prisma_1.default.ms_site.update({
            where: {
                siteid: idAsNumber
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
exports.deleteSite = deleteSite;
