"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDetailDailyAttendanceReport = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const dailyAttendanceSummaryModel_1 = require("../../models/dailyAttendanceSummaryModel");
const dailyAttendanceReportSchema_1 = require("../../schemas/dailyAttendanceReportSchema");
const userModel_1 = require("../../models/userModel");
const scheduleModel_1 = require("../../models/scheduleModel");
const officeModel_1 = require("../../models/officeModel");
const positionModel_1 = require("../../models/positionModel");
const logs_1 = __importDefault(require("../../../logs"));
const findDetailDailyAttendanceReport = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(dailyAttendanceReportSchema_1.findDetailDailyAttendanceReportSchema, { ...req.params, summaryId: Number(req.params.summaryId) });
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const result = await dailyAttendanceSummaryModel_1.DailyAttendanceSummaryModel.findOne({
            where: {
                deleted: 0,
                summaryCompanyId: req.membershipPayload?.membershipCompanyId,
                summaryId: validatedData.summaryId
            },
            include: [
                {
                    model: userModel_1.UserModel,
                    as: 'employee',
                    attributes: [
                        'userId',
                        'userName',
                        'userRole',
                        'userDeviceId',
                        'userWhatsappNumber'
                    ],
                    include: [{ model: positionModel_1.PositionModel, as: 'position' }]
                },
                {
                    model: scheduleModel_1.ScheduleModel,
                    as: 'schedule',
                    include: [
                        {
                            model: officeModel_1.OfficeModel,
                            as: 'office',
                            attributes: ['officeId', 'officeName']
                        }
                    ]
                }
            ]
        });
        if (result == null) {
            const message = `Daily attendance report not found with ID: ${validatedData.summaryId}`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        const response = response_1.ResponseData.success({ data: result });
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findDetailDailyAttendanceReport = findDetailDailyAttendanceReport;
