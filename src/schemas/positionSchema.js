"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignPositionSchema = exports.findAllPositionSchema = exports.findDetailPositionSchema = exports.removePositionSchema = exports.updatePositionchema = exports.createPositionSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.createPositionSchema = joi_1.default.object({
    positionName: joi_1.default.string().trim().min(2).max(100).required().messages({
        'string.base': 'positionName harus berupa string',
        'string.empty': 'positionName tidak boleh kosong',
        'string.min': 'positionName minimal 2 karakter',
        'string.max': 'positionName maksimal 100 karakter',
        'any.required': 'positionName wajib diisi'
    }),
    positionHourlySalary: joi_1.default.number().precision(2).positive().required().messages({
        'number.base': 'position harus berupa angka',
        'number.positive': 'position harus lebih dari 0',
        'any.required': 'position wajib diisi'
    })
});
exports.updatePositionchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    positionId: joi_1.default.number().precision(2).positive().required().messages({
        'number.base': 'positionId harus berupa angka',
        'number.positive': 'positionId harus lebih dari 0',
        'any.required': 'positionId wajib diisi'
    }),
    positionName: joi_1.default.string().trim().min(2).max(100).required().messages({
        'string.base': 'positionName harus berupa string',
        'string.empty': 'positionName tidak boleh kosong',
        'string.min': 'positionName minimal 2 karakter',
        'string.max': 'positionName maksimal 100 karakter',
        'any.required': 'positionName wajib diisi'
    }),
    positionHourlySalary: joi_1.default.number().precision(2).positive().required().messages({
        'number.base': 'positionHourlySalary harus berupa angka',
        'number.positive': 'positionHourlySalary harus lebih dari 0',
        'any.required': 'positionHourlySalary wajib diisi'
    })
});
exports.removePositionSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    positionId: joi_1.default.number().integer().positive().required()
});
exports.findDetailPositionSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    positionId: joi_1.default.number().integer().positive().required()
});
exports.findAllPositionSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional()
});
exports.assignPositionSchema = joi_1.default.object({
    positionId: joi_1.default.number().integer().positive().required(),
    userIds: joi_1.default.array().items(joi_1.default.number().integer().positive()).min(1).required()
});
