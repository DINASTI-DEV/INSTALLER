"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllAttendance = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const pagination_1 = require("../../utilities/pagination");
const sequelize_1 = require("sequelize");
const attendanceModel_1 = require("../../models/attendanceModel");
const attendanceSchema_1 = require("../../schemas/attendanceSchema");
const scheduleModel_1 = require("../../models/scheduleModel");
const requestHandler_1 = require("../../utilities/requestHandler");
const officeModel_1 = require("../../models/officeModel");
const userModel_1 = require("../../models/userModel");
const logs_1 = __importDefault(require("../../../logs"));
const findAllAttendance = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(attendanceSchema_1.findAllAttendanceSchema, req.query);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const { page: queryPage, size: querySize, pagination, search, startDate, endDate, attendanceCategory, attendanceScheduleId, officeId } = validatedData;
        const page = new pagination_1.Pagination(Number(queryPage) || 0, Number(querySize) || 10);
        const dateFilter = startDate && endDate
            ? {
                createdAt: {
                    [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)]
                }
            }
            : {};
        const result = await attendanceModel_1.AttendanceModel.findAndCountAll({
            where: {
                deleted: 0,
                attendanceCompanyId: req?.membershipPayload?.membershipCompanyId,
                ...(Boolean(req?.jwtPayload?.userRole === 'user') && {
                    attendanceUserId: req?.jwtPayload?.userId
                }),
                ...(Boolean(attendanceCategory) && {
                    attendanceCategory: attendanceCategory
                }),
                ...(Boolean(attendanceScheduleId) && {
                    attendanceScheduleId: attendanceScheduleId
                }),
                ...(Boolean(officeId) && {
                    attendanceOfficeId: officeId
                }),
                ...dateFilter
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
                    model: scheduleModel_1.ScheduleModel,
                    as: 'schedule'
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
                    ],
                    where: search
                        ? {
                            [sequelize_1.Op.or]: [
                                sequelize_1.Sequelize.where(sequelize_1.Sequelize.col('user.user_name'), 'LIKE', `%${search}%`)
                            ]
                        }
                        : undefined
                }
            ],
            order: [['attendanceId', 'desc']],
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            }),
            distinct: true
        });
        const response = response_1.ResponseData.success({ data: result });
        response.data = page.formatData(result);
        logs_1.default.info('Attendance records retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findAllAttendance = findAllAttendance;
