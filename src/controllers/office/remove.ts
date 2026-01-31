import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import {
  handleServerError,
  handleValidationError,
  validateRequest
} from '../../utilities/requestHandler'
import { OfficeModel } from '../../models/officeModel'
import logger from '../../logs'
import { removeOfficeSchema } from '../../schemas/officeSchema'
import { ValidationError } from 'joi'
import { IOfficeRemoveRequest } from '../../interfaces/office/office.request'
import { type IAuthenticatedRequest } from '../../interfaces/shared/request.interface'

export const removeOffice = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    removeOfficeSchema,
    req.params
  ) as {
    error: ValidationError
    value: IOfficeRemoveRequest
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

    result.deleted = true
    await result.save()

    const response = ResponseData.success({ message: 'Office deleted successfully' })
    logger.info('Office deleted successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
