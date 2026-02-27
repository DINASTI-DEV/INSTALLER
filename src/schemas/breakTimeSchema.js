"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBreakTimeSchema = exports.findDetailBreakTimeSchema = exports.findAllBreakTimeSchema = exports.createBreakTimeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.createBreakTimeSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    breakTimeOfficeId: joi_1.default.number().integer().positive().required()
});
exports.findAllBreakTimeSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().min(0).optional(),
    size: joi_1.default.number().integer().min(1).optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional(),
    officeId: joi_1.default.number().integer().positive().allow('').optional()
});
exports.findDetailBreakTimeSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    breakTimeId: joi_1.default.number().integer().positive().required()
});
exports.removeBreakTimeSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    breakTimeId: joi_1.default.number().integer().positive().required()
});
