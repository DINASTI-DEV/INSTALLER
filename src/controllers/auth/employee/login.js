"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeLogin = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../../utilities/response");
const jwt_1 = require("../../../utilities/jwt");
const requestHandler_1 = require("../../../utilities/requestHandler");
const userModel_1 = require("../../../models/userModel");
const logs_1 = __importDefault(require("../../../../logs"));
const scurePassword_1 = require("../../../utilities/scurePassword");
const employeeAuthSchema_1 = require("../../../schemas/auth/employeeAuthSchema");
const membershipModel_1 = require("../../../models/membershipModel");
const employeeLogin = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(employeeAuthSchema_1.employeeLoginSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    const { userWhatsappNumber, userPassword } = validatedData;
    try {
        const user = await userModel_1.UserModel.findOne({
            where: {
                deleted: 0,
                userWhatsappNumber
            }
        });
        if (user == null) {
            const message = 'Account not found. Please register first!';
            logs_1.default.info(`Login attempt failed: ${message}`);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        // if (user?.userRole === 'user' && user.userDeviceId !== validatedData?.userDeviceId) {
        //   const message =
        //     'Gagal Login! Pastikan anda login dengan device yang sama saat anda melakukan registrasi'
        //   logger.info(`Login attempt failed: ${message}`)
        //   return res.status(StatusCodes.UNAUTHORIZED).json(ResponseData.error({ message }))
        // }
        const membership = await membershipModel_1.MembershipModel.findOne({
            where: {
                deleted: 0,
                membershipStatus: 'active',
                membershipUserId: user.userId
            }
        });
        if (membership == null) {
            const message = 'Membership not found!';
            logs_1.default.info(`Login attempt failed: ${message}`);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        const isPasswordValid = (0, scurePassword_1.hashPassword)(userPassword) === user.userPassword;
        if (!isPasswordValid) {
            const message = 'Invalid whatsapp numbuer and password combination!';
            logs_1.default.error(`Login attempt failed: ${message}`);
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response_1.ResponseData.error({ message }));
        }
        const token = (0, jwt_1.generateAccessToken)({ userId: user.userId, userRole: user.userRole });
        const payload = {
            accessToken: token,
            refreshToken: '',
            companyId: membership.membershipCompanyId
        };
        logs_1.default.info(`User ${user.userName} logged in successfully`);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_1.ResponseData.success({ data: payload }));
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.employeeLogin = employeeLogin;
