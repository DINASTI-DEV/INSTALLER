"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.officeControllers = void 0;
const create_1 = require("./create");
const findAll_1 = require("./findAll");
const findAllOfficeLocation_1 = require("./findAllOfficeLocation");
const findAllOfficeName_1 = require("./findAllOfficeName");
const findDetail_1 = require("./findDetail");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.officeControllers = {
    findAll: findAll_1.findAllOffice,
    findAllOfficeName: findAllOfficeName_1.findAllOfficeName,
    findAllOfficeLocation: findAllOfficeLocation_1.findAllOfficeLocation,
    findDetail: findDetail_1.findDetailOffice,
    create: create_1.createOffice,
    update: update_1.updateOffice,
    remove: remove_1.removeOffice
};
