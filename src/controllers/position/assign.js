"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignUserPosition = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const userModel_1 = require("../../models/userModel");
const positionModel_1 = require("../../models/positionModel");
const positionSchema_1 = require("../../schemas/positionSchema");
const assignUserPosition = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(positionSchema_1.assignPositionSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const { positionId, userIds } = validatedData;
        /**
         * Optional (recommended):
         * cek apakah position ada & masih dalam company user
         */
        const position = await positionModel_1.PositionModel.findOne({
            where: {
                positionId,
                positionCompanyId: req.membershipPayload?.membershipUserId
            }
        });
        if (!position) {
            const message = `position not found`;
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        /**
         * Bulk update user position
         */
        const [affectedRows] = await userModel_1.UserModel.update({ userPositionId: positionId }, {
            where: {
                userId: {
                    [sequelize_1.Op.in]: userIds
                }
            }
        });
        const response = response_1.ResponseData.success({});
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.assignUserPosition = assignUserPosition;
