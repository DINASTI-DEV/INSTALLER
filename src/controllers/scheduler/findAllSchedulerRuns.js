"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllSchedulerRuns = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const pagination_1 = require("../../utilities/pagination");
const requestHandler_1 = require("../../utilities/requestHandler");
const schedulerSchema_1 = require("../../schemas/schedulerSchema");
const schedulerRunLogModel_1 = require("../../models/schedulerRunLogModel");
const logs_1 = __importDefault(require("../../../logs"));
const findAllSchedulerRuns = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(schedulerSchema_1.findAllSchedulerRunsSchema, req.query);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const { page: queryPage, size: querySize, pagination, jobName, status } = validatedData;
        const page = new pagination_1.Pagination(Number(queryPage) || 0, Number(querySize) || 10);
        const where = { deleted: 0 };
        if (jobName != null && String(jobName).trim().length > 0) {
            ;
            where.jobName = String(jobName).trim();
        }
        if (status != null && String(status).trim().length > 0) {
            ;
            where.status = String(status).trim();
        }
        const result = await schedulerRunLogModel_1.SchedulerRunLogModel.findAndCountAll({
            where,
            order: [
                ['runDate', 'DESC'],
                ['id', 'DESC']
            ],
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.success({ data: result });
        response.data = page.formatData(result);
        logs_1.default.info('Scheduler runs retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findAllSchedulerRuns = findAllSchedulerRuns;
