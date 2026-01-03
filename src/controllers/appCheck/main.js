"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const mainApp = async (req, res) => {
    try {
        const data = {
            aboutMe: 'Welcome to SATUFLOW API'
        };
        const response = response_1.ResponseData.success({
            data,
            executionTime: res.locals.executionTime
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.mainApp = mainApp;
