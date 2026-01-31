"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowAppRoles = allowAppRoles;
const response_1 = require("../utilities/response");
const http_status_codes_1 = require("http-status-codes");
function allowAppRoles(...roles) {
    return (req, res, next) => {
        if (!req.jwtPayload) {
            const message = 'Unauthorized! Mising Token';
            const response = response_1.ResponseData.error({ message });
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response);
        }
        const user = req?.jwtPayload;
        if (!user) {
            const message = 'Unauthorized! unknown user';
            const response = response_1.ResponseData.error({ message });
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response);
        }
        if (!roles.includes(user.userRole)) {
            const message = 'Forbidden: Insufficient role';
            const response = response_1.ResponseData.error({ message });
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response);
        }
        next();
    };
}
