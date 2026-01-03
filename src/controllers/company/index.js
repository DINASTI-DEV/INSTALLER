"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyControllers = void 0;
const findAll_1 = require("./findAll");
const findDetail_1 = require("./findDetail");
const update_1 = require("./update");
exports.companyControllers = {
    findAll: findAll_1.findAllCompany,
    findDetail: findDetail_1.findDetailCompany,
    update: update_1.updateCompany
};
