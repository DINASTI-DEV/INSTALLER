"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdminUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const adminUserSchema_1 = require("../../schemas/adminUserSchema");
const userModel_1 = require("../../models/userModel");
const scurePassword_1 = require("../../utilities/scurePassword");
const logs_1 = __importDefault(require("../../../logs"));
const updateAdminUser = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(adminUserSchema_1.updateAdminUserSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const user = await userModel_1.UserModel.findOne({
            where: {
                deleted: 0,
                userId: validatedData.userId,
                userRole: { [sequelize_1.Op.in]: ['admin', 'superAdmin'] }
            }
        });
        if (user == null) {
            const message = `Admin user not found with ID: ${validatedData.userId}`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        if (validatedData.userWhatsappNumber != null) {
            const existingWhatsapp = await userModel_1.UserModel.findOne({
                where: {
                    deleted: 0,
                    userWhatsappNumber: validatedData.userWhatsappNumber,
                    userId: { [sequelize_1.Op.ne]: validatedData.userId }
                }
            });
            if (existingWhatsapp != null) {
                const message = `Nomor Whatsapp ${validatedData.userWhatsappNumber} sudah dipakai user lain`;
                logs_1.default.warn(message);
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error({ message }));
            }
        }
        const updatePayload = {};
        if (validatedData.userName != null)
            updatePayload.userName = validatedData.userName;
        if (validatedData.userWhatsappNumber != null)
            updatePayload.userWhatsappNumber = validatedData.userWhatsappNumber;
        if (validatedData.userRole != null)
            updatePayload.userRole = validatedData.userRole;
        if (validatedData.userPositionId !== undefined)
            updatePayload.userPositionId = validatedData.userPositionId;
        if (validatedData.userPassword != null &&
            String(validatedData.userPassword).trim().length > 0) {
            updatePayload.userPassword = (0, scurePassword_1.hashPassword)(validatedData.userPassword);
        }
        await user.update(updatePayload);
        logs_1.default.info(`Admin user ${validatedData.userId} updated successfully`);
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json(response_1.ResponseData.success({ message: 'Admin user updated successfully' }));
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.updateAdminUser = updateAdminUser;
