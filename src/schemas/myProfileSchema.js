"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOnboardingSchema = exports.updateMyProfileSchema = exports.findDetailMyProfileSchema = exports.findMyProfileSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.findMyProfileSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema
});
exports.findDetailMyProfileSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema
});
exports.updateMyProfileSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    userName: joi_1.default.string().allow('').min(3).max(30).optional(),
    userPassword: joi_1.default.string().allow('').min(6).max(128).optional(),
    userWhatsappNumber: joi_1.default.string().optional().allow('')
});
exports.updateOnboardingSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    userOnboardingStatus: joi_1.default.string().valid('waiting', 'completed').required()
});
