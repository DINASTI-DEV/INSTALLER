"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAdminUserSchema = exports.updateAdminUserSchema = exports.createAdminUserSchema = exports.findAllAdminUsersSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.findAllAdminUsersSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().min(0).optional(),
    size: joi_1.default.number().integer().min(1).optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional()
});
exports.createAdminUserSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    userName: joi_1.default.string().trim().min(2).max(100).required(),
    userWhatsappNumber: joi_1.default.string().trim().required(),
    userPassword: joi_1.default.string().min(6).required()
});
exports.updateAdminUserSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    userId: joi_1.default.number().integer().positive().required(),
    userName: joi_1.default.string().trim().min(2).max(100).optional(),
    userWhatsappNumber: joi_1.default.string().trim().optional(),
    userPassword: joi_1.default.string().min(6).optional().allow('')
});
exports.removeAdminUserSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    userId: joi_1.default.number().integer().positive().required()
});
