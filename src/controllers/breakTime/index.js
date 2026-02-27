"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.breakTimeControllers = void 0;
const create_1 = require("./create");
const findAll_1 = require("./findAll");
const findDetail_1 = require("./findDetail");
const remove_1 = require("./remove");
exports.breakTimeControllers = {
    create: create_1.createBreakTime,
    findAll: findAll_1.findAllBreakTime,
    findDetail: findDetail_1.findDetailBreakTime,
    remove: remove_1.removeBreakTime
};
