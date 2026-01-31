import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Pagination } from '../../utilities/pagination'
import { findAllScheduleSchema } from '../../schemas/scheduleSchema'
import { ScheduleModel } from '../../models/scheduleModel'
import { Op } from 'sequelize'
import {
  handleServerError,
  handleValidationError,
  validateRequest
} from '../../utilities/requestHandler'
import { ValidationError } from 'joi'
import { IScheduleFindAllRequest } from '../../interfaces/schedule/schedule.request'
import { OfficeModel } from '../../models/officeModel'
import logger from '../../logs'
import { type IAuthenticatedRequest } from '../../interfaces/shared/request.interface'

export const findAllSchedule = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    findAllScheduleSchema,
    req.query
  ) as {
    error: ValidationError
    value: IScheduleFindAllRequest
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

    const result = await ScheduleModel.findAndCountAll({
      where: {
        deleted: 0,
        scheduleCompanyId: req?.membershipPayload?.membershipCompanyId,
        ...(Boolean(validatedData?.officeId) && {
          scheduleOfficeId: validatedData?.officeId
        }),
        ...(Boolean(startDate) &&
          Boolean(endDate) && {
            [Op.or]: [
              {
                scheduleStartDate: {
                  [Op.between]: [startDate + ' 00:00:00', endDate + ' 23:59:59']
                }
              },
              {
                scheduleEndDate: {
                  [Op.between]: [startDate + ' 00:00:00', endDate + ' 23:59:59']
                }
              }
            ]
          }),
        ...(Boolean(startDate) &&
          !endDate && {
            scheduleStartDate: {
              [Op.gte]: startDate + ' 00:00:00'
            }
          }),
        ...(Boolean(endDate) &&
          !startDate && {
            scheduleStartDate: {
              [Op.lte]: endDate + ' 23:59:59'
            }
          })
      },
      include: [
        {
          model: OfficeModel,
          as: 'office'
        }
      ],
      order: [['scheduleOrder', 'ASC']],
      distinct: true,
      ...(pagination === true && {
        limit: page.limit,
        offset: page.offset
      })
    })

    const response = ResponseData.success({ data: result })
    response.data = page.formatData(result)

    logger.info('Schedule retrieved successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
