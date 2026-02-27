"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestOtp = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const otpSchema_1 = require("../../schemas/otpSchema");
const requestHandler_1 = require("../../utilities/requestHandler");
const userModel_1 = require("../../models/userModel");
const response_1 = require("../../utilities/response");
const logs_1 = __importDefault(require("../../../logs"));
const redis_1 = __importDefault(require("../../configs/redis"));
const requestOtp = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(otpSchema_1.requestOtpSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const existingUser = await userModel_1.UserModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userWhatsappNumber: { [sequelize_1.Op.eq]: validatedData.whatsappNumber }
            }
        });
        if (validatedData.otpType === 'reset' && existingUser === null) {
            const message = `whatsapp number ${validatedData.whatsappNumber} is not registered.`;
            logs_1.default.info(`Registration attempt failed: ${message}`);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error({ message }));
        }
        if (validatedData.otpType === 'register' && existingUser !== null) {
            const message = `whatsapp number ${validatedData.whatsappNumber} is already registered.`;
            logs_1.default.info(`Registration attempt failed: ${message}`);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error({ message }));
        }
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const minutes = 5;
        await redis_1.default.setex(`otp:${otpCode}`, minutes * 60, otpCode);
        const message = encodeURIComponent(`*${otpCode}* adalah kode verifikasi Anda.\n\n` +
            `Pengingat keamanan: Untuk memastikan keamanan akun Anda, mohon jangan bagikan informasi apa pun tentang akun Anda kepada siapa pun. kode ini akan expire dalam ${minutes} menit`);
        try {
            console.log(message);
            // await axios.get(
            //   `${appConfigs.wablas.url}/send-message?phone=${validatedData.whatsappNumber}&message=${message}&token=${appConfigs.wablas.token}`
            // )
        }
        catch (e) {
            logs_1.default.error(e);
            throw e;
        }
        const response = response_1.ResponseData.success({});
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.requestOtp = requestOtp;
