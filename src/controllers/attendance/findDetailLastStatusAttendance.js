"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDetailLastStatusAttendance = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const attendanceModel_1 = require("../../models/attendanceModel");
const attendanceSchema_1 = require("../../schemas/attendanceSchema");
const requestHandler_1 = require("../../utilities/requestHandler");
const logs_1 = __importDefault(require("../../../logs"));
const findDetailLastStatusAttendance = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(attendanceSchema_1.findLastAttendanceSchema, { ...req.params, ...req.query });
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const result = await attendanceModel_1.AttendanceModel.findOne({
            where: {
                deleted: 0,
                attendanceUserId: validatedData.userId,
                attendanceCompanyId: req?.membershipPayload?.membershipCompanyId,
                attendanceScheduleId: validatedData.scheduleId
            },
            order: [['attendanceId', 'desc']]
        });
        const response = response_1.ResponseData.success({ data: result });
        logs_1.default.info('Attendance found successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findDetailLastStatusAttendance = findDetailLastStatusAttendance;
