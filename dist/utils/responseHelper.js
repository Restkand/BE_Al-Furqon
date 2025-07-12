"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHelper = void 0;
const responseHelper = (res, statusCode, message, data = null, error = null) => {
    return res.status(statusCode).json({
        status: statusCode >= 200 && statusCode < 300 ? 'success' : 'error',
        message,
        data,
        error: error instanceof Error ? error.message : error
    });
};
exports.responseHelper = responseHelper;
//# sourceMappingURL=responseHelper.js.map