"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMyProfile = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const myProfileSchema_1 = require("../../schemas/myProfileSchema");
const requestHandler_1 = require("../../utilities/requestHandler");
const userModel_1 = require("../../models/userModel");
const logs_1 = __importDefault(require("../../../logs"));
const configs_1 = require("../../configs");
const updateMyProfile = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(myProfileSchema_1.updateMyProfileSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        if ('userWhatsappNumber' in validatedData) {
            const userNameChek = await userModel_1.UserModel.findOne({
                where: {
                    deleted: 0,
                    userWhatsappNumber: validatedData.userWhatsappNumber
                }
            });
            if (userNameChek !== null) {
                const message = 'No Whatsapp sudah digunakan!';
                logs_1.default.info(`Login attempt failed: ${message}`);
                return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response_1.ResponseData.error({ message }));
            }
        }
        if ('userPassword' in validatedData) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            validatedData.userPassword = require('crypto')
                .createHash('sha1')
                .update(validatedData.userPassword + configs_1.appConfigs.secret.passwordEncryption)
                .digest('hex');
        }
        const newData = {
            ...(validatedData?.userName?.length > 0 && {
                userName: validatedData?.userName
            }),
            ...(validatedData?.userPassword?.length > 0 && {
                userPassword: validatedData?.userPassword
            }),
            ...(validatedData?.userWhatsappNumber?.length > 0 && {
                userWhatsappNumber: validatedData?.userWhatsappNumber
            })
        };
        await userModel_1.UserModel.update(newData, {
            where: {
                deleted: 0,
                userId: req?.jwtPayload?.userId
            }
        });
        const response = response_1.ResponseData.success({ message: 'Profile updated successfully' });
        logs_1.default.info('Profile updated successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.updateMyProfile = updateMyProfile;
