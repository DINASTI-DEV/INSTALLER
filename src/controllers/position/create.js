"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPosition = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const positionSchema_1 = require("../../schemas/positionSchema");
const positionModel_1 = require("../../models/positionModel");
const createPosition = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(positionSchema_1.createPositionSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        validatedData.positionCompanyId = req.membershipPayload?.membershipCompanyId || 0;
        await positionModel_1.PositionModel.create(validatedData);
        const response = response_1.ResponseData.success({});
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.createPosition = createPosition;
