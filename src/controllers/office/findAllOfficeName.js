"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllOfficeName = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const officeModel_1 = require("../../models/officeModel");
const logs_1 = __importDefault(require("../../logs"));
const findAllOfficeName = async (req, res) => {
    try {
        const result = await officeModel_1.OfficeModel.findAll({
            where: {
                deleted: 0,
                officeCompanyId: req?.membershipPayload?.membershipCompanyId
            },
            attributes: ['officeId', 'officeName'],
            order: [['officeId', 'desc']]
        });
        const response = response_1.ResponseData.success({ data: result });
        logs_1.default.info('Office name retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findAllOfficeName = findAllOfficeName;
