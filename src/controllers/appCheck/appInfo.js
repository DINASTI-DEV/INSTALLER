"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appInfo = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const appInfo = async (req, res) => {
    try {
        const data = {
            isMaintenance: false,
            maintenanceMessage: ''
        };
        const response = response_1.ResponseData.success({ data });
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.appInfo = appInfo;
