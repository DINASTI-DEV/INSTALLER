"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendanceController = void 0;
const create_1 = require("./create");
const findAllAttendance_1 = require("./findAllAttendance");
const findAllAttendanceHistory_1 = require("./findAllAttendanceHistory");
const findAllLastStatusAttendance_1 = require("./findAllLastStatusAttendance");
const findDetailAttendance_1 = require("./findDetailAttendance");
const findDetailAttendanceHistory_1 = require("./findDetailAttendanceHistory");
const findDetailLastStatusAttendance_1 = require("./findDetailLastStatusAttendance");
const lastStatus_1 = require("./lastStatus");
exports.attendanceController = {
    createAttendance: create_1.createAttendance,
    findAllAttendance: findAllAttendance_1.findAllAttendance,
    findDetailAttendance: findDetailAttendance_1.findDetailAttendance,
    findAllLastStatusAttendance: findAllLastStatusAttendance_1.findAllLastStatusAttendance,
    findDetailLastStatusAttendance: findDetailLastStatusAttendance_1.findDetailLastStatusAttendance,
    findAllAttendanceHistories: findAllAttendanceHistory_1.findAllAttendanceHistories,
    findDetailAttendanceHistory: findDetailAttendanceHistory_1.findDetailAttendanceHistory,
    findLastStatus: lastStatus_1.findLastStatus
};
