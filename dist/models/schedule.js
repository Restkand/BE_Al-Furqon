"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateScheduleControl = exports.insertScheduleControl = exports.deleteSetChedule = exports.updateSetChedule = exports.insertSetChedule = exports.getListSetSchedule = exports.getListSchedule = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const getListSchedule = async () => {
    try {
        const rawData = await prisma_1.default.$queryRawUnsafe(`
            SELECT 
              emp.id,
              emp.employee_id,
              emp.employee_name,
              emp.siteid,
              emp.department_id,
              emp.employee_type,
              emp.beacon_id,
              emp.vendor_id,
              scc.scheduleid,
              scd.track_id as trackid,
              sc.schedule_name as scname,
              scd.sch_start,
              scd.sch_end
            FROM ms_employee emp
            LEFT JOIN ms_schcontrols scc ON emp.employee_id = scc.employeeid
            inner join ms_schcontrols_detail scd ON scc.scheduleid = scd.schedule_id
            inner join ms_schedule sc on scd.set_id = sc.scheduleid
            WHERE emp.status = 'A'
          `);
        // Group by employee_id
        const grouped = new Map();
        rawData.forEach((row) => {
            if (!grouped.has(row.employee_id)) {
                grouped.set(row.employee_id, {
                    no: grouped.size + 1,
                    empid: row.employee_id,
                    name: `${row.employee_name}`, //(${row.employee_id})`, // Adjust as needed
                    position: row.employee_type || 'UNKNOWN',
                    sets: [],
                });
            }
            if (row.scheduleid) {
                grouped.get(row.employee_id).sets.push({
                    set: row.scname, //`SET ${row.scheduleid}`, // You can rename or format this
                    track: row.trackid,
                    start: row.sch_start,
                    finish: row.sch_end,
                });
            }
        });
        return Array.from(grouped.values());
    }
    catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
};
exports.getListSchedule = getListSchedule;
const getListSetSchedule = async (department) => {
    try {
        return await prisma_1.default.ms_schedule.findMany({
            where: {
                status: "A",
                department_id: department
            },
            select: {
                scheduleid: true,
                schedule_name: true,
                schedule_description: true,
                department_id: true,
                status: true
            }
        });
    }
    catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
};
exports.getListSetSchedule = getListSetSchedule;
const insertSetChedule = async (scheduleName, scheduleDesc, department, created_by, updated_by) => {
    try {
        return await prisma_1.default.ms_schedule.create({
            data: {
                schedule_name: scheduleName,
                schedule_description: scheduleDesc,
                department_id: department,
                created_by: created_by,
                created_at: new Date(),
                updated_by: updated_by,
                updated_at: new Date(),
                status: "A"
            }
        });
    }
    catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
};
exports.insertSetChedule = insertSetChedule;
const updateSetChedule = async (id, scheduleName, scheduleDesc, department, updated_by) => {
    try {
        const idAsNumber = Number(id);
        return await prisma_1.default.ms_schedule.update({
            where: {
                scheduleid: idAsNumber
            },
            data: {
                schedule_name: scheduleName,
                schedule_description: scheduleDesc,
                department_id: department,
                updated_by: updated_by,
                updated_at: new Date(),
            }
        });
    }
    catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
};
exports.updateSetChedule = updateSetChedule;
const deleteSetChedule = async (id, updated_by) => {
    try {
        const idAsNumber = Number(id);
        return await prisma_1.default.ms_schedule.update({
            where: {
                scheduleid: idAsNumber
            },
            data: {
                status: "X",
                updated_by: updated_by,
                updated_at: new Date(),
            }
        });
    }
    catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
};
exports.deleteSetChedule = deleteSetChedule;
const insertScheduleControl = async (scheduleID, details, employee, created_by, updated_by) => {
    try {
        const result = await prisma_1.default.$transaction([
            prisma_1.default.ms_schcontrols.create({
                data: {
                    scheduleid: scheduleID,
                    created_by: created_by,
                    created_at: new Date(),
                    updated_by: updated_by,
                    updated_at: new Date(),
                    employeeid: employee,
                },
            }),
            ...details.map((detail) => prisma_1.default.ms_schcontrols_detail.create({
                data: {
                    schedule_id: scheduleID,
                    set_id: detail.setId,
                    track_id: detail.trackId,
                    sch_start: detail.start,
                    sch_end: detail.end,
                    created_by: created_by,
                    created_at: new Date(),
                    updated_by: updated_by,
                    updated_at: new Date()
                }
            }))
        ]);
        const master = result[0];
        const detailCount = result.length - 1;
        return {
            success: true,
            message: 'Route and details inserted successfully',
            data: {
                master,
                insertedDetails: detailCount,
            },
        };
    }
    catch (error) {
        console.error('Failed to insert', error);
        throw error;
    }
};
exports.insertScheduleControl = insertScheduleControl;
const updateScheduleControl = async (id, set_id, track, start, end, updated_by) => {
    try {
        return await prisma_1.default.ms_schcontrols_detail.update({
            where: { id },
            data: {
                set_id: set_id,
                track_id: track,
                sch_start: start,
                sch_end: end,
                updated_by,
                updated_at: new Date(),
            },
        });
    }
    catch (error) {
        console.error('Failed to insert', error);
        throw error;
    }
};
exports.updateScheduleControl = updateScheduleControl;
