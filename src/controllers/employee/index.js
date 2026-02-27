"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeController = void 0;
const findAll_1 = require("./findAll");
const findDetail_1 = require("./findDetail");
const findAllByOfficeId_1 = require("./findAllByOfficeId");
const update_1 = require("./update");
const createEmployee_1 = require("./createEmployee");
const updateUserFingerprint_1 = require("./updateUserFingerprint");
exports.employeeController = {
    findAll: findAll_1.findAllEmployee,
    findDetail: findDetail_1.findDetailEmployee,
    findAllByOfficeId: findAllByOfficeId_1.findAllByOfficeId,
    create: createEmployee_1.createEmployee,
    update: update_1.updateEmployee,
    updateUserFingerprint: updateUserFingerprint_1.updateUserFingerprint
};
