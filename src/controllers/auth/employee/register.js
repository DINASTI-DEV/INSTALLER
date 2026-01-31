"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRegister = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const response_1 = require("../../../utilities/response");
const requestHandler_1 = require("../../../utilities/requestHandler");
const userModel_1 = require("../../../models/userModel");
const logs_1 = __importDefault(require("../../../logs"));
const scurePassword_1 = require("../../../utilities/scurePassword");
const membershipModel_1 = require("../../../models/membershipModel");
const config_1 = require("../../../database/config");
const employeeAuthSchema_1 = require("../../../schemas/auth/employeeAuthSchema");
const companyModel_1 = require("../../../models/companyModel");
const employeeRegister = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(employeeAuthSchema_1.employeeRegistrationSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    const transaction = await config_1.sequelize.transaction();
    try {
        const companyInvitationCodeCheck = await companyModel_1.CompanyModel.findOne({
            where: {
                deleted: 0,
                companyInviteCode: validatedData.userInvitationCode
            },
            transaction
        });
        if (companyInvitationCodeCheck == null) {
            await transaction.rollback();
            const message = `Kode invitation ${validatedData.userInvitationCode} tidak ditemukan`;
            logs_1.default.info(`invitation code attempt failed: ${message}`);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error({ message }));
        }
        const existingUser = await userModel_1.UserModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userWhatsappNumber: { [sequelize_1.Op.eq]: validatedData.userWhatsappNumber }
            },
            transaction
        });
        if (existingUser != null) {
            await transaction.rollback();
            const message = `Nomor Whatsapp ${existingUser.userWhatsappNumber} sudah terdaftar, gunakan yang lain`;
            logs_1.default.info(`Registration attempt failed: ${message}`);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error({ message }));
        }
        validatedData.userPassword = (0, scurePassword_1.hashPassword)(validatedData.userPassword);
        validatedData.userRole = 'user';
        const createdUser = await userModel_1.UserModel.create(validatedData, { transaction });
        const membershipPayload = {
            membershipUserId: createdUser.userId,
            membershipCompanyId: companyInvitationCodeCheck.companyId,
            membershipRole: 'employee',
            membershipStatus: 'active'
        };
        await membershipModel_1.MembershipModel.create(membershipPayload, { transaction });
        await transaction.commit();
        return res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json(response_1.ResponseData.success({ message: 'Registration successful' }));
    }
    catch (serverError) {
        await transaction.rollback();
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.employeeRegister = employeeRegister;
