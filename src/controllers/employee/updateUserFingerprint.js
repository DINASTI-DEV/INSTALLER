"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserFingerprint = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const response_1 = require("../../utilities/response");
const employeeSchema_1 = require("../../schemas/employeeSchema");
const requestHandler_1 = require("../../utilities/requestHandler");
const userModel_1 = require("../../models/userModel");
const logs_1 = __importDefault(require("../../../logs"));
const updateUserFingerprint = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(employeeSchema_1.updateUserFingerprintSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    const { userId, userFingerprintId, userFingerprintDeviceId, userFingerprintDeviceName } = validatedData;
    try {
        const user = await userModel_1.UserModel.findOne({
            where: {
                deleted: 0,
                userId
            }
        });
        if (user == null) {
            const message = 'User not found!';
            logs_1.default.info(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        const payload = {
            ...(userFingerprintId?.length &&
                userFingerprintId?.length > 0 && { userFingerprintId }),
            ...(userFingerprintDeviceId?.length &&
                userFingerprintDeviceId?.length > 0 && { userFingerprintDeviceId }),
            ...(userFingerprintDeviceName?.length &&
                userFingerprintDeviceName?.length > 0 && { userFingerprintDeviceName })
        };
        // user_fingerprint_id di DB unique: jika id ini sudah dipakai user lain, update akan gagal
        const newFingerprintId = payload.userFingerprintId != null ? String(payload.userFingerprintId).trim() : null;
        if (newFingerprintId != null && newFingerprintId.length > 0) {
            const existingWithFingerprint = await userModel_1.UserModel.findOne({
                where: {
                    deleted: 0,
                    userFingerprintId: newFingerprintId
                }
            });
            if (existingWithFingerprint != null &&
                Number(existingWithFingerprint.userId) !== Number(userId)) {
                const message = 'Fingerprint ID already assigned to another user. Use a different fingerprint ID or remove it from the other user first.';
                logs_1.default.warn(message);
                return res.status(http_status_codes_1.StatusCodes.CONFLICT).json(response_1.ResponseData.error({ message }));
            }
        }
        await userModel_1.UserModel.update(payload, {
            where: {
                deleted: 0,
                userId
            }
        });
        logs_1.default.info(`User fingerprint ${userId} updated successfully`);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_1.ResponseData.success({
            message: 'User fingerprint updated successfully'
        }));
    }
    catch (serverError) {
        if (serverError instanceof sequelize_1.UniqueConstraintError) {
            const message = 'Fingerprint ID already assigned to another user. Use a different fingerprint ID or remove it from the other user first.';
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.CONFLICT).json(response_1.ResponseData.error({ message }));
        }
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.updateUserFingerprint = updateUserFingerprint;
