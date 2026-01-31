import { Router } from 'express'
import { scheduleControllers } from '../controllers/schedule'
import { middleware } from '../middlewares'

const router = Router()

router.use(middleware.useAuthorization)

router.get(
  '/',
  middleware.allowMembershipRoles('employee', 'company'),
  scheduleControllers.findAll
)
router.get(
  '/offices/:officeId',
  middleware.allowMembershipRoles('employee', 'company'),
  scheduleControllers.findAllDetailScheduleByOffice
)
router.get(
  '/detail/:scheduleId',
  middleware.allowMembershipRoles('employee', 'company'),
  scheduleControllers.findOne
)
router.post(
  '/',
  middleware.allowAppRoles('user'),
  middleware.allowMembershipRoles('employee'),
  scheduleControllers.create
)
router.patch(
  '/',
  middleware.allowAppRoles('admin', 'superAdmin'),
  middleware.allowMembershipRoles('company'),
  scheduleControllers.update
)
router.delete(
  '/:scheduleId',
  middleware.allowAppRoles('user'),
  middleware.allowMembershipRoles('employee'),
  scheduleControllers.remove
)

export default router
