"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllAdminUsers = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const response_1 = require("../../utilities/response");
const pagination_1 = require("../../utilities/pagination");
const requestHandler_1 = require("../../utilities/requestHandler");
const adminUserSchema_1 = require("../../schemas/adminUserSchema");
const userModel_1 = require("../../models/userModel");
const logs_1 = __importDefault(require("../../../logs"));
const findAllAdminUsers = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(adminUserSchema_1.findAllAdminUsersSchema, req.query);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const { page: queryPage, size: querySize, pagination, search } = validatedData;
        const page = new pagination_1.Pagination(Number(queryPage) || 0, Number(querySize) || 10);
        const result = await userModel_1.UserModel.findAndCountAll({
            where: {
                deleted: 0,
                userRole: { [sequelize_1.Op.in]: ['admin', 'superAdmin'] },
                ...(Boolean(search) && {
                    [sequelize_1.Op.or]: [
                        { userName: { [sequelize_1.Op.like]: `%${search}%` } },
                        { userWhatsappNumber: { [sequelize_1.Op.like]: `%${search}%` } }
                    ]
                })
            },
            attributes: {
                exclude: ['userPassword']
            },
            order: [['userId', 'desc']],
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.success({ data: result });
        response.data = page.formatData(result);
        logs_1.default.info('Admin users retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findAllAdminUsers = findAllAdminUsers;
