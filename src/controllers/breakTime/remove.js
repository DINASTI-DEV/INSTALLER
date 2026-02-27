"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBreakTime = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const breakTimeModel_1 = require("../../models/breakTimeModel");
const requestHandler_1 = require("../../utilities/requestHandler");
const logs_1 = __importDefault(require("../../../logs"));
const breakTimeSchema_1 = require("../../schemas/breakTimeSchema");
const removeBreakTime = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(breakTimeSchema_1.removeBreakTimeSchema, { ...req.params, breakTimeId: Number(req.params.breakTimeId) });
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const result = await breakTimeModel_1.BreakTimeModel.findOne({
            where: {
                deleted: 0,
                breakTimeCompanyId: req?.membershipPayload?.membershipCompanyId,
                breakTimeId: validatedData.breakTimeId
            }
        });
        if (result == null) {
            const message = `Break time not found with ID: ${validatedData.breakTimeId}`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        result.deleted = true;
        void result.save();
        const response = response_1.ResponseData.success({
            message: 'Break time deleted successfully'
        });
        logs_1.default.info('Break time deleted successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.removeBreakTime = removeBreakTime;
