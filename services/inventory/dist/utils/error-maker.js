"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMaker = void 0;
var ErrorMaker = function (eName, eMessage, status) {
    var name = new Error(eName).name;
    var message = new Error(eMessage).message;
    return { name: name, message: message, status: status };
};
exports.ErrorMaker = ErrorMaker;
