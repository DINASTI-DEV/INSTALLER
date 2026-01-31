import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { ScheduleModel } from '../../models/scheduleModel'
import { findDetailScheduleSchema } from '../../schemas/scheduleSchema'
import {
  handleServerError,
  handleValidationError,
  validateRequest
} from '../../utilities/requestHandler'
import { ValidationError } from 'joi'
import { IScheduleFindDetailRequest } from '../../interfaces/schedule/schedule.request'
import { OfficeModel } from '../../models/officeModel'
import logger from '../../logs'
import { type IAuthenticatedRequest } from '../../interfaces/shared/request.interface'

export const findDetailSchedule = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    findDetailScheduleSchema,
    req.params
  ) as {
    error: ValidationError
    value: IScheduleFindDetailRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const result = await ScheduleModel.findOne({
      where: {
        deleted: 0,
        scheduleCompanyId: req?.membershipPayload?.membershipCompanyId,
        scheduleId: validatedData.scheduleId
      },
      include: {
        model: OfficeModel,
        as: 'office'
      }
    })

    if (result == null) {
      const message = `Schedule not found with ID: ${validatedData.scheduleId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    const response = ResponseData.success({ data: result })
    logger.info('Schedule found successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
