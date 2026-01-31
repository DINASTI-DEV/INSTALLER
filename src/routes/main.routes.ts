import type { Express } from 'express'
import appCheckRoutes from './appCheck.routes'
import scheduleRoutes from './schedule.routes'
import employeeRoutes from './employee.routes'
import authRoutes from './auth.routes'
import attendanceRoutes from './attendance.routes'
import statisticRoutes from './statistic.routes'
import myProfileRoutes from './myProfile.routes'
import otpRoutes from './otp.routes'
import officeRoutes from './office.routes'
import companiesRoutes from './company.routes'
import membershipRoutes from './membership.routes'
import appInfoRoutes from './appInfo.routes'
import positionRoutes from './position.routes'
import reportRoutes from './report.routes'
import faceRecognitionRoutes from './faceRecognition.routes'

const apiVersion = '/api/v1'

export const appRouterV1 = (app: Express): void => {
  app.use(apiVersion, appCheckRoutes)
  app.use(apiVersion + '/info', appInfoRoutes)
  app.use(apiVersion + '/employees', employeeRoutes)
  app.use(apiVersion + '/auth', authRoutes)
  app.use(apiVersion + '/offices', officeRoutes)
  app.use(apiVersion + '/schedules', scheduleRoutes)
  app.use(apiVersion + '/attendances', attendanceRoutes)
  app.use(apiVersion + '/companies', companiesRoutes)
  app.use(apiVersion + '/statistic', statisticRoutes)
  app.use(apiVersion + '/my-profiles', myProfileRoutes)
  app.use(apiVersion + '/otp', otpRoutes)
  app.use(apiVersion + '/memberships', membershipRoutes)
  app.use(apiVersion + '/positions', positionRoutes)
  app.use(apiVersion + '/reports', reportRoutes)
  app.use(apiVersion + '/face-recognitions', faceRecognitionRoutes)
}
