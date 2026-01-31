import { Router } from 'express'
import { middleware } from '../middlewares'
import { attendanceController } from '../controllers/attendance'

const router = Router()

router.use(middleware.useAuthorization)

router.get(
  '/',
  middleware.allowAppRoles('user', 'admin'),
  middleware.allowMembershipRoles('employee', 'company'),
  attendanceController.findAllAttendance
)
router.get(
  '/detail/:attendanceId',
  middleware.allowAppRoles('user', 'admin'),
  middleware.allowMembershipRoles('employee', 'company'),
  attendanceController.findDetailAttendance
)
router.get(
  '/last-status',
  middleware.allowAppRoles('user', 'admin'),
  middleware.allowMembershipRoles('employee', 'company'),
  attendanceController.findLastStatus
)
router.get(
  '/last-status/detail/:officeId',
  middleware.allowAppRoles('user', 'admin'),
  middleware.allowMembershipRoles('employee', 'company'),
  attendanceController.findDetailLastStatusAttendance
)
router.post(
  '/',
  middleware.allowAppRoles('user'),
  middleware.allowMembershipRoles('employee'),
  attendanceController.createAttendance
)
router.get(
  '/histories',
  middleware.allowAppRoles('user', 'admin'),
  middleware.allowMembershipRoles('employee', 'company'),
  attendanceController.findAllAttendanceHistories
)
router.get(
  '/histories/detail/:attendanceHistoryId',
  middleware.allowAppRoles('user', 'admin'),
  middleware.allowMembershipRoles('employee', 'company'),
  attendanceController.findDetailAttendanceHistory
)

export default router
