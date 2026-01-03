"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMyProfile = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const userModel_1 = require("../../models/userModel");
const requestHandler_1 = require("../../utilities/requestHandler");
const myProfileSchema_1 = require("../../schemas/myProfileSchema");
const logs_1 = __importDefault(require("../../logs"));
const findMyProfile = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(myProfileSchema_1.findMyProfileSchema, req.query);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const result = await userModel_1.UserModel.findOne({
            where: {
                deleted: 0,
                userId: req.jwtPayload?.userId
            },
            attributes: [
                'userId',
                'userName',
                'userRole',
                'userWhatsappNumber',
                'userOnboardingStatus',
                'createdAt',
                'updatedAt'
            ]
        });
        if (result == null) {
            const message = 'user not found!';
            const response = response_1.ResponseData.error({ message });
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        const response = response_1.ResponseData.success({ data: result });
        logs_1.default.info('User found successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findMyProfile = findMyProfile;
