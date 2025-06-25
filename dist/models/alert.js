"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAlertType = exports.updateAlertType = exports.insertAlertType = exports.listAlertType = exports.deleteAlibiAlert = exports.updateAlibiAlert = exports.insertAlibi = exports.listAlibi = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const listAlibi = async () => {
    try {
        return await prisma_1.default.ms_alert_reason.findMany({
            where: {
                status: "A",
            },
            select: {
                id: true,
                reason_id: true,
                reason_name: true,
                status: true
            }
        });
    }
    catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
};
exports.listAlibi = listAlibi;
const insertAlibi = async (alibicode, name, created_by, updated_by) => {
    try {
        return await prisma_1.default.ms_alert_reason.create({
            data: {
                reason_id: alibicode,
                reason_name: name,
                status: "A",
                created_by: created_by,
                created_at: new Date(),
                updated_by: updated_by,
                updated_at: new Date()
            }
        });
    }
    catch (error) {
        console.error('Failed to created Alibi', error);
        throw error;
    }
};
exports.insertAlibi = insertAlibi;
const updateAlibiAlert = async (id, name, updated_by) => {
    try {
        const idAsNumber = Number(id);
        return await prisma_1.default.ms_alert_reason.update({
            where: {
                id: idAsNumber
            },
            data: {
                reason_name: name,
                updated_by: updated_by,
                updated_at: new Date()
            }
        });
    }
    catch (error) {
        console.error('Failed to created Alibi', error);
        throw error;
    }
};
exports.updateAlibiAlert = updateAlibiAlert;
const deleteAlibiAlert = async (id, updated_by) => {
    try {
        const idAsNumber = Number(id);
        return await prisma_1.default.ms_alert_reason.update({
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
        console.error('Failed to created Alibi', error);
        throw error;
    }
};
exports.deleteAlibiAlert = deleteAlibiAlert;
const listAlertType = async () => {
    try {
        return await prisma_1.default.ms_alerttype.findMany({
            select: {
                reason_type_id: true,
                reason_type_name: true,
                created_by: true
            }
        });
    }
    catch (error) {
        console.error('Failed to created Alibi', error);
        throw error;
    }
};
exports.listAlertType = listAlertType;
const insertAlertType = async (type_name, created_by, updated_by) => {
    try {
        return await prisma_1.default.ms_alerttype.create({
            data: {
                reason_type_name: type_name,
                created_by: created_by,
                created_at: new Date(),
                updated_by: updated_by,
                updated_at: new Date()
            }
        });
    }
    catch (error) {
        console.error('Failed to created Alibi', error);
        throw error;
    }
};
exports.insertAlertType = insertAlertType;
const updateAlertType = async (type_id, type_name, updated_by) => {
    try {
        const idAsNumber = Number(type_id);
        return await prisma_1.default.ms_alerttype.update({
            where: {
                reason_type_id: idAsNumber
            },
            data: {
                reason_type_name: type_name,
                updated_by: updated_by,
                updated_at: new Date()
            }
        });
    }
    catch (error) {
        console.error('Failed to created Alibi', error);
        throw error;
    }
};
exports.updateAlertType = updateAlertType;
const deleteAlertType = async (type_id, updated_by) => {
    try {
        const idAsNumber = Number(type_id);
        return await prisma_1.default.ms_alerttype.update({
            where: {
                reason_type_id: idAsNumber
            },
            data: {
                updated_by: updated_by,
                updated_at: new Date()
            }
        });
    }
    catch (error) {
        console.error('Failed to created Alibi', error);
        throw error;
    }
};
exports.deleteAlertType = deleteAlertType;
