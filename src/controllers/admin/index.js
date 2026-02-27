"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminControllers = void 0;
const findAllAdminUsers_1 = require("./findAllAdminUsers");
const createAdminUser_1 = require("./createAdminUser");
const updateAdminUser_1 = require("./updateAdminUser");
const removeAdminUser_1 = require("./removeAdminUser");
exports.adminControllers = {
    findAllAdminUsers: findAllAdminUsers_1.findAllAdminUsers,
    createAdminUser: createAdminUser_1.createAdminUser,
    updateAdminUser: updateAdminUser_1.updateAdminUser,
    removeAdminUser: removeAdminUser_1.removeAdminUser
};
