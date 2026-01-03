"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeController = void 0;
const findAll_1 = require("./findAll");
const findDetail_1 = require("./findDetail");
const update_1 = require("./update");
exports.employeeController = {
    findAll: findAll_1.findAllEmployee,
    findDetail: findDetail_1.findDetailEmployee,
    update: update_1.updateEmployee
};
