"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthorization = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../utilities/response");
const jwt_1 = require("../utilities/jwt");
const requestHandler_1 = require("../utilities/requestHandler");
const useAuthorization = (req, res, next) => {
    try {
        if (req.headers.authorization == null ||
            !req.headers.authorization.startsWith('Bearer ')) {
            const message = 'Missing Authorization.';
            const response = response_1.ResponseData.error({ message });
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
        }
        const token = req.headers.authorization.split(' ')[1];
        const verify = (0, jwt_1.verifyAccessToken)(token);
        if (!verify) {
            const message = 'Invalid Authorization.';
            const response = response_1.ResponseData.error({ message });
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response);
        }
        req.jwtPayload = verify;
        next();
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.useAuthorization = useAuthorization;
