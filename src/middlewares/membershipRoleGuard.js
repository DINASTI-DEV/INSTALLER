"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowMembershipRoles = allowMembershipRoles;
const membershipModel_1 = require("../models/membershipModel");
const response_1 = require("../utilities/response");
const http_status_codes_1 = require("http-status-codes");
const requestHandler_1 = require("../utilities/requestHandler");
function allowMembershipRoles(...allowedRoles) {
    return async (req, res, next) => {
        const companyId = parseInt(req.headers['x-company-id'], 10);
        if (!req.jwtPayload || isNaN(companyId)) {
            const message = 'Unauthorized or missing company ID';
            const response = response_1.ResponseData.error({ message });
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response);
        }
        try {
            const membership = await membershipModel_1.MembershipModel.findOne({
                where: {
                    membershipUserId: req.jwtPayload?.userId,
                    membershipCompanyId: companyId,
                    membershipStatus: 'active'
                }
            });
            if (!membership) {
                const message = 'You are not a member of this company';
                const response = response_1.ResponseData.error({ message });
                return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response);
            }
            if (!allowedRoles.includes(membership.membershipRole)) {
                const message = 'Forbidden: Insufficient role';
                const response = response_1.ResponseData.error({ message });
                return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response);
            }
            req.membershipPayload = membership.dataValues;
            next();
        }
        catch (serverError) {
            return (0, requestHandler_1.handleServerError)(res, serverError);
        }
    };
}
