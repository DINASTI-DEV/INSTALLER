"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const otp_1 = require("../controllers/otp");
const router = (0, express_1.Router)();
router.post('/request', otp_1.otpController.requestOtp);
router.post('/verify', otp_1.otpController.verifyOtp);
exports.default = router;
