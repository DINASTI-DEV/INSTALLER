"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const otpSchema_1 = require("../../schemas/otpSchema");
const requestHandler_1 = require("../../utilities/requestHandler");
const redis_1 = __importDefault(require("../../configs/redis"));
const verifyOtp = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(otpSchema_1.verifyOtpSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const storedOtp = await redis_1.default.get(`otp:${validatedData.otpCode}`);
        if (!storedOtp || storedOtp !== validatedData.otpCode) {
            const message = 'Invalid or expired OTP!';
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response_1.ResponseData.error({ message }));
        }
        await redis_1.default.del(`otp:${validatedData.otpCode}`);
        const response = response_1.ResponseData.success({});
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.verifyOtp = verifyOtp;
