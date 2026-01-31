"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const access_1 = require("./access");
const appRole_1 = require("./appRole");
const membershipRoleGuard_1 = require("./membershipRoleGuard");
const requestTimer_1 = require("./requestTimer");
exports.middleware = {
    useAuthorization: access_1.useAuthorization,
    requestTimer: requestTimer_1.requestTimer,
    allowAppRoles: appRole_1.allowAppRoles,
    allowMembershipRoles: membershipRoleGuard_1.allowMembershipRoles
};
