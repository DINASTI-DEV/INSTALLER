"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleControllers = void 0;
const create_1 = require("./create");
const findAll_1 = require("./findAll");
const findAllScheduleByOffice_1 = require("./findAllScheduleByOffice");
const findDetail_1 = require("./findDetail");
const findDetailScheduleByOffice_1 = require("./findDetailScheduleByOffice");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.scheduleControllers = {
    findAll: findAll_1.findAllSchedule,
    findAllScheduleByOffice: findAllScheduleByOffice_1.findAllScheduleByOffice,
    findAllDetailScheduleByOffice: findDetailScheduleByOffice_1.findAllDetailScheduleByOffice,
    findOne: findDetail_1.findDetailSchedule,
    create: create_1.createSchedule,
    update: update_1.updateSchedule,
    remove: remove_1.removeSchedule
};
