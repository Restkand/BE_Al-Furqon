"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.listUser = void 0;
const model = __importStar(require("../models/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const listUser = async (req, res) => {
    try {
        const users = await model.getlistUser();
        // Convert BigInt fields to strings
        //   const safeUsers = users.map(user => ({
        //     ...user,
        //     id: user.id.toString(), // Assuming id is of type BigInt
        //   }));
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};
exports.listUser = listUser;
const createUser = async (req, res) => {
    try {
        const { name, username, password, email, role, status, site, created_user, updated_user, } = req.body;
        const checkuser = await model.checkUserExist(username);
        if (!checkuser) {
            const hash_random_password = bcrypt_1.default.hashSync(password, 10);
            const insert = await model.createUser(name, username, hash_random_password, email, role, status, site, created_user, updated_user);
            res.status(200).json({
                success: true,
                message: "Success Registered User",
                data: insert,
            });
        }
        else {
            res.status(401).json({
                success: false,
                message: "User Already Exist",
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    try {
        const { name, email, password, id, role, status, site, updated_user } = req.body;
        const result = await model.updateUser(name, email, password, id, role, status, site, updated_user);
        res.status(200).json({
            success: true,
            message: "Success Update User Data",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error Fetch update",
            error: error.message,
        });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { id, updated_user } = req.body;
        if (!id) {
            res.status(400).json({ message: "Missing user ID" });
        }
        const result = await model.deleteUsr(id, updated_user);
        res.status(200).json({
            success: true,
            message: "Success Delete User",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error Fetch Insert",
            error: error.message,
        });
    }
};
exports.deleteUser = deleteUser;
