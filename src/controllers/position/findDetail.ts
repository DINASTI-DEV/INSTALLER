import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import {
  handleServerError,
  handleValidationError,
  validateRequest
} from '../../utilities/requestHandler'
import { ValidationError } from 'joi'
import logger from '../../logs'
import { type IAuthenticatedRequest } from '../../interfaces/shared/request.interface'
import { PositionModel } from '../../models/positionModel'
import { findDetailPositionSchema } from '../../schemas/positionSchema'
import { IPositionFindDetailRequest } from '../../interfaces/position/position.request'

export const findDetailPosition = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    findDetailPositionSchema,
    req.params
  ) as {
    error: ValidationError
    value: IPositionFindDetailRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const result = await PositionModel.findOne({
      where: {
        deleted: 0,
        positionCompanyId: req?.membershipPayload?.membershipCompanyId
      }
    })

    if (result == null) {
      const message = `Company not found`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    const response = ResponseData.success({ data: result })
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
