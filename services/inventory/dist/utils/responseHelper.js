"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendSuccessResponse = SendSuccessResponse;
exports.SendErrorResponse = SendErrorResponse;
function SendSuccessResponse(res, _a) {
    var status = _a.status, data = _a.data, message = _a.message;
    return res
        .status(status)
        .json({ ok: true, message: message, statusCode: status, data: data });
}
function SendErrorResponse(res, _a) {
    var status = _a.status, message = _a.message, error = _a.error;
    return res.status(status).json({ ok: false, message: message, errorDetails: error });
}
