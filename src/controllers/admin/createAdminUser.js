"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const adminUserSchema_1 = require("../../schemas/adminUserSchema");
const userModel_1 = require("../../models/userModel");
const scurePassword_1 = require("../../utilities/scurePassword");
const logs_1 = __importDefault(require("../../../logs"));
const membershipModel_1 = require("../../models/membershipModel");
const config_1 = require("../../database/config");
const createAdminUser = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(adminUserSchema_1.createAdminUserSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    const transaction = await config_1.sequelize.transaction();
    try {
        const existingUser = await userModel_1.UserModel.findOne({
            where: {
                deleted: 0,
                userWhatsappNumber: validatedData.userWhatsappNumber
            }
        });
        if (existingUser != null) {
            const message = `Nomor Whatsapp ${validatedData.userWhatsappNumber} sudah terdaftar`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error({ message }));
        }
        const createData = {
            userName: validatedData.userName,
            userWhatsappNumber: validatedData.userWhatsappNumber,
            userPassword: (0, scurePassword_1.hashPassword)(validatedData.userPassword),
            userRole: 'admin',
            userDeviceId: '_',
            userOnboardingStatus: 'completed'
        };
        const createdUser = await userModel_1.UserModel.create(createData, { transaction });
        const membershipPayload = {
            membershipUserId: createdUser.userId,
            membershipCompanyId: req?.membershipPayload?.membershipCompanyId,
            membershipRole: 'company',
            membershipStatus: 'active'
        };
        await membershipModel_1.MembershipModel.create(membershipPayload, { transaction });
        await transaction.commit();
        logs_1.default.info('Admin user created successfully');
        return res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json(response_1.ResponseData.success({ message: 'Admin user created successfully' }));
    }
    catch (serverError) {
        await transaction.rollback();
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.createAdminUser = createAdminUser;
