"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertTeam = exports.listTeam = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const listTeam = async (departmentid) => {
    try {
        const rawData = await prisma_1.default.$queryRawUnsafe(`
            SELECT bt.id,
            bt.team_id,
            bt.team_name, 
            bt.department_id, 
            bt.route_id, 
            btd.id as btdId,
            btd.employee_id,
            btd.gateway_id,
            dp.department_name, 
            emp.employee_name, 
            gt.gateway_name,
            mr.route_name
            from ms_batch_team bt 
            inner join ms_batch_team_detail btd on bt.team_id = btd.team_id 
            left join ms_route mr on bt.route_id = mr.route_id
            left join ms_department dp on bt.department_id = dp.department_id 
            left join ms_employee emp on btd.employee_id = emp.employee_id 
            left join ms_gateway gt on btd.gateway_id = gt.gateway_id 
            where bt.department_id = '${departmentid}' and btd.status = 'A'
            `);
        // return rawData
        const grouped = new Map();
        rawData.forEach((row) => {
            if (!grouped.has(row.team_id)) {
                grouped.set(row.team_id, {
                    no: grouped.size + 1,
                    route: row.route_name,
                    name: row.team_name,
                    department: row.department_name,
                    teams: []
                });
            }
            if (row.team_id) {
                grouped.get(row.team_id).teams.push({
                    employee: row.employee_name, //`SET ${row.scheduleid}`, // You can rename or format this
                    gateway: row.gateway_name,
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
exports.listTeam = listTeam;
const insertTeam = async (teamId, teamName, routeId, details, created_by, updated_by, departmentID) => {
    try {
        const result = await prisma_1.default.$transaction([
            prisma_1.default.ms_batch_team.create({
                data: {
                    team_id: teamId,
                    team_name: teamName,
                    route_id: routeId,
                    created_by: created_by,
                    created_at: new Date(),
                    updated_by: updated_by,
                    updated_at: new Date(),
                    department_id: departmentID
                }
            }),
            ...details.map((detail) => prisma_1.default.ms_batch_team_detail.create({
                data: {
                    team_id: teamId,
                    employee_id: detail.employeeId,
                    gateway_id: detail.gatewayId,
                    status: 'A',
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
exports.insertTeam = insertTeam;
