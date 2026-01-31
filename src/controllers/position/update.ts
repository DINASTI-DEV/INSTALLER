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
import { updatePositionchema } from '../../schemas/positionSchema'
import { IPositionUpdateRequest } from '../../interfaces/position/position.request'
import { PositionModel } from '../../models/positionModel'

export const updatePosition = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    updatePositionchema,
    req.body
  ) as {
    error: ValidationError
    value: IPositionUpdateRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const company = await PositionModel.findOne({
      where: {
        deleted: 0,
        positionCompanyId: req?.membershipPayload?.membershipCompanyId
      }
    })

    if (company === null) {
      const message = `company not found`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    await PositionModel.update(validatedData, {
      where: {
        deleted: 0,
        positionCompanyId: req?.membershipPayload?.membershipCompanyId
      }
    })

    const response = ResponseData.success({ message: 'company updated successfully' })
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
