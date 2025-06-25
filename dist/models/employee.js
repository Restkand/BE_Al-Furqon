"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.getEmployeeDetail = exports.updateEmployee = exports.insertEmp = exports.listemploy = exports.getListEmployee = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const getListEmployee = async () => {
    return await prisma_1.default.ms_employee.findMany({
        where: { status: "A" },
        select: {
            id: true,
            employee_id: true,
            employee_name: true,
            employee_type: true,
            department_id: true,
            beacon_id: true,
            siteid: true,
            status: true
        }
    });
};
exports.getListEmployee = getListEmployee;
const listemploy = async (routeid) => {
    try {
        const employ = await prisma_1.default.$queryRaw `
        select * 
        from ms_employee a 
        inner join ms_schcontrols b on a.employee_id = b.employeeid 
        inner join ms_schcontrols_detail c on b.scheduleid = c.schedule_id 
        where c.track_id = ${routeid}
        `;
        return employ;
    }
    catch (error) {
        console.error('Failed to create vendor:', error);
        throw error;
    }
};
exports.listemploy = listemploy;
const insertEmp = async (employeeid, employeename, employeetype, vendor, beacon, site, department, phone, filename, status, created_by, updated_by) => {
    try {
        return await prisma_1.default.ms_employee.create({
            data: {
                employee_id: employeeid,
                employee_name: employeename,
                employee_type: employeetype,
                vendor_id: vendor,
                beacon_id: beacon,
                siteid: site,
                department_id: department,
                emp_phone: phone,
                photo: filename,
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
exports.insertEmp = insertEmp;
const updateEmployee = async (id, employeeName, employeePhone, department, employeeType, vendor, beacon, status, filename, updated_by) => {
    try {
        const idAsNumber = Number(id);
        return await prisma_1.default.ms_employee.update({
            where: {
                id: idAsNumber
            },
            data: {
                employee_name: employeeName,
                employee_type: employeeType,
                emp_phone: employeePhone,
                beacon_id: beacon,
                department_id: department,
                vendor_id: vendor,
                status: status,
                photo: filename,
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
exports.updateEmployee = updateEmployee;
const getEmployeeDetail = async (id) => {
    try {
        return await prisma_1.default.ms_employee.findUnique({
            where: { id },
        });
    }
    catch (error) {
        throw new Error("Failed to fetch employee detail");
    }
};
exports.getEmployeeDetail = getEmployeeDetail;
const deleteEmployee = async (id, updated_by) => {
    try {
        return await prisma_1.default.ms_employee.update({
            where: { id },
            data: {
                status: "X",
                updated_by: updated_by,
                updated_at: new Date()
            }
        });
    }
    catch (error) {
        throw new Error("Failed to fetch employee detail");
    }
};
exports.deleteEmployee = deleteEmployee;
// export const insertEmployee = async(empoyeeId: string, employeeName: string, empPhone: string, vendor: string, department: string,empType: string,beacon: string, status: string,created_by: string,created_at: string) => {
// }
