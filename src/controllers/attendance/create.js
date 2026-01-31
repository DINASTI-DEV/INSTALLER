"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAttendance = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const scheduleModel_1 = require("../../models/scheduleModel");
const attendanceSchema_1 = require("../../schemas/attendanceSchema");
const moment_1 = __importDefault(require("moment"));
const requestHandler_1 = require("../../utilities/requestHandler");
const logs_1 = __importDefault(require("../../logs"));
const attendanceModel_1 = require("../../models/attendanceModel");
const createAttendance = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(attendanceSchema_1.createAttendanceSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    console.log(validatedData);
    try {
        const scheduleRecord = await scheduleModel_1.ScheduleModel.findOne({
            where: {
                deleted: 0,
                scheduleId: validatedData.attendanceScheduleId,
                scheduleCompanyId: req?.membershipPayload?.membershipCompanyId,
                scheduleOfficeId: validatedData?.attendanceOfficeId
            }
        });
        if (scheduleRecord === null) {
            const message = 'Schedule not found';
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        const attendanceRecord = await attendanceModel_1.AttendanceModel.findOne({
            where: {
                deleted: 0,
                attendanceCompanyId: validatedData.attendanceCompanyId,
                attendanceCategory: validatedData.attendanceCategory,
                attendanceUserId: req?.jwtPayload?.userId
            }
        });
        // pritend duplicate attendance category
        if (attendanceRecord === null) {
            validatedData.attendanceTime = (0, moment_1.default)().toISOString();
            validatedData.attendanceUserId = req?.jwtPayload?.userId;
            validatedData.attendanceCompanyId = req?.membershipPayload?.membershipCompanyId;
            await attendanceModel_1.AttendanceModel.create(validatedData);
        }
        const response = response_1.ResponseData.success({});
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.createAttendance = createAttendance;
