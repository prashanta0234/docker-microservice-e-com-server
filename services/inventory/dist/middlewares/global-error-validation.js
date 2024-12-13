"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrorHandler = void 0;
var responseHelper_1 = require("../utils/responseHelper");
var library_1 = require("@prisma/client/runtime/library");
var GlobalErrorHandler = function (err, _, res, __) {
    var _a;
    var status = err.status || 500;
    var message = err.message || "Something went wrong";
    if (err instanceof library_1.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
                status = 400;
                message = "Unique constraint violation on ".concat((_a = err.meta) === null || _a === void 0 ? void 0 : _a.target);
                break;
            default:
                status = 400;
                message = "Prisma client error occurred.";
                break;
        }
    }
    else if (err instanceof library_1.PrismaClientUnknownRequestError) {
        status = 500;
        message = "Unknown Prisma error occurred.";
    }
    else if (err instanceof library_1.PrismaClientRustPanicError) {
        status = 500;
        message = "Prisma client experienced a rust panic.";
    }
    if (err.name === "ZodError") {
        status = 400;
        message = err.issues.reduce(function (msg, issue, index) {
            msg +=
                issue.received === "undefined"
                    ? issue.message
                    : "In ".concat(issue.path[0], " ").concat(issue.message);
            msg += index !== err.issues.length - 1 ? " || " : "";
            return msg;
        }, "");
    }
    if (err.name === "TokenExpiredError") {
        console.error(err);
        status = 401;
    }
    (0, responseHelper_1.SendErrorResponse)(res, { message: message, status: status, error: err });
};
exports.GlobalErrorHandler = GlobalErrorHandler;
