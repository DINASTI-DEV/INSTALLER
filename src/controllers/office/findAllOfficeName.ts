import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { handleServerError } from '../../utilities/requestHandler'
import { OfficeModel } from '../../models/officeModel'
import logger from '../../logs'
import { type IAuthenticatedRequest } from '../../interfaces/shared/request.interface'

export const findAllOfficeName = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const result = await OfficeModel.findAll({
      where: {
        deleted: 0,
        officeCompanyId: req?.membershipPayload?.membershipCompanyId!
      },
      attributes: ['officeId', 'officeName'],
      order: [['officeId', 'desc']]
    })

    const response = ResponseData.success({ data: result })

    logger.info('Office name retrieved successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
