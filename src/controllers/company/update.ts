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
import { updateCompanychema } from '../../schemas/companySchema'
import { CompanyModel } from '../../models/companyModel'
import { ICompanyUpdateRequest } from '../../interfaces/company/company.request'
import { type IAuthenticatedRequest } from '../../interfaces/shared/request.interface'

export const updateCompany = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    updateCompanychema,
    req.body
  ) as {
    error: ValidationError
    value: ICompanyUpdateRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const company = await CompanyModel.findOne({
      where: {
        deleted: 0,
        companyId: req?.membershipPayload?.membershipCompanyId
      }
    })

    if (company === null) {
      const message = `company not found`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    await CompanyModel.update(validatedData, {
      where: {
        deleted: 0,
        companyId: req?.membershipPayload?.membershipCompanyId
      }
    })

    const response = ResponseData.success({ message: 'company updated successfully' })
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
