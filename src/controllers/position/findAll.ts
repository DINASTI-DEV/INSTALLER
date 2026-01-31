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
import { PositionModel } from '../../models/positionModel'
import { findAllPositionSchema } from '../../schemas/positionSchema'
import { IPositionFindAllRequest } from '../../interfaces/position/position.request'
import { IAuthenticatedRequest } from '../../interfaces/shared/request.interface'

export const findAllPosition = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    findAllPositionSchema,
    req.query
  ) as {
    error: ValidationError
    value: IPositionFindAllRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const { page: queryPage, size: querySize, pagination, search } = validatedData

    const page = new Pagination(Number(queryPage) || 0, Number(querySize) || 10)

    const result = await PositionModel.findAndCountAll({
      where: {
        deleted: 0,
        positionCompanyId: req.membershipPayload?.membershipCompanyId
      },

      order: [['positionId', 'desc']],
      ...(pagination === true && {
        limit: page.limit,
        offset: page.offset
      })
    })

    const response = ResponseData.success({ data: result })
    response.data = page.formatData(result)

    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
