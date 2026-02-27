"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTotal = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const officeModel_1 = require("../../models/officeModel");
const logs_1 = __importDefault(require("../../../logs"));
const membershipModel_1 = require("../../models/membershipModel");
const findTotal = async (req, res) => {
    try {
        const totalUsers = await membershipModel_1.MembershipModel.count({
            where: {
                deleted: 0,
                membershipCompanyId: req?.membershipPayload?.membershipCompanyId,
                membershipRole: 'employee'
            }
        });
        const totalOffice = await officeModel_1.OfficeModel.count({
            where: {
                deleted: 0,
                officeCompanyId: req?.membershipPayload?.membershipCompanyId
            }
        });
        const response = response_1.ResponseData.success({
            data: {
                totalUsers,
                totalOffice
            }
        });
        logs_1.default.info('Statistic found successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findTotal = findTotal;
