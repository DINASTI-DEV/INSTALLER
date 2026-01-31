import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import {
  handleServerError,
  handleValidationError,
  validateRequest
} from '../../utilities/requestHandler'
import { updateOfficeSchema } from '../../schemas/officeSchema'
import { ValidationError } from 'joi'
import { IOfficeUpdateRequest } from '../../interfaces/office/office.request'
import { OfficeModel } from '../../models/officeModel'
import logger from '../../logs'
import { type IAuthenticatedRequest } from '../../interfaces/shared/request.interface'

export const updateOffice = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    updateOfficeSchema,
    req.body
  ) as {
    error: ValidationError
    value: IOfficeUpdateRequest
  }

  if (validationError) return handleValidationError(res, validationError)
  try {
    const office = await OfficeModel.findOne({
      where: {
        deleted: 0,
        officeCompanyId: req?.membershipPayload?.membershipCompanyId!,
        officeId: validatedData.officeId
      }
    })

    if (office === null) {
      const message = `Office not found with ID: ${validatedData.officeId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    await OfficeModel.update(validatedData, {
      where: { deleted: 0, officeId: validatedData.officeId }
    })

    const response = ResponseData.success({ message: 'Office updated successfully' })
    logger.info('Office updated successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
