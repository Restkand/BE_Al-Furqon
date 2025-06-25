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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouteNew = exports.createRoute = exports.listRouteByID = exports.dropDownRoute = exports.listRoute = void 0;
const model = __importStar(require("../models/route"));
const tools_1 = require("../utils/tools");
const listRoute = async (req, res) => {
    try {
        const route = await model.getListroute();
        res.json(route);
    }
    catch (error) {
        console.error("Error creating vendor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.listRoute = listRoute;
const dropDownRoute = async (req, res) => {
    try {
        const list = await model.listRoute();
        res.status(200).json(list);
    }
    catch (error) {
        console.error("Error creating vendor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.dropDownRoute = dropDownRoute;
const listRouteByID = async (req, res) => {
    try {
        const { routeid } = req.body;
        const list = await model.getListRouteById(routeid);
        res.status(200).json(list);
    }
    catch (error) {
        console.error("Error creating vendor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.listRouteByID = listRouteByID;
// export const listVendorID = async(
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const {
//       id
//     } = req.params
//     const vendor = await model.getListVendorID(id)
//         res.json(vendor)
//   } catch (error) {
//     console.error("Error creating vendor:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }
const createRoute = async (req, res) => {
    try {
        const { routeID, routeName, routeSeq, gateway, floor, status, created_by, updated_by } = req.body;
        const result = await model.insertRoute(routeID, routeName, routeSeq, gateway, floor, status, created_by, updated_by);
        res.status(200).json({
            success: true,
            message: 'Success Add Gateway',
            data: result
        });
    }
    catch (error) {
        console.error("Error creating vendor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.createRoute = createRoute;
const createRouteNew = async (req, res) => {
    try {
        const { name, details, created_by, updated_by } = req.body;
        const generateRouteID = await (0, tools_1.generateId)();
        const result = await model.insertRouteNew(generateRouteID, name, details, created_by, updated_by);
        // ✅ Check for success before accessing data
        if (!result.success || !result.data) {
            return res.status(400).json({
                success: false,
                message: result.message,
                error: result.error,
            });
        }
        const { master, insertedDetails } = result.data;
        return res.status(200).json({
            success: true,
            message: result.message,
            data: {
                master,
                insertedDetails,
            },
        });
    }
    catch (error) {
        console.error("Error creating vendor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.createRouteNew = createRouteNew;
// export const updateVendor = async(
//   req: express.Request,
//   res: express.Response
// )=>{
//   try {
//     const {
//       vendorName,
//       status,
//       updated_by,
//       id
//     } = req.body
//     const vendor = await model.updateVndr(
//       vendorName,
//       status,
//       updated_by,
//       id
//     )
//     if (vendor > 0) {
//       return res.status(200).json(sendStatus('Success Update Vendor'))
//     }else{
//       return res.status(400).json(sendStatus('Failed Update Vendor'))
//     }
//   } catch (error) {
//     console.error("Error creating vendor:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }
// export const delVendor = async (
//     req: express.Request,
//     res: express.Response
// ) => {
//   console.log('Received Headers:', req.headers);
//   console.log('Received Body:', req.body);
//     try {
//         const {
//             id
//         } = req.params
//         const {
//           updated_by
//         }= req.body
//         if (!id) {
//             return res.status(400).json({ message: "Missing user ID" });
//           }
//         const result = await model.deleteVndr(id,updated_by)
//         if (result > 0) {
//             return res.status(200).json(sendStatus("Success delete user"))
//         }else{
//             return res.status(400).json(sendStatus("Failed Delete User"))
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Failed to fetch users' });
//     }
// }
