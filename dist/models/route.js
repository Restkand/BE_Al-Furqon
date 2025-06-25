"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertRouteNew = exports.insertRoute = exports.getListRouteById = exports.listRoute = exports.getListroute = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const getListroute = async () => {
    try {
        const route = await prisma_1.default.$queryRaw `
        SELECT * , d.id as idFloor
        FROM ms_route a
        INNER JOIN ms_route_detail b ON a.route_id = b.route_id
        INNER JOIN ms_gateway c ON b.gateway_id = c.gateway_id
        INNER JOIN ms_floor d ON c.floor_id = d.floor_id
        `;
        return route;
    }
    catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
};
exports.getListroute = getListroute;
const listRoute = async () => {
    try {
        const route = await prisma_1.default.ms_route.findMany({
            where: { status: 'A' },
            select: {
                id: true,
                route_id: true,
                route_name: true
            }
        });
        return route;
    }
    catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
};
exports.listRoute = listRoute;
const getListRouteById = async (routeid) => {
    try {
        const result = await prisma_1.default.$queryRaw `
        SELECT * , d.id as idFloor
        FROM ms_route a
        INNER JOIN ms_route_detail b ON a.route_id = b.route_id
        INNER JOIN ms_gateway c ON b.gateway_id = c.gateway_id
        INNER JOIN ms_floor d ON c.floor_id = d.floor_id
        WHERE a.route_id = ${routeid}
        `;
        return result;
    }
    catch (error) {
        console.error('Failed to get list route:', error);
        throw error;
    }
};
exports.getListRouteById = getListRouteById;
// export const getListRouteById = async (routeid: string) => {
//     return await prisma.ms_route.findMany({
//       where: {
//         route_id: routeid,
//         status: 'A',
//       },
//       include: {
//         ms_route_detail: {
//           include: {
//             ms_gateway: {
//               include: {
//                 ms_floor: true,
//               },
//             },
//           },
//         },
//       },
//     })
//   }
const insertRoute = async (routeID, routeName, routeSeq, gateway, floor, status, created_by, updated_by) => {
    try {
        const result = await prisma_1.default.$queryRaw `
        insert into "ms_route" (route_id,route_seq,gateway_id,created_by,created_at,updated_by,updated_at,status,route_name)
        VALUES (${routeID},${routeSeq},${gateway},${created_by},NOW(),${updated_by},NOW(),${status},${routeName})
        `;
        return 200;
    }
    catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
};
exports.insertRoute = insertRoute;
const insertRouteNew = async (routeID, routeName, details, created_by, updated_by) => {
    try {
        const result = await prisma_1.default.$transaction([
            prisma_1.default.ms_route.create({
                data: {
                    route_id: routeID,
                    route_name: routeName,
                    created_by,
                    created_at: new Date(),
                    updated_by,
                    updated_at: new Date(),
                    status: 'A'
                },
            }),
            ...details.map((detail) => prisma_1.default.ms_route_detail.create({
                data: {
                    route_id: routeID,
                    route_seq: detail.routeSeq,
                    gateway_id: detail.gateway,
                    start_time: detail.start,
                    end_time: detail.end,
                    created_by,
                    created_at: new Date(),
                    updated_by,
                    updated_at: new Date(),
                },
            })),
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
        return {
            success: false,
            message: 'Failed to insert route and details',
            error: error.message,
        };
    }
};
exports.insertRouteNew = insertRouteNew;
// export const 
