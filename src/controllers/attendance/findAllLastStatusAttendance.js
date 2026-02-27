"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllLastStatusAttendance = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const attendanceModel_1 = require("../../models/attendanceModel");
const attendanceSchema_1 = require("../../schemas/attendanceSchema");
const scheduleModel_1 = require("../../models/scheduleModel");
const requestHandler_1 = require("../../utilities/requestHandler");
const officeModel_1 = require("../../models/officeModel");
const logs_1 = __importDefault(require("../../../logs"));
const findAllLastStatusAttendance = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(attendanceSchema_1.findAllLastStatusAttendanceSchema, req.query);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const result = await attendanceModel_1.AttendanceModel.findAll({
            where: {
                deleted: 0,
                attendanceCompanyId: req?.membershipPayload?.membershipCompanyId
            },
            attributes: ['attendanceId', 'attendanceCategory'],
            include: [
                {
                    model: officeModel_1.OfficeModel,
                    as: 'office'
                },
                {
                    model: scheduleModel_1.ScheduleModel,
                    as: 'schedule',
                    attributes: [
                        'scheduleId',
                        'scheduleName',
                        'scheduleStartDate',
                        'scheduleEndDate',
                        'scheduleStatus'
                    ]
                }
            ],
            order: [['attendanceId', 'desc']],
            limit: 1
        });
        // if (result == null) {
        //   const message = `Attendance not found with ID: ${value.scheduleId}`
        //   logger.warn(message)
        //   return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
        // }
        const response = response_1.ResponseData.success({ data: result });
        logs_1.default.info('Attendance found successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findAllLastStatusAttendance = findAllLastStatusAttendance;
