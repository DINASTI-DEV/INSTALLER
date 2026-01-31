"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDetailSchedule = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const scheduleModel_1 = require("../../models/scheduleModel");
const scheduleSchema_1 = require("../../schemas/scheduleSchema");
const requestHandler_1 = require("../../utilities/requestHandler");
const officeModel_1 = require("../../models/officeModel");
const logs_1 = __importDefault(require("../../logs"));
const findDetailSchedule = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(scheduleSchema_1.findDetailScheduleSchema, req.params);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const result = await scheduleModel_1.ScheduleModel.findOne({
            where: {
                deleted: 0,
                scheduleCompanyId: req?.membershipPayload?.membershipCompanyId,
                scheduleId: validatedData.scheduleId
            },
            include: {
                model: officeModel_1.OfficeModel,
                as: 'office'
            }
        });
        if (result == null) {
            const message = `Schedule not found with ID: ${validatedData.scheduleId}`;
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
exports.findDetailSchedule = findDetailSchedule;
