"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const dailyAttendance_1 = require("./dailyAttendance");
const findAllDailyAttendance_1 = require("./findAllDailyAttendance");
exports.ReportController = {
    findAllDailyAttendanceReport: findAllDailyAttendance_1.findAllDailyAttendanceReport,
    recapDailyAttendance: dailyAttendance_1.recapDailyAttendance
};
