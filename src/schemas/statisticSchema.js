"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProductivitiesSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.findProductivitiesSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    attendanceScheduleId: joi_1.default.number().optional(),
    attendanceUserId: joi_1.default.number().optional(),
    attendanceTimeRange: joi_1.default.string()
        .valid('today', 'thisWeek', 'thisMonth', 'thisYear')
        .optional()
});
