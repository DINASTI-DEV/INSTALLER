"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.positionControllers = void 0;
const assign_1 = require("./assign");
const create_1 = require("./create");
const findAll_1 = require("./findAll");
const findDetail_1 = require("./findDetail");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.positionControllers = {
    findAll: findAll_1.findAllPosition,
    findDetail: findDetail_1.findDetailPosition,
    create: create_1.createPosition,
    remove: remove_1.removePosition,
    update: update_1.updatePosition,
    assign: assign_1.assignUserPosition
};
