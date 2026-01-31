"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.administratorLogin = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../../utilities/response");
const jwt_1 = require("../../../utilities/jwt");
const requestHandler_1 = require("../../../utilities/requestHandler");
const userModel_1 = require("../../../models/userModel");
const logs_1 = __importDefault(require("../../../logs"));
const scurePassword_1 = require("../../../utilities/scurePassword");
const companyAuthSchema_1 = require("../../../schemas/auth/companyAuthSchema");
const administratorLogin = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(companyAuthSchema_1.companyLoginSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    const { userWhatsappNumber, userPassword } = validatedData;
    try {
        const user = await userModel_1.UserModel.findOne({
            where: {
                deleted: 0,
                userWhatsappNumber,
                userRole: 'superAdmin'
            }
        });
        if (user == null) {
            const message = 'Account not found. Please register first!';
            logs_1.default.info(`Login Administrator attempt failed: ${message}`);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        const isPasswordValid = (0, scurePassword_1.hashPassword)(userPassword) === user.userPassword;
        if (!isPasswordValid) {
            const message = 'Invalid whatsapp number and password combination!';
            logs_1.default.error(`Login attempt failed: ${message}`);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        const token = (0, jwt_1.generateAccessToken)({ userId: user.userId, userRole: user.userRole });
        logs_1.default.info(`Administrator ${user.userName} logged in successfully`);
        const payload = {
            accessToken: token,
            refreshToken: ''
        };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_1.ResponseData.success({ data: payload }));
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.administratorLogin = administratorLogin;
