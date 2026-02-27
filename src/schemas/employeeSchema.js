"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserFingerprintSchema = exports.createEmployeeSchema = exports.updateEmployeeSchema = exports.findAllEmployeeByOfficeSchema = exports.findDetailEmployeeSchema = exports.findAllEmployeeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.findAllEmployeeSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().min(0).default(0).optional(),
    size: joi_1.default.number().integer().min(1).default(10).optional(),
    userRole: joi_1.default.string().allow('').optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().default(true).optional(),
    employeeId: joi_1.default.string().optional().allow(''),
    officeId: joi_1.default.number().integer().optional().allow('')
});
exports.findDetailEmployeeSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    employeeId: joi_1.default.string().required()
});
exports.findAllEmployeeByOfficeSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().min(0).default(0).optional(),
    size: joi_1.default.number().integer().min(1).default(10).optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().default(true).optional(),
    officeId: joi_1.default.number().integer().optional().allow('')
});
exports.updateEmployeeSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    userId: joi_1.default.number(),
    userDeviceId: joi_1.default.string().optional().allow(''),
    userName: joi_1.default.string().optional().allow(''),
    userWhatsappNumber: joi_1.default.string().allow('').optional(),
    userFingerprintDeviceId: joi_1.default.string().allow('', null).optional(),
    userFingerprintDeviceName: joi_1.default.string().allow('', null).optional()
});
exports.createEmployeeSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    userName: joi_1.default.string().optional().allow(''),
    userWhatsappNumber: joi_1.default.string().allow('').optional()
});
exports.updateUserFingerprintSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    userId: joi_1.default.number().required(),
    userFingerprintId: joi_1.default.string().allow('', null).optional(),
    userFingerprintDeviceId: joi_1.default.string().allow('', null).optional(),
    userFingerprintDeviceName: joi_1.default.string().allow('', null).optional()
});
