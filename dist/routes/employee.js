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
const express_1 = require("express");
const EmployeeControllers = __importStar(require("../controllers/employee"));
const upload_1 = require("../utils/upload");
const router = (0, express_1.Router)();
router.get('/', EmployeeControllers.listEmployee);
router.post('/dropdownemploy', EmployeeControllers.optionEmployee);
router.post('/insert', upload_1.upload.single('image'), EmployeeControllers.insertEmployee);
router.post('/update', upload_1.upload.single('image'), EmployeeControllers.updateEmploy);
router.post('/detail', EmployeeControllers.listDetailEmploy);
router.post('/employee', EmployeeControllers.deleteEmploy);
// router.post('/create',upload.single('image'),FloorControllers.createFloor);
// router.get('/image/:id',FloorControllers.getMapFloorByID);
// router.post('/update',FloorControllers.updateFloor);
// router.delete('/delete/:id',FloorControllers.delFloor)
exports.default = router;
