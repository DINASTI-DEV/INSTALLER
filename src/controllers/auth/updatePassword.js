"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const userModel_1 = require("../../models/userModel");
const logs_1 = __importDefault(require("../../../logs"));
const scurePassword_1 = require("../../utilities/scurePassword");
const employeeAuthSchema_1 = require("../../schemas/auth/employeeAuthSchema");
const updatePassword = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(employeeAuthSchema_1.userUpdatePasswordSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    const { userPassword, userWhatsappNumber } = validatedData;
    try {
        const user = await userModel_1.UserModel.findOne({
            where: {
                deleted: 0,
                userWhatsappNumber: userWhatsappNumber,
                userRole: 'user'
            }
        });
        if (user == null) {
            const message = 'User not found!';
            logs_1.default.info('Attempt to update non-existing user');
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        const updatedData = {
            ...(userPassword && { userPassword: (0, scurePassword_1.hashPassword)(userPassword) })
        };
        await userModel_1.UserModel.update(updatedData, {
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userId: { [sequelize_1.Op.eq]: user.userId }
            }
        });
        logs_1.default.info('Password updated successfully');
        const response = response_1.ResponseData.success({ message: 'Password updated successfully' });
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.updatePassword = updatePassword;
