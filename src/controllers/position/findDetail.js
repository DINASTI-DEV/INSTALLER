"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDetailPosition = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const logs_1 = __importDefault(require("../../../logs"));
const positionModel_1 = require("../../models/positionModel");
const positionSchema_1 = require("../../schemas/positionSchema");
const findDetailPosition = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(positionSchema_1.findDetailPositionSchema, req.params);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const result = await positionModel_1.PositionModel.findOne({
            where: {
                deleted: 0,
                positionCompanyId: req?.membershipPayload?.membershipCompanyId
            }
        });
        if (result == null) {
            const message = `Company not found`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        const response = response_1.ResponseData.success({ data: result });
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findDetailPosition = findDetailPosition;
