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
exports.deleteQreDetail = exports.deleteQre = exports.updateQreDetail = exports.updateQre = exports.listDetailQre = exports.createQreDetail = exports.createQrelist = exports.listQre = void 0;
const model = __importStar(require("../models/question"));
const tools_1 = require("../utils/tools");
const listQre = async (res, req) => {
    try {
        const list = await model.listquestion;
        res.status(200).json(list);
    }
    catch (error) {
        console.error("Error creating beacon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.listQre = listQre;
const createQrelist = async (res, req) => {
    try {
        const { qre_listname, qre_point_plus, qre_point_min, created_by, updated_by } = req.body;
        const qre_id = await (0, tools_1.generateQuestionID)();
        const result = await model.createQuestList(qre_id, qre_listname, qre_point_plus, qre_point_min, created_by, updated_by);
        res.status(200).json({
            success: true,
            message: 'Success Insert Questionaire Point',
            data: result
        });
    }
    catch (error) {
        console.error("Error creating beacon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.createQrelist = createQrelist;
const createQreDetail = async (res, req) => {
    try {
        const { detailid, question, qre_point_plus, qre_point_min, created_by, updated_by } = req.body;
        const result = await model.createQuestDetail(detailid, question, qre_point_plus, qre_point_min, created_by, updated_by);
        res.status(200).json({
            success: true,
            message: "Success Insert Questionaire Detail",
            data: result
        });
    }
    catch (error) {
        console.error("Error creating beacon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.createQreDetail = createQreDetail;
const listDetailQre = async (res, req) => {
    try {
        const { qre_id } = req.body;
        const list = await model.listDetailQuest(qre_id);
        res.status(200).json(list);
    }
    catch (error) {
        console.error("Error creating beacon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.listDetailQre = listDetailQre;
const updateQre = async (res, req) => {
    try {
        const { qre_id, qre_for, qre_type, updated_by } = req.body;
        const result = await model.updateQre(qre_id, qre_for, qre_type, updated_by);
        res.status(200).json({
            success: true,
            message: "Update Success",
            data: result
        });
    }
    catch (error) {
        console.error("Error creating beacon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.updateQre = updateQre;
const updateQreDetail = async (res, req) => {
    try {
        const { qre_id, qre_quest, qre_point_plus, qre_point_min, question, qre_point_plus_quest, qre_point_min_quesst, updated_by } = req.body;
        const result = await model.updateQreDetail(qre_id, qre_quest, qre_point_plus, qre_point_min, question, qre_point_plus_quest, qre_point_min_quesst, updated_by);
        res.status(200).json({
            success: true,
            message: "Update Detail Success",
            data: result
        });
    }
    catch (error) {
        console.error("Error creating beacon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.updateQreDetail = updateQreDetail;
const deleteQre = async (res, req) => {
    try {
        const { id, updated_by } = req.body;
        const result = await model.deleteQre(id, updated_by);
        res.status(200).json({
            success: true,
            message: "Success Delete Data",
            data: result
        });
    }
    catch (error) {
        console.error("Error creating beacon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.deleteQre = deleteQre;
const deleteQreDetail = async (res, req) => {
    try {
        const { id, updated_by } = req.body;
        const result = await model.deleteQreDetail(id, updated_by);
        res.status(200).json({
            success: true,
            message: "Success Delete Data",
            data: result
        });
    }
    catch (error) {
        console.error("Error creating beacon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.deleteQreDetail = deleteQreDetail;
