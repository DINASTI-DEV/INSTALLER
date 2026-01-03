"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyRegister = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const response_1 = require("../../../utilities/response");
const requestHandler_1 = require("../../../utilities/requestHandler");
const userModel_1 = require("../../../models/userModel");
const logs_1 = __importDefault(require("../../../logs"));
const scurePassword_1 = require("../../../utilities/scurePassword");
const companyAuthSchema_1 = require("../../../schemas/auth/companyAuthSchema");
const companyModel_1 = require("../../../models/companyModel");
const createInviteCode_1 = require("./createInviteCode");
const membershipModel_1 = require("../../../models/membershipModel");
const config_1 = require("../../../database/config");
const moment_1 = __importDefault(require("moment"));
const companyRegister = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(companyAuthSchema_1.companyrRegistrationSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    const transaction = await config_1.sequelize.transaction();
    try {
        const existingUser = await userModel_1.UserModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userWhatsappNumber: { [sequelize_1.Op.eq]: validatedData.user.userWhatsappNumber }
            },
            transaction
        });
        if (existingUser != null) {
            await transaction.rollback();
            const message = `Nomor Whatsapp ${existingUser.userWhatsappNumber} sudah terdaftar, gunakan yang lain`;
            logs_1.default.info(`Registration attempt failed: ${message}`);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error({ message }));
        }
        validatedData.user.userPassword = (0, scurePassword_1.hashPassword)(validatedData.user.userPassword);
        validatedData.user.userRole = 'admin';
        const createdUser = await userModel_1.UserModel.create(validatedData.user, { transaction });
        validatedData.company.companyInviteCode = await (0, createInviteCode_1.generateUniqueInviteCode)();
        const createdCompany = await companyModel_1.CompanyModel.create(validatedData.company, {
            transaction
        });
        const membershipPayload = {
            membershipUserId: createdUser.userId,
            membershipCompanyId: createdCompany.companyId,
            membershipRole: 'company',
            membershipStatus: 'active'
        };
        await membershipModel_1.MembershipModel.create(membershipPayload, { transaction });
        const dateNow = (0, moment_1.default)();
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
exports.companyRegister = companyRegister;
