"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchedule = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const scheduleModel_1 = require("../../models/scheduleModel");
const requestHandler_1 = require("../../utilities/requestHandler");
const scheduleSchema_1 = require("../../schemas/scheduleSchema");
const officeModel_1 = require("../../models/officeModel");
const logs_1 = __importDefault(require("../../logs"));
const createSchedule = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(scheduleSchema_1.createScheduleSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const result = await officeModel_1.OfficeModel.findOne({
            where: {
                deleted: 0,
                officeCompanyId: req?.membershipPayload?.membershipCompanyId,
                officeId: validatedData.scheduleOfficeId
            }
        });
        if (result == null) {
            const message = `Office not found with ID: ${validatedData.scheduleOfficeId}`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        // validatedData.scheduleUserId = req?.jwtPayload?.userId!
        validatedData.scheduleCompanyId = req?.membershipPayload?.membershipCompanyId;
        await scheduleModel_1.ScheduleModel.create(validatedData);
        const response = response_1.ResponseData.success({ message: 'schedule created successfully' });
        logs_1.default.info('schedule created successfully');
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.createSchedule = createSchedule;
