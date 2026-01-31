"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllSchedule = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const pagination_1 = require("../../utilities/pagination");
const scheduleSchema_1 = require("../../schemas/scheduleSchema");
const scheduleModel_1 = require("../../models/scheduleModel");
const sequelize_1 = require("sequelize");
const requestHandler_1 = require("../../utilities/requestHandler");
const officeModel_1 = require("../../models/officeModel");
const logs_1 = __importDefault(require("../../logs"));
const findAllSchedule = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(scheduleSchema_1.findAllScheduleSchema, req.query);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const { page: queryPage, size: querySize, pagination, search, startDate, endDate } = validatedData;
        const page = new pagination_1.Pagination(Number(queryPage) || 0, Number(querySize) || 10);
        const result = await scheduleModel_1.ScheduleModel.findAndCountAll({
            where: {
                deleted: 0,
                scheduleCompanyId: req?.membershipPayload?.membershipCompanyId,
                ...(Boolean(validatedData?.officeId) && {
                    scheduleOfficeId: validatedData?.officeId
                }),
                ...(Boolean(startDate) &&
                    Boolean(endDate) && {
                    [sequelize_1.Op.or]: [
                        {
                            scheduleStartDate: {
                                [sequelize_1.Op.between]: [startDate + ' 00:00:00', endDate + ' 23:59:59']
                            }
                        },
                        {
                            scheduleEndDate: {
                                [sequelize_1.Op.between]: [startDate + ' 00:00:00', endDate + ' 23:59:59']
                            }
                        }
                    ]
                }),
                ...(Boolean(startDate) &&
                    !endDate && {
                    scheduleStartDate: {
                        [sequelize_1.Op.gte]: startDate + ' 00:00:00'
                    }
                }),
                ...(Boolean(endDate) &&
                    !startDate && {
                    scheduleStartDate: {
                        [sequelize_1.Op.lte]: endDate + ' 23:59:59'
                    }
                })
            },
            include: [
                {
                    model: officeModel_1.OfficeModel,
                    as: 'office'
                }
            ],
            order: [['scheduleOrder', 'ASC']],
            distinct: true,
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.success({ data: result });
        response.data = page.formatData(result);
        logs_1.default.info('Schedule retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findAllSchedule = findAllSchedule;
