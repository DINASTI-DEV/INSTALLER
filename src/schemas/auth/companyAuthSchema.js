"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyUpdatePasswordSchema = exports.companyLoginSchema = exports.companyrRegistrationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const userRegisterSchema = joi_1.default.object({
    userName: joi_1.default.string().optional().allow(''),
    userWhatsappNumber: joi_1.default.string().required(),
    userPassword: joi_1.default.string().min(6).required()
});
const companyRegisterSchema = joi_1.default.object({
    companyName: joi_1.default.string().max(100).required(),
    companyIndustry: joi_1.default.string().optional().allow('')
});
exports.companyrRegistrationSchema = joi_1.default.object({
    user: userRegisterSchema,
    company: companyRegisterSchema
});
exports.companyLoginSchema = joi_1.default.object({
    userWhatsappNumber: joi_1.default.string().required(),
    userPassword: joi_1.default.string().required()
});
exports.companyUpdatePasswordSchema = joi_1.default.object({
    userPassword: joi_1.default.string().min(6).required(),
    userWhatsappNumber: joi_1.default.string().required()
});
