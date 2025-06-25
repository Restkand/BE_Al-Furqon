"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepart = exports.updateDepart = exports.insertDepart = exports.getListDepart = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const getListDepart = async () => {
    try {
        return await prisma_1.default.ms_department.findMany({
            where: { status: "A" },
            select: {
                id: true,
                department_id: true,
                department_name: true,
                status: true
            }
        });
    }
    catch (error) {
        console.error('Failed to get list department:', error);
        throw error;
    }
};
exports.getListDepart = getListDepart;
const insertDepart = async (departmentCode, departmentName, status, created_by, updated_by) => {
    try {
        return await prisma_1.default.ms_department.create({
            data: {
                department_id: departmentCode,
                department_name: departmentName,
                status: status,
                created_by: created_by,
                created_at: new Date(),
                updated_by: updated_by,
                updated_at: new Date()
            }
        });
    }
    catch (error) {
        console.error('Failed to create department:', error);
        throw error;
    }
};
exports.insertDepart = insertDepart;
const updateDepart = async (departmentCode, departmentName, status, updated_by, id) => {
    try {
        const idAsNumber = Number(id);
        return await prisma_1.default.ms_department.update({
            where: {
                id: idAsNumber
            },
            data: {
                department_id: departmentCode,
                department_name: departmentName,
                status: status,
                updated_by: updated_by,
                updated_at: new Date()
            }
        });
    }
    catch (error) {
        console.error('Failed to create department:', error);
        throw error;
    }
};
exports.updateDepart = updateDepart;
const deleteDepart = async (id, updated_by) => {
    try {
        const idAsNumber = Number(id);
        return await prisma_1.default.ms_department.update({
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
        console.error('Failed to create department:', error);
        throw error;
    }
};
exports.deleteDepart = deleteDepart;
