"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMembership = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const logs_1 = __importDefault(require("../../logs"));
const membershipSchema_1 = require("../../schemas/membershipSchema");
const membershipModel_1 = require("../../models/membershipModel");
const removeMembership = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(membershipSchema_1.membershipRemoveSchema, req.params);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const result = await membershipModel_1.MembershipModel.findOne({
            where: {
                deleted: 0,
                membershipCompanyId: req?.membershipPayload?.membershipCompanyId,
                membershipId: validatedData.membershipId
            }
        });
        if (result == null) {
            const message = `Membership not found with ID: ${validatedData.membershipId}`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        result.deleted = true;
        await result.save();
        const response = response_1.ResponseData.success({ message: 'Membership deleted successfully' });
        logs_1.default.info('Membership deleted successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.removeMembership = removeMembership;
