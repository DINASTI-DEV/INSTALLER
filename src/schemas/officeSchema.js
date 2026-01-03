"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllOfficeLocationSchema = exports.findAllOfficeSchema = exports.findDetailOfficeSchema = exports.removeOfficeSchema = exports.updateOfficeSchema = exports.createOfficeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.createOfficeSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    officeName: joi_1.default.string().max(100).required(),
    officeAddress: joi_1.default.string().required(),
    officeLongitude: joi_1.default.string().max(100).required(),
    officeLatitude: joi_1.default.string().max(100).required(),
    officeMaximumDistanceAttendance: joi_1.default.number().integer().positive().default(10),
    officeWifiMacAddress: joi_1.default.string().max(250).optional()
});
exports.updateOfficeSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    officeId: joi_1.default.number().integer().positive().required(),
    officeName: joi_1.default.string().allow('').max(100).optional(),
    officeAddress: joi_1.default.string().allow('').required(),
    officeLongitude: joi_1.default.string().allow('').max(100).optional(),
    officeLatitude: joi_1.default.string().allow('').max(100).optional(),
    officeMaximumDistanceAttendance: joi_1.default.number()
        .integer()
        .positive()
        .default(10)
        .optional(),
    officeWifiMacAddress: joi_1.default.string().allow('').max(250).optional()
});
exports.removeOfficeSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    officeId: joi_1.default.number().integer().positive().required()
});
exports.findDetailOfficeSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    officeId: joi_1.default.number().integer().positive().required()
});
exports.findAllOfficeSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional()
});
exports.findAllOfficeLocationSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional()
});
