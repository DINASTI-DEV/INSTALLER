"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAdminUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const adminUserSchema_1 = require("../../schemas/adminUserSchema");
const userModel_1 = require("../../models/userModel");
const logs_1 = __importDefault(require("../../../logs"));
const removeAdminUser = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(adminUserSchema_1.removeAdminUserSchema, {
        userId: req.params.userId != null ? Number(req.params.userId) : undefined,
        jwtPayload: req.jwtPayload
    });
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const userId = Number(validatedData.userId);
        if (req.jwtPayload?.userId === userId) {
            const message = 'Tidak dapat menghapus akun sendiri';
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error({ message }));
        }
        const user = await userModel_1.UserModel.findOne({
            where: {
                deleted: 0,
                userId,
                userRole: { [sequelize_1.Op.in]: ['admin', 'superAdmin'] }
            }
        });
        if (user == null) {
            const message = `Admin user not found with ID: ${userId}`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        await user.destroy();
        logs_1.default.info(`Admin user ${userId} deleted successfully`);
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json(response_1.ResponseData.success({ message: 'Admin user deleted successfully' }));
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.removeAdminUser = removeAdminUser;
