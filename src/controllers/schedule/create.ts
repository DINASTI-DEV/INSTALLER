import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { ScheduleModel } from '../../models/scheduleModel'
import {
  handleServerError,
  handleValidationError,
  validateRequest
} from '../../utilities/requestHandler'
import { createScheduleSchema } from '../../schemas/scheduleSchema'
import { ValidationError } from 'joi'
import { IScheduleCreateRequest } from '../../interfaces/schedule/schedule.request'
import { OfficeModel } from '../../models/officeModel'
import logger from '../../logs'
import { type IAuthenticatedRequest } from '../../interfaces/shared/request.interface'

export const createSchedule = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    createScheduleSchema,
    req.body
  ) as {
    error: ValidationError
    value: IScheduleCreateRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const result = await OfficeModel.findOne({
      where: {
        deleted: 0,
        officeCompanyId: req?.membershipPayload?.membershipCompanyId,
        officeId: validatedData.scheduleOfficeId
      }
    })

    if (result == null) {
      const message = `Office not found with ID: ${validatedData.scheduleOfficeId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    // validatedData.scheduleUserId = req?.jwtPayload?.userId!
    validatedData.scheduleCompanyId = req?.membershipPayload?.membershipCompanyId

    await ScheduleModel.create(validatedData)

    const response = ResponseData.success({ message: 'schedule created successfully' })
    logger.info('schedule created successfully')

    return res.status(StatusCodes.CREATED).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
