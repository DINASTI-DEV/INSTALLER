"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const package_json_1 = __importDefault(require("../../../package.json"));
const requestHandler_1 = require("../../utilities/requestHandler");
const startTime = Date.now();
const healthCheck = async (req, res) => {
    try {
        const uptimeInSeconds = Math.floor((Date.now() - startTime) / 1000);
        const data = {
            app: package_json_1.default.name,
            version: package_json_1.default.version,
            environment: process.env.NODE_ENV || 'development',
            uptime: `${uptimeInSeconds}s`,
            timestamp: process.uptime()
        };
        const response = response_1.ResponseData.success({ data });
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.healthCheck = healthCheck;
