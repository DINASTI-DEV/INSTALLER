"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseData = void 0;
const configs_1 = require("../configs");
const buildMeta = (executionTime, requestId) => {
    return {
        version: configs_1.appConfigs.app.appVersion,
        timestamp: new Date().toISOString(),
        executionTime,
        requestId
    };
};
exports.ResponseData = {
    success: ({ data, message = 'Request successful', executionTime, requestId }) => ({
        success: true,
        message,
        data,
        meta: buildMeta(executionTime, requestId)
    }),
    error: ({ message = 'Something went wrong', executionTime, requestId }) => ({
        success: false,
        message,
        data: null,
        meta: buildMeta(executionTime, requestId)
    })
};
