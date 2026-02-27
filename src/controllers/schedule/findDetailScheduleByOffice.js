"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllDetailScheduleByOffice = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const officeSchema_1 = require("../../schemas/officeSchema");
const officeModel_1 = require("../../models/officeModel");
const logs_1 = __importDefault(require("../../../logs"));
const scheduleModel_1 = require("../../models/scheduleModel");
const membershipModel_1 = require("../../models/membershipModel");
const userModel_1 = require("../../models/userModel");
const findAllDetailScheduleByOffice = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(officeSchema_1.findDetailOfficeSchema, req.params);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const result = await officeModel_1.OfficeModel.findOne({
            where: {
                deleted: 0,
                officeCompanyId: req?.membershipPayload?.membershipCompanyId,
                officeId: validatedData.officeId
            },
            attributes: ['officeId', 'officeName', 'officeAddress'],
            include: [
                {
                    model: scheduleModel_1.ScheduleModel,
                    as: 'schedules',
                    attributes: [
                        'scheduleId',
                        'scheduleName',
                        'scheduleStart',
                        'scheduleEnd',
                        'scheduleBreakStart',
                        'scheduleBreakEnd',
                        'scheduleCategory',
                        'scheduleOrder'
                    ]
                },
                {
                    model: membershipModel_1.MembershipModel,
                    as: 'memberships',
                    attributes: ['membershipId', 'membershipUserId', 'membershipRole'],
                    include: [
                        {
                            model: userModel_1.UserModel,
                            as: 'employee',
                            attributes: ['userId', 'userName', 'userWhatsappNumber']
                        }
                    ]
                }
            ]
        });
        const response = response_1.ResponseData.success({ data: result });
        logs_1.default.info('Office retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findAllDetailScheduleByOffice = findAllDetailScheduleByOffice;
