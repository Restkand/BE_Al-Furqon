"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsr = exports.updateUser = exports.createUser = exports.checkUserExist = exports.getlistUser = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const getlistUser = async () => {
    return await prisma_1.default.users.findMany({
        select: {
            id: true,
            name: true,
            username: true,
            email: true,
            role: true,
            status: true,
            site: true,
        },
    });
};
exports.getlistUser = getlistUser;
const checkUserExist = async (username) => {
    try {
        const result = await prisma_1.default.$queryRaw `SELECT COUNT(*)::bigint as count FROM users WHERE username = ${username}`;
        return result[0].count > 0;
    }
    catch (error) {
        console.error("Error checking user existence:", error);
        throw error;
    }
};
exports.checkUserExist = checkUserExist;
const createUser = async (name, username, password, email, role, status, site, created_user, updated_user) => {
    try {
        return await prisma_1.default.users.create({
            data: {
                name: name,
                username: username,
                password: password,
                email: email,
                role: role,
                status: status,
                site: site,
                created_at: new Date(),
                created_user: created_user,
                updated_at: new Date(),
                updated_user: updated_user,
            },
        });
    }
    catch (error) {
        console.error("Failed to create user:", error);
        throw error;
    }
};
exports.createUser = createUser;
const updateUser = async (name, email, password, id, role, status, site, updated_user) => {
    try {
        const idAsNumber = Number(id);
        return await prisma_1.default.users.update({
            where: { id: idAsNumber },
            data: {
                name: name,
                email: email,
                role: role,
                site: site,
                password: password,
                status: status,
                updated_at: new Date(),
                updated_user: updated_user,
            },
        });
    }
    catch (error) {
        console.error("Failed to update user:", error);
        throw error;
    }
};
exports.updateUser = updateUser;
const deleteUsr = async (id, updated_user) => {
    try {
        const idAsNumber = Number(id);
        return await prisma_1.default.users.update({
            where: { id: idAsNumber },
            data: {
                status: "X",
                updated_at: new Date(),
                updated_user: updated_user,
            },
        });
    }
    catch (error) {
        console.error("Failed to update user:", error);
        throw error;
    }
};
exports.deleteUsr = deleteUsr;
