"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.membershipInviteSchema = exports.membershipUpdateSchema = exports.membershipRemoveSchema = exports.membershipFindAllSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.membershipFindAllSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().optional().allow(''),
    pagination: joi_1.default.boolean().optional()
});
exports.membershipRemoveSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    membershipId: joi_1.default.number().integer().positive().required()
});
exports.membershipUpdateSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    membershipId: joi_1.default.number().integer().positive().required(),
    membershipStatus: joi_1.default.string().valid('active', 'pending', 'rejected').optional(),
    membershipOfficeId: joi_1.default.number().integer().positive().allow(null).optional()
});
exports.membershipInviteSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    inviteCode: joi_1.default.string().required()
});
