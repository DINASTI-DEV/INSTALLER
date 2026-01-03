"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recapDailyAttendance = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const dailyAttendanceService_1 = require("../../services/dailyAttendanceService");
const recapDailyAttendance = async (req, res) => {
    try {
        await (0, dailyAttendanceService_1.RecapDailyAttendanceService)();
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_1.ResponseData.success({
            message: 'Daily attendance recap executed'
        }));
    }
    catch (error) {
        return (0, requestHandler_1.handleServerError)(res, error);
    }
};
exports.recapDailyAttendance = recapDailyAttendance;
