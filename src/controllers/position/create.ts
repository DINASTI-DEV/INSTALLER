import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import {
  handleServerError,
  handleValidationError,
  validateRequest
} from '../../utilities/requestHandler'
import { ValidationError } from 'joi'
import { type IAuthenticatedRequest } from '../../interfaces/shared/request.interface'
import { createPositionSchema } from '../../schemas/positionSchema'
import { IPositionCreationAttributes } from '../../interfaces/position/position.dto'
import { PositionModel } from '../../models/positionModel'

export const createPosition = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    createPositionSchema,
    req.body
  ) as {
    error: ValidationError
    value: IPositionCreationAttributes
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    validatedData.positionCompanyId = req.membershipPayload?.membershipUserId || 0

    await PositionModel.create(validatedData)

    const response = ResponseData.success({})

    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
