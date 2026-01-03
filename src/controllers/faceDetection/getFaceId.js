"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFaceId = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const userModel_1 = require("../../models/userModel");
const getFaceId = async (req, res) => {
    try {
        const user = await userModel_1.UserModel.findOne({
            where: {
                deleted: 0,
                userId: req.jwtPayload?.userId
            }
        });
        if (user == null) {
            const message = 'user not found!';
            const response = response_1.ResponseData.error({ message });
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        const response = response_1.ResponseData.success({
            data: { faceId: user?.userFaceId || null }
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.getFaceId = getFaceId;
