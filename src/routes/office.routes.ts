import { Router } from 'express'
import { middleware } from '../middlewares'
import { officeControllers } from '../controllers/office'

const router = Router()

router.use(middleware.useAuthorization)
router.use(middleware.allowMembershipRoles('employee', 'company'))

router.get('/', officeControllers.findAll)
router.get('/detail/:officeId', officeControllers.findDetail)
router.get('/names', officeControllers.findAllOfficeName)
router.get(
  '/locations',
  middleware.allowAppRoles('admin', 'superAdmin'),
  officeControllers.findAllOfficeLocation
)
router.post(
  '/',
  middleware.allowAppRoles('admin', 'superAdmin'),
  officeControllers.create
)
router.patch(
  '/',
  middleware.allowAppRoles('admin', 'superAdmin'),
  officeControllers.update
)
router.delete(
  '/:officeId',
  middleware.allowAppRoles('admin', 'superAdmin'),
  officeControllers.remove
)

export default router
