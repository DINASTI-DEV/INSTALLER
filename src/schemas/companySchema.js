"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllCompanychema = exports.findDetailCompanychema = exports.updateCompanychema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.updateCompanychema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    companyId: joi_1.default.number().integer().positive().required(),
    companyName: joi_1.default.string().max(100).optional().allow(''),
    companyIndustry: joi_1.default.string().optional().allow('')
});
exports.findDetailCompanychema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema
});
exports.findAllCompanychema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional()
});
