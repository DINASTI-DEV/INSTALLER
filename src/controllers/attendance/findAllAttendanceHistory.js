"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllAttendanceHistories = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const pagination_1 = require("../../utilities/pagination");
const sequelize_1 = require("sequelize");
const attendanceModel_1 = require("../../models/attendanceModel");
const scheduleModel_1 = require("../../models/scheduleModel");
const requestHandler_1 = require("../../utilities/requestHandler");
const officeModel_1 = require("../../models/officeModel");
const userModel_1 = require("../../models/userModel");
const logs_1 = __importDefault(require("../../logs"));
const attendanceSchema_1 = require("../../schemas/attendanceSchema");
const findAllAttendanceHistories = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(attendanceSchema_1.findAllAttendanceHistoriesSchema, req.query);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const { page: queryPage, size: querySize, pagination, startDate, endDate, attendanceHistoryUserId, search } = validatedData;
        const page = new pagination_1.Pagination(Number(queryPage) || 0, Number(querySize) || 10);
        const whereConditions = {
            deleted: 0,
            ...(Boolean(req?.jwtPayload?.userRole === 'user') && {
                attendanceUserId: req?.jwtPayload?.userId
            })
        };
        if (startDate && endDate) {
            whereConditions.attendanceTime = {
                [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }
        if (search) {
            whereConditions[sequelize_1.Op.or] = [{ attendanceCategory: { [sequelize_1.Op.like]: `%${search}%` } }];
        }
        const result = await attendanceModel_1.AttendanceModel.findAndCountAll({
            where: whereConditions,
            include: [
                {
                    model: officeModel_1.OfficeModel,
                    as: 'office',
                    attributes: [
                        'officeId',
                        'officeName',
                        'officeAddress',
                        'officeLongitude',
                        'officeLatitude'
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
                    ]
                }
            ],
            order: [['attendanceId', 'desc']],
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.success({ data: result });
        response.data = page.formatData(result);
        logs_1.default.info('Attendance history retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findAllAttendanceHistories = findAllAttendanceHistories;
