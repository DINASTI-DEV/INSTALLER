"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findLastStatus = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const attendanceModel_1 = require("../../models/attendanceModel");
const requestHandler_1 = require("../../utilities/requestHandler");
const logs_1 = __importDefault(require("../../../logs"));
const membershipModel_1 = require("../../models/membershipModel");
const scheduleModel_1 = require("../../models/scheduleModel");
const officeModel_1 = require("../../models/officeModel");
const moment_1 = __importDefault(require("moment"));
const findLastStatus = async (req, res) => {
    try {
        const membership = await membershipModel_1.MembershipModel.findOne({
            where: {
                deleted: 0,
                membershipCompanyId: req?.membershipPayload?.membershipCompanyId,
                membershipUserId: req?.params?.userId
            }
        });
        if (membership === null) {
            const message = `Membership not found `;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        const schedule = await scheduleModel_1.ScheduleModel.findOne({
            where: {
                deleted: 0,
                scheduleOfficeId: membership?.membershipOfficeId,
                scheduleCompanyId: req?.membershipPayload?.membershipCompanyId,
                scheduleOrder: (0, moment_1.default)().day()
            }
        });
        if (schedule === null) {
            const response = response_1.ResponseData.error({ message: 'Schedule not found' });
            logs_1.default.info('Schedule  not found');
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        const office = await officeModel_1.OfficeModel.findOne({
            where: {
                deleted: 0,
                officeId: schedule?.scheduleOfficeId,
                officeCompanyId: req?.membershipPayload?.membershipCompanyId
            }
        });
        const attendance = await attendanceModel_1.AttendanceModel.findOne({
            where: {
                deleted: 0,
                attendanceScheduleId: schedule?.scheduleId,
                attendanceUserId: req?.params?.userId,
                attendanceCompanyId: req?.membershipPayload?.membershipCompanyId,
                attendanceOfficeId: membership?.membershipOfficeId
            },
            order: [['attendanceId', 'DESC']]
        });
        const payload = {
            ...schedule.dataValues,
            office,
            attendanceCategory: attendance?.attendanceCategory
                ? attendance?.attendanceCategory
                : 'menunggu'
        };
        const response = response_1.ResponseData.success({ data: payload });
        logs_1.default.info('Attendance found successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findLastStatus = findLastStatus;
