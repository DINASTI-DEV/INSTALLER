"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const login_1 = require("./administrator/login");
const login_2 = require("./company/login");
const register_1 = require("./company/register");
const login_3 = require("./employee/login");
const register_2 = require("./employee/register");
const updatePassword_1 = require("./updatePassword");
exports.authController = {
    employeeLogin: login_3.employeeLogin,
    employeeRegister: register_2.employeeRegister,
    companyRegister: register_1.companyRegister,
    companyLogin: login_2.companyLogin,
    administratorLogin: login_1.administratorLogin,
    updatePassword: updatePassword_1.updatePassword
};
