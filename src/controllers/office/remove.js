"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOffice = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const officeModel_1 = require("../../models/officeModel");
const logs_1 = __importDefault(require("../../../logs"));
const officeSchema_1 = require("../../schemas/officeSchema");
const removeOffice = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(officeSchema_1.removeOfficeSchema, req.params);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const result = await officeModel_1.OfficeModel.findOne({
            where: {
                deleted: 0,
                officeCompanyId: req?.membershipPayload?.membershipCompanyId,
                officeId: validatedData.officeId
            }
        });
        if (result == null) {
            const message = `Office not found with ID: ${validatedData.officeId}`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        result.deleted = true;
        await result.save();
        const response = response_1.ResponseData.success({ message: 'Office deleted successfully' });
        logs_1.default.info('Office deleted successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.removeOffice = removeOffice;
