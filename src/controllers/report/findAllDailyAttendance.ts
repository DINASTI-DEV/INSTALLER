import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Pagination } from '../../utilities/pagination'
import {
  handleServerError,
  handleValidationError,
  validateRequest
} from '../../utilities/requestHandler'
import { ValidationError } from 'joi'
import { IAuthenticatedRequest } from '../../interfaces/shared/request.interface'
import { DailyAttendanceSummaryModel } from '../../models/dailyAttendanceSummaryModel'
import { findAllDailyAttendanceReportSchema } from '../../schemas/dailyAttendanceReportSchema'
import { IDailyAttendanceReportFindAllRequest } from '../../interfaces/report/report.request'
import { UserModel } from '../../models/userModel'
import { ScheduleModel } from '../../models/scheduleModel'
import { PositionModel } from '../../models/positionModel'
import { Op, Sequelize } from 'sequelize'

export const findAllDailyAttendanceReport = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    findAllDailyAttendanceReportSchema,
    req.query
  ) as {
    error: ValidationError
    value: IDailyAttendanceReportFindAllRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const {
      page: queryPage,
      size: querySize,
      pagination,
      search,
      startDate,
      endDate
    } = validatedData

    const page = new Pagination(Number(queryPage) || 0, Number(querySize) || 10)

    const dateFilter =
      startDate && endDate
        ? {
            createdAt: {
              [Op.between]: [new Date(startDate), new Date(endDate)]
            }
          }
        : {}

    const result = await DailyAttendanceSummaryModel.findAndCountAll({
      where: {
        deleted: 0,
        summaryCompanyId: req.membershipPayload?.membershipCompanyId,
        ...dateFilter
      },

      include: [
        {
          model: UserModel,
          as: 'employee',
          attributes: [
            'userId',
            'userName',
            'userRole',
            'userDeviceId',
            'userWhatsappNumber'
          ],
          include: [{ model: PositionModel, as: 'position' }],
          where: search
            ? {
                [Op.or]: [
                  Sequelize.where(Sequelize.col('user.user_name'), 'LIKE', `%${search}%`)
                ]
              }
            : undefined
        },
        {
          model: ScheduleModel,
          as: 'schedule'
        }
      ],

      order: [['summaryId', 'desc']],
      ...(pagination === true && {
        limit: page.limit,
        offset: page.offset
      })
    })

    const response = ResponseData.success({ data: result })
    response.data = page.formatData(result)

    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
