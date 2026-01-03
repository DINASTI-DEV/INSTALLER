"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpController = void 0;
const requestOtp_1 = require("./requestOtp");
const verifyOtp_1 = require("./verifyOtp");
exports.otpController = {
    requestOtp: requestOtp_1.requestOtp,
    verifyOtp: verifyOtp_1.verifyOtp
};
