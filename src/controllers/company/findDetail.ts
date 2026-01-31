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
import { findDetailCompanychema } from '../../schemas/companySchema'
import { ICompanyFindDetailRequest } from '../../interfaces/company/company.request'
import { CompanyModel } from '../../models/companyModel'
import { type IAuthenticatedRequest } from '../../interfaces/shared/request.interface'

export const findDetailCompany = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    findDetailCompanychema,
    req.params
  ) as {
    error: ValidationError
    value: ICompanyFindDetailRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const result = await CompanyModel.findOne({
      where: {
        deleted: 0,
        companyId: req?.membershipPayload?.membershipCompanyId
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
