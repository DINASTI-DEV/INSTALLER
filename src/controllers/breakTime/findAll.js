"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllBreakTime = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const pagination_1 = require("../../utilities/pagination");
const breakTimeSchema_1 = require("../../schemas/breakTimeSchema");
const breakTimeModel_1 = require("../../models/breakTimeModel");
const requestHandler_1 = require("../../utilities/requestHandler");
const logs_1 = __importDefault(require("../../../logs"));
const findAllBreakTime = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(breakTimeSchema_1.findAllBreakTimeSchema, req.query);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const { page: queryPage, size: querySize, pagination, officeId } = validatedData;
        const page = new pagination_1.Pagination(Number(queryPage) || 0, Number(querySize) || 10);
        const result = await breakTimeModel_1.BreakTimeModel.findAndCountAll({
            where: {
                deleted: 0,
                breakTimeCompanyId: req?.membershipPayload?.membershipCompanyId,
                ...(Number(officeId) > 0 && { breakTimeOfficeId: officeId })
            },
            order: [['breakTimeId', 'DESC']],
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.success({ data: result });
        response.data = page.formatData(result);
        logs_1.default.info('Break times retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findAllBreakTime = findAllBreakTime;
