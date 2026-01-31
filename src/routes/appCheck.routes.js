"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appCheck_1 = require("../controllers/appCheck");
const router = (0, express_1.Router)();
router.get('/', appCheck_1.appChekController.mainApp);
router.get('/health', appCheck_1.appChekController.healthCheck);
exports.default = router;
