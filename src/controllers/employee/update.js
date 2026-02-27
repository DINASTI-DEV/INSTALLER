"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployee = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const response_1 = require("../../utilities/response");
const employeeSchema_1 = require("../../schemas/employeeSchema");
const requestHandler_1 = require("../../utilities/requestHandler");
const userModel_1 = require("../../models/userModel");
const logs_1 = __importDefault(require("../../../logs"));
const updateEmployee = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(employeeSchema_1.updateEmployeeSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    const { userId, userWhatsappNumber, userDeviceId, userName, userFingerprintDeviceId, userFingerprintDeviceName } = validatedData;
    try {
        const user = await userModel_1.UserModel.findOne({
            where: {
                deleted: 0,
                userId: userId
            }
        });
        if (user == null) {
            const message = 'Employee not found!';
            logs_1.default.info(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        const hasUserNameOrWhatsapp = (userName?.length ?? 0) > 0 || (userWhatsappNumber?.length ?? 0) > 0;
        if (hasUserNameOrWhatsapp) {
            const orConditions = [];
            if ((userName?.length ?? 0) > 0)
                orConditions.push({ userName: userName });
            if ((userWhatsappNumber?.length ?? 0) > 0)
                orConditions.push({ userWhatsappNumber: userWhatsappNumber });
            const existingUser = await userModel_1.UserModel.findOne({
                where: {
                    deleted: 0,
                    userId: { [sequelize_1.Op.ne]: userId },
                    [sequelize_1.Op.or]: orConditions
                }
            });
            if (existingUser != null) {
                const message = 'Username or WhatsApp number already registered!';
                logs_1.default.info(message);
                return res.status(http_status_codes_1.StatusCodes.CONFLICT).json(response_1.ResponseData.error({ message }));
            }
        }
        const updatedData = {
            ...(userWhatsappNumber?.length > 0 && { userWhatsappNumber }),
            ...(userName?.length > 0 && { userName }),
            ...(userDeviceId?.length > 0 && { userDeviceId }),
            ...(userFingerprintDeviceId?.length &&
                userFingerprintDeviceId?.length > 0 && {
                userFingerprintDeviceId
            }),
            ...(userFingerprintDeviceName?.length &&
                userFingerprintDeviceName?.length > 0 && {
                userFingerprintDeviceName
            })
        };
        await userModel_1.UserModel.update(updatedData, {
            where: {
                deleted: 0,
                userId: userId
            }
        });
        logs_1.default.info(`Employee ${userId} updated successfully`);
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json(response_1.ResponseData.success({ message: 'Employee updated successfully' }));
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.updateEmployee = updateEmployee;
