import { Router } from 'express'
import { middleware } from '../middlewares'
import { ReportController } from '../controllers/report'

const router = Router()

router.use(middleware.useAuthorization)
router.use(middleware.allowMembershipRoles('company'))

router.get('/recap-daily-attendances', ReportController.findAllDailyAttendanceReport)
router.post('/recap-daily-attendances', ReportController.recapDailyAttendance)

export default router
