"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePosition = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const logs_1 = __importDefault(require("../../../logs"));
const positionSchema_1 = require("../../schemas/positionSchema");
const positionModel_1 = require("../../models/positionModel");
const updatePosition = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(positionSchema_1.updatePositionchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const company = await positionModel_1.PositionModel.findOne({
            where: {
                deleted: 0,
                positionCompanyId: req?.membershipPayload?.membershipCompanyId
            }
        });
        if (company === null) {
            const message = `company not found`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        await positionModel_1.PositionModel.update(validatedData, {
            where: {
                deleted: 0,
                positionCompanyId: req?.membershipPayload?.membershipCompanyId
            }
        });
        const response = response_1.ResponseData.success({ message: 'company updated successfully' });
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.updatePosition = updatePosition;
