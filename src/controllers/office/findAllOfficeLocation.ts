import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Pagination } from '../../utilities/pagination'
import {
  handleServerError,
  handleValidationError,
  validateRequest
} from '../../utilities/requestHandler'
import { ValidationError } from 'joi'
import { OfficeModel } from '../../models/officeModel'
import logger from '../../logs'
import { findAllOfficeLocationSchema } from '../../schemas/officeSchema'
import { IOfficeLocationFindAllRequest } from '../../interfaces/office/office.request'
import { type IAuthenticatedRequest } from '../../interfaces/shared/request.interface'

export const findAllOfficeLocation = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    findAllOfficeLocationSchema,
    req.body
  ) as {
    error: ValidationError
    value: IOfficeLocationFindAllRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const { page: queryPage, size: querySize, pagination } = validatedData

    const page = new Pagination(Number(queryPage) || 0, Number(querySize) || 10)

    const result = await OfficeModel.findAndCountAll({
      where: {
        deleted: 0,
        officeCompanyId: req?.membershipPayload?.membershipCompanyId!
      },
      attributes: [
        'officeId',
        'officeName',
        'officeAddress',
        'officeLongitude',
        'officeLatitude'
      ],
      order: [['officeId', 'desc']],
      ...(pagination === true && {
        limit: page.limit,
        offset: page.offset
      })
    })

    const response = ResponseData.success({ data: result })
    response.data = page.formatData(result)

    logger.info('Office retrieved successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
