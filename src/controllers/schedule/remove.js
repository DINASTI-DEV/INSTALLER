"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSchedule = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const scheduleModel_1 = require("../../models/scheduleModel");
const requestHandler_1 = require("../../utilities/requestHandler");
const logs_1 = __importDefault(require("../../../logs"));
const scheduleSchema_1 = require("../../schemas/scheduleSchema");
const removeSchedule = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(scheduleSchema_1.removeScheduleSchema, req.params);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const result = await scheduleModel_1.ScheduleModel.findOne({
            where: {
                deleted: 0,
                scheduleCompanyId: req?.membershipPayload?.membershipCompanyId,
                scheduleId: validatedData.scheduleId
            }
        });
        if (result == null) {
            const message = `Schedule not found with ID: ${validatedData.scheduleId}`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        result.deleted = true;
        void result.save();
        const response = response_1.ResponseData.success({ message: 'Schedule deleted successfully' });
        logs_1.default.info('Schedule deleted successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.removeSchedule = removeSchedule;
