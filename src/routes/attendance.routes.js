"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const attendance_1 = require("../controllers/attendance");
const router = (0, express_1.Router)();
router.use(middlewares_1.middleware.useAuthorization);
router.get(
  "/",
  middlewares_1.middleware.allowAppRoles("user", "admin"),
  middlewares_1.middleware.allowMembershipRoles("employee", "company"),
  attendance_1.attendanceController.findAllAttendance,
);
router.get(
  "/detail/:attendanceId",
  middlewares_1.middleware.allowAppRoles("user", "admin"),
  middlewares_1.middleware.allowMembershipRoles("employee", "company"),
  attendance_1.attendanceController.findDetailAttendance,
);
router.get(
  "/last-status",
  middlewares_1.middleware.allowAppRoles("user", "admin"),
  middlewares_1.middleware.allowMembershipRoles("employee", "company"),
  attendance_1.attendanceController.findLastStatus,
);
router.get(
  "/last-status/detail/:officeId",
  middlewares_1.middleware.allowAppRoles("user", "admin"),
  middlewares_1.middleware.allowMembershipRoles("employee", "company"),
  attendance_1.attendanceController.findDetailLastStatusAttendance,
);
router.post(
  "/",
  middlewares_1.middleware.allowAppRoles("user"),
  middlewares_1.middleware.allowMembershipRoles("employee"),
  attendance_1.attendanceController.createAttendance,
);
router.get(
  "/histories",
  middlewares_1.middleware.allowAppRoles("user", "admin"),
  middlewares_1.middleware.allowMembershipRoles("employee", "company"),
  attendance_1.attendanceController.findAllAttendanceHistories,
);
router.get(
  "/histories/detail/:attendanceHistoryId",
  middlewares_1.middleware.allowAppRoles("user", "admin"),
  middlewares_1.middleware.allowMembershipRoles("employee", "company"),
  attendance_1.attendanceController.findDetailAttendanceHistory,
);
exports.default = router;
