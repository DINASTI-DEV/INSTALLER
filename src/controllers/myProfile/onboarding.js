"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOnboardingStatus = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const myProfileSchema_1 = require("../../schemas/myProfileSchema");
const requestHandler_1 = require("../../utilities/requestHandler");
const userModel_1 = require("../../models/userModel");
const logs_1 = __importDefault(require("../../logs"));
const updateOnboardingStatus = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(myProfileSchema_1.updateOnboardingSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const newData = {
            ...(validatedData?.userOnboardingStatus.length > 0 && {
                userOnboardingStatus: validatedData?.userOnboardingStatus
            })
        };
        await userModel_1.UserModel.update(newData, {
            where: {
                deleted: 0,
                userId: req?.jwtPayload?.userId
            }
        });
        const response = response_1.ResponseData.success({
            message: 'Onboarding status updated successfully'
        });
        logs_1.default.info('onboarding status updated successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.updateOnboardingStatus = updateOnboardingStatus;
