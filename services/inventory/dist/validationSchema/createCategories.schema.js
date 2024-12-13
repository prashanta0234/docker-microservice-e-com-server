"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zod_1 = require("zod");
var CreateCategoriesSchema = zod_1.z.object({
    c_name: zod_1.z
        .string({ required_error: "Categories Name is required!" })
        .min(1)
        .max(250),
});
exports.default = CreateCategoriesSchema;
