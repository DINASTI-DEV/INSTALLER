import { Router } from 'express'
import { middleware } from '../middlewares'
import { positionControllers } from '../controllers/position'

const router = Router()

router.use(middleware.useAuthorization)
router.use(middleware.allowMembershipRoles('company'))

router.get('/', positionControllers.findAll)
router.get('/detail/:positionId', positionControllers.findDetail)

router.post(
  '/',
  middleware.allowAppRoles('admin', 'superAdmin'),
  positionControllers.create
)
router.patch(
  '/',
  middleware.allowAppRoles('admin', 'superAdmin'),
  positionControllers.update
)
router.delete(
  '/:positionId',
  middleware.allowAppRoles('admin', 'superAdmin'),
  positionControllers.remove
)

router.post(
  '/assigns',
  middleware.allowAppRoles('admin', 'superAdmin'),
  positionControllers.assign
)
export default router
