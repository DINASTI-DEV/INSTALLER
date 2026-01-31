import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { ScheduleModel } from '../../models/scheduleModel'
import {
  handleServerError,
  handleValidationError,
  validateRequest
} from '../../utilities/requestHandler'
import { ValidationError } from 'joi'
import { IScheduleRemoveRequest } from '../../interfaces/schedule/schedule.request'
import logger from '../../logs'
import { removeScheduleSchema } from '../../schemas/scheduleSchema'
import { type IAuthenticatedRequest } from '../../interfaces/shared/request.interface'

export const removeSchedule = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    removeScheduleSchema,
    req.params
  ) as {
    error: ValidationError
    value: IScheduleRemoveRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const result = await ScheduleModel.findOne({
      where: {
        deleted: 0,
        scheduleCompanyId: req?.membershipPayload?.membershipCompanyId,
        scheduleId: validatedData.scheduleId
      }
    })

    if (result == null) {
      const message = `Schedule not found with ID: ${validatedData.scheduleId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    result.deleted = true
    void result.save()

    const response = ResponseData.success({ message: 'Schedule deleted successfully' })
    logger.info('Schedule deleted successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
