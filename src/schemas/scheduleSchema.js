"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllScheduleSchema = exports.findDetailScheduleSchema = exports.removeScheduleSchema = exports.updateScheduleSchema = exports.createScheduleSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.createScheduleSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    scheduleName: joi_1.default.string().max(100).required(),
    scheduleOfficeId: joi_1.default.number().integer().positive().required(),
    scheduleStartDate: joi_1.default.string().required(),
    scheduleEndDate: joi_1.default.string().required()
});
exports.updateScheduleSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    scheduleId: joi_1.default.number().integer().positive().required(),
    scheduleStart: joi_1.default.string().allow(null, '').optional(),
    scheduleEnd: joi_1.default.string().allow(null, '').optional(),
    scheduleBreakStart: joi_1.default.string().allow(null, '').optional(),
    scheduleBreakEnd: joi_1.default.string().allow(null, '').optional(),
    scheduleCategory: joi_1.default.string().valid('regular', 'libur').default('regular').optional()
});
exports.removeScheduleSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    scheduleId: joi_1.default.number().integer().positive().required()
});
exports.findDetailScheduleSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    scheduleId: joi_1.default.number().integer().positive().required()
});
exports.findAllScheduleSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    scheduleStatus: joi_1.default.string()
        .valid('waiting', 'progress', 'swap', 'done')
        .allow('')
        .optional(),
    scheduleStatusNot: joi_1.default.string()
        .valid('waiting', 'progress', 'swap', 'done')
        .allow('')
        .optional(),
    pagination: joi_1.default.boolean().optional(),
    startDate: joi_1.default.string().allow('').optional(),
    endDate: joi_1.default.string().allow('').optional(),
    officeId: joi_1.default.number().allow('').optional()
});
