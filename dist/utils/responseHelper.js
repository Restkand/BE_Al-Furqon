"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseformat = exports.sendSuccess = void 0;
exports.sendStatus = sendStatus;
exports.sendMessageStatus = sendMessageStatus;
function sendStatus(message) {
    return {
        message,
    };
}
function sendMessageStatus(message, status) {
    return {
        status,
        message,
    };
}
const sendSuccess = (message, data = []) => {
    return {
        message,
        data: data ?? [], // Ensure data is an empty array if not provided
    };
};
exports.sendSuccess = sendSuccess;
const responseformat = (status, data, message, res) => {
    res.status(status).json({
        status,
        data,
        message,
    });
};
exports.responseformat = responseformat;
