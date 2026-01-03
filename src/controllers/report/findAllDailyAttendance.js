"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllDailyAttendanceReport = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const pagination_1 = require("../../utilities/pagination");
const requestHandler_1 = require("../../utilities/requestHandler");
const dailyAttendanceSummaryModel_1 = require("../../models/dailyAttendanceSummaryModel");
const dailyAttendanceReportSchema_1 = require("../../schemas/dailyAttendanceReportSchema");
const userModel_1 = require("../../models/userModel");
const scheduleModel_1 = require("../../models/scheduleModel");
const positionModel_1 = require("../../models/positionModel");
const sequelize_1 = require("sequelize");
const findAllDailyAttendanceReport = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(dailyAttendanceReportSchema_1.findAllDailyAttendanceReportSchema, req.query);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const { page: queryPage, size: querySize, pagination, search, startDate, endDate } = validatedData;
        const page = new pagination_1.Pagination(Number(queryPage) || 0, Number(querySize) || 10);
        const dateFilter = startDate && endDate
            ? {
                createdAt: {
                    [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)]
                }
            }
            : {};
        const result = await dailyAttendanceSummaryModel_1.DailyAttendanceSummaryModel.findAndCountAll({
            where: {
                deleted: 0,
                summaryCompanyId: req.membershipPayload?.membershipCompanyId,
                ...dateFilter
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
                    include: [{ model: positionModel_1.PositionModel, as: 'position' }],
                    where: search
                        ? {
                            [sequelize_1.Op.or]: [
                                sequelize_1.Sequelize.where(sequelize_1.Sequelize.col('user.user_name'), 'LIKE', `%${search}%`)
                            ]
                        }
                        : undefined
                },
                {
                    model: scheduleModel_1.ScheduleModel,
                    as: 'schedule'
                }
            ],
            order: [['summaryId', 'desc']],
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.success({ data: result });
        response.data = page.formatData(result);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findAllDailyAttendanceReport = findAllDailyAttendanceReport;
