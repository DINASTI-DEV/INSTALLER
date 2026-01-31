"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchedule = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const scheduleSchema_1 = require("../../schemas/scheduleSchema");
const scheduleModel_1 = require("../../models/scheduleModel");
const requestHandler_1 = require("../../utilities/requestHandler");
const logs_1 = __importDefault(require("../../logs"));
const updateSchedule = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(scheduleSchema_1.updateScheduleSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const [updated] = await scheduleModel_1.ScheduleModel.update(validatedData, {
            where: {
                deleted: 0,
                scheduleCompanyId: req?.membershipPayload?.membershipCompanyId,
                scheduleId: validatedData.scheduleId
            }
        });
        if (updated === 0) {
            const message = `Schedule not found with ID: ${validatedData.scheduleId}`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        const response = response_1.ResponseData.success({ message: 'Schedule updated successfully' });
        logs_1.default.info('Schedule updated successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.updateSchedule = updateSchedule;
