"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
exports.handleValidationError = handleValidationError;
exports.handleServerError = handleServerError;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("./response");
const logs_1 = __importDefault(require("../logs"));
const validateRequest = (schema, requestData) => {
    return schema.validate(requestData, { abortEarly: false });
};
exports.validateRequest = validateRequest;
function handleValidationError(res, error) {
    const message = `Invalid request! ${error.details.map((x) => x.message).join(', ')}`;
    logs_1.default.warn(message);
    const response = response_1.ResponseData.error({ message });
    return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
}
function handleServerError(res, err) {
    if (err instanceof Error) {
        const message = `Unable to process request!: ${err.message}`;
        logs_1.default.error(message, { stack: err.stack });
        const response = response_1.ResponseData.error({
            message: 'Unable to process request! Error code 1T33'
        });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
    const message = 'Unable to process request! Unknown error';
    logs_1.default.error(message);
    const response = response_1.ResponseData.error({ message: 'Unable to process request!' });
    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
}
