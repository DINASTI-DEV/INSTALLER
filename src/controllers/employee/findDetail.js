"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDetailEmployee = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const employeeSchema_1 = require("../../schemas/employeeSchema");
const requestHandler_1 = require("../../utilities/requestHandler");
const userModel_1 = require("../../models/userModel");
const logs_1 = __importDefault(require("../../../logs"));
const membershipModel_1 = require("../../models/membershipModel");
const sequelize_1 = require("sequelize");
const findDetailEmployee = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(employeeSchema_1.findDetailEmployeeSchema, req.params);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    const { employeeId } = validatedData;
    try {
        const user = await membershipModel_1.MembershipModel.findOne({
            where: {
                deleted: 0,
                membershipCompanyId: req?.membershipPayload?.membershipCompanyId,
                membershipRole: 'employee',
                ...(Boolean(req.body?.jwtPayload?.userRole === 'user') && {
                    membershipUserId: { [sequelize_1.Op.not]: req.body?.jwtPayload?.userId }
                })
            },
            include: [
                {
                    model: userModel_1.UserModel,
                    as: 'employee',
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
                    ]
                }
            ]
        });
        if (user == null) {
            const message = 'Employee not found!';
            logs_1.default.info(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        const response = response_1.ResponseData.success({ data: user });
        logs_1.default.info(`Fetched employee with ID: ${employeeId} successfully`);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findDetailEmployee = findDetailEmployee;
