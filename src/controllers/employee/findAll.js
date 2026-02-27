"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllEmployee = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const employeeSchema_1 = require("../../schemas/employeeSchema");
const requestHandler_1 = require("../../utilities/requestHandler");
const pagination_1 = require("../../utilities/pagination");
const userModel_1 = require("../../models/userModel");
const logs_1 = __importDefault(require("../../../logs"));
const response_1 = require("../../utilities/response");
const membershipModel_1 = require("../../models/membershipModel");
const positionModel_1 = require("../../models/positionModel");
const findAllEmployee = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(employeeSchema_1.findAllEmployeeSchema, req.query);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    const { page: queryPage, size: querySize, search, pagination, officeId } = validatedData;
    try {
        const page = new pagination_1.Pagination(Number(queryPage) || 0, Number(querySize) || 10);
        const result = await membershipModel_1.MembershipModel.findAndCountAll({
            where: {
                deleted: 0,
                membershipCompanyId: req?.membershipPayload?.membershipCompanyId,
                membershipRole: 'employee',
                ...(Boolean(req.body?.jwtPayload?.userRole === 'user') && {
                    membershipUserId: { [sequelize_1.Op.not]: req.body?.jwtPayload?.userId }
                }),
                ...(Boolean(officeId) && {
                    membershipOfficeId: officeId
                })
            },
            include: [
                {
                    model: userModel_1.UserModel,
                    as: 'employee',
                    where: {
                        deleted: 0,
                        ...(Boolean(search) && {
                            [sequelize_1.Op.or]: [{ userName: { [sequelize_1.Op.like]: `%${search}%` } }]
                        })
                    },
                    attributes: [
                        'userId',
                        'userDeviceId',
                        'userName',
                        'userWhatsappNumber',
                        'userFaceId',
                        'userFingerprintId',
                        'userRole',
                        'createdAt',
                        'updatedAt'
                    ],
                    include: [
                        {
                            model: positionModel_1.PositionModel,
                            as: 'position'
                        }
                    ]
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
        logs_1.default.info('Fetched all employee successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findAllEmployee = findAllEmployee;
