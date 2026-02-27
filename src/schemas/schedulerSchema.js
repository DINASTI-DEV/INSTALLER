"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllSchedulerRunsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.findAllSchedulerRunsSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().min(0).optional(),
    size: joi_1.default.number().integer().min(1).optional(),
    pagination: joi_1.default.boolean().optional(),
    jobName: joi_1.default.string().allow('').optional(),
    status: joi_1.default.string().valid('pending', 'success', 'failed').allow('').optional()
});
