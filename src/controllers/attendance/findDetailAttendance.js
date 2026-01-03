"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDetailAttendance = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const attendanceModel_1 = require("../../models/attendanceModel");
const attendanceSchema_1 = require("../../schemas/attendanceSchema");
const requestHandler_1 = require("../../utilities/requestHandler");
const officeModel_1 = require("../../models/officeModel");
const userModel_1 = require("../../models/userModel");
const logs_1 = __importDefault(require("../../logs"));
const findDetailAttendance = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(attendanceSchema_1.findDetailAttendanceSchema, req.params);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const result = await attendanceModel_1.AttendanceModel.findOne({
            where: {
                deleted: 0,
                attendanceCompanyId: req?.membershipPayload?.membershipCompanyId,
                attendanceId: validatedData.attendanceId
            },
            include: [
                {
                    model: officeModel_1.OfficeModel,
                    as: 'office',
                    attributes: [
                        'officeId',
                        'officeName',
                        'officeAddress',
                        'officeLongitude',
                        'officeLatitude',
                        'officeMaximumDistanceAttendance',
                        'officeWifiMacAddress'
                    ]
                },
                {
                    model: userModel_1.UserModel,
                    as: 'user',
                    attributes: [
                        'userId',
                        'userName',
                        'userRole',
                        'userDeviceId',
                        'userWhatsappNumber'
                    ]
                }
            ]
        });
        if (result == null) {
            const message = `Attendance not found with ID: ${validatedData.attendanceId}`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        const response = response_1.ResponseData.success({ data: result });
        logs_1.default.info('Schedule found successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findDetailAttendance = findDetailAttendance;
