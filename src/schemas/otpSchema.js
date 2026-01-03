"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtpSchema = exports.requestOtpSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.requestOtpSchema = joi_1.default.object({
    whatsappNumber: joi_1.default.string()
        .pattern(/^[0-9]+$/)
        .min(10)
        .max(15)
        .required(),
    otpType: joi_1.default.string().valid('register', 'reset').required()
});
exports.verifyOtpSchema = joi_1.default.object({
    whatsappNumber: joi_1.default.string()
        .pattern(/^[0-9]+$/)
        .min(10)
        .max(15)
        .required(),
    otpCode: joi_1.default.string().max(100).required()
});
