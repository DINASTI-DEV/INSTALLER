import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import {
  handleServerError,
  handleValidationError,
  validateRequest
} from '../../utilities/requestHandler'
import { ValidationError } from 'joi'
import { findDetailOfficeSchema } from '../../schemas/officeSchema'
import { IOfficeFindDetailRequest } from '../../interfaces/office/office.request'
import { OfficeModel } from '../../models/officeModel'
import logger from '../../logs'
import { type IAuthenticatedRequest } from '../../interfaces/shared/request.interface'

export const findDetailOffice = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    findDetailOfficeSchema,
    req.params
  ) as {
    error: ValidationError
    value: IOfficeFindDetailRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const result = await OfficeModel.findOne({
      where: {
        deleted: 0,
        officeCompanyId: req?.membershipPayload?.membershipCompanyId!,
        officeId: validatedData.officeId
      }
    })

    if (result == null) {
      const message = `Office not found with ID: ${validatedData.officeId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    const response = ResponseData.success({ data: result })
    logger.info('Office found successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
