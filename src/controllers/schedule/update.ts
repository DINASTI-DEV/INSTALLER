import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { updateScheduleSchema } from '../../schemas/scheduleSchema'
import { ScheduleModel } from '../../models/scheduleModel'
import {
  handleServerError,
  handleValidationError,
  validateRequest
} from '../../utilities/requestHandler'
import { ValidationError } from 'joi'
import { IScheduleUpdateRequest } from '../../interfaces/schedule/schedule.request'
import logger from '../../logs'
import { type IAuthenticatedRequest } from '../../interfaces/shared/request.interface'

export const updateSchedule = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    updateScheduleSchema,
    req.body
  ) as {
    error: ValidationError
    value: IScheduleUpdateRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const [updated] = await ScheduleModel.update(validatedData, {
      where: {
        deleted: 0,
        scheduleCompanyId: req?.membershipPayload?.membershipCompanyId,
        scheduleId: validatedData.scheduleId
      }
    })

    if (updated === 0) {
      const message = `Schedule not found with ID: ${validatedData.scheduleId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    const response = ResponseData.success({ message: 'Schedule updated successfully' })
    logger.info('Schedule updated successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
