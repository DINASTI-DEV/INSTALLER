"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtPayloadSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.jwtPayloadSchema = joi_1.default.object({
    userId: joi_1.default.number().optional(),
    userRole: joi_1.default.string().optional(),
    userName: joi_1.default.string().optional(),
    iat: joi_1.default.any().optional(),
});
