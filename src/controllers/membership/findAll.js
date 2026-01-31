"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllMembership = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const pagination_1 = require("../../utilities/pagination");
const sequelize_1 = require("sequelize");
const requestHandler_1 = require("../../utilities/requestHandler");
const logs_1 = __importDefault(require("../../logs"));
const membershipSchema_1 = require("../../schemas/membershipSchema");
const membershipModel_1 = require("../../models/membershipModel");
const userModel_1 = require("../../models/userModel");
const findAllMembership = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(membershipSchema_1.membershipFindAllSchema, req.query);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const { page: queryPage, size: querySize, pagination, search } = validatedData;
        const page = new pagination_1.Pagination(Number(queryPage) || 0, Number(querySize) || 10);
        const result = await membershipModel_1.MembershipModel.findAndCountAll({
            where: {
                deleted: 0,
                ...(Boolean(req?.jwtPayload?.userRole === 'user') && {
                    membershipUserId: req?.jwtPayload?.userId
                }),
                ...(Boolean(req?.jwtPayload?.userRole === 'admin') && {
                    membershipCompanyId: req?.membershipPayload?.membershipCompanyId
                }),
                ...(Boolean(search) && {
                    [sequelize_1.Op.or]: [{ membershipId: { [sequelize_1.Op.like]: `%${search}%` } }]
                })
            },
            attributes: [
                'membershipId',
                'membershipCompanyId',
                'membershipUserId',
                'membershipOfficeId',
                'membershipStatus'
            ],
            include: [
                {
                    model: userModel_1.UserModel,
                    where: { userRole: 'user' },
                    as: 'employee',
                    attributes: ['userId', 'userName', 'userRole', 'userWhatsappNumber']
                }
            ],
            order: [['membershipId', 'desc']],
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.success({ data: result });
        response.data = page.formatData(result);
        logs_1.default.info('Membership retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findAllMembership = findAllMembership;
