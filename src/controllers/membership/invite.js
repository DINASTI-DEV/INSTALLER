"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inviteMembership = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const logs_1 = __importDefault(require("../../../logs"));
const membershipModel_1 = require("../../models/membershipModel");
const membershipSchema_1 = require("../../schemas/membershipSchema");
const companyModel_1 = require("../../models/companyModel");
const sequelize_1 = require("sequelize");
const inviteMembership = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(membershipSchema_1.membershipInviteSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const companyCheck = await companyModel_1.CompanyModel.findOne({
            where: {
                deleted: 0,
                companyInviteCode: validatedData.inviteCode
            }
        });
        if (companyCheck === null) {
            const message = 'Kode invitation tidak ditemukan';
            return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json(response_1.ResponseData.error({ message }));
        }
        const activeMembershipCheck = await membershipModel_1.MembershipModel.findOne({
            where: {
                deleted: 0,
                membershipStatus: { [sequelize_1.Op.not]: 'rejected' },
                membershipCompanyId: companyCheck.companyId,
                membershipUserId: req?.jwtPayload?.userId
            }
        });
        if (activeMembershipCheck) {
            const message = 'Anda sudah terdaftar';
            return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json(response_1.ResponseData.error({ message }));
        }
        const memebershipPayload = {
            membershipUserId: req?.jwtPayload?.userId,
            membershipCompanyId: companyCheck.companyId,
            membershipRole: 'employee',
            membershipStatus: 'pending'
        };
        await membershipModel_1.MembershipModel.create(memebershipPayload);
        const response = response_1.ResponseData.success({});
        logs_1.default.info('Invite membership created successfully');
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.inviteMembership = inviteMembership;
