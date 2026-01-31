import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import {
  handleServerError,
  handleValidationError,
  validateRequest
} from '../../utilities/requestHandler'
import { findDetailOfficeSchema } from '../../schemas/officeSchema'
import { ValidationError } from 'joi'
import { IOfficeFindDetailRequest } from '../../interfaces/office/office.request'
import { OfficeModel } from '../../models/officeModel'
import logger from '../../logs'
import { type IAuthenticatedRequest } from '../../interfaces/shared/request.interface'
import { ScheduleModel } from '../../models/scheduleModel'
import { MembershipModel } from '../../models/membershipModel'
import { UserModel } from '../../models/userModel'

export const findAllDetailScheduleByOffice = async (
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
      },
      attributes: ['officeId', 'officeName', 'officeAddress'],
      include: [
        {
          model: ScheduleModel,
          as: 'schedules',
          attributes: [
            'scheduleId',
            'scheduleName',
            'scheduleStart',
            'scheduleEnd',
            'scheduleBreakStart',
            'scheduleBreakEnd',
            'scheduleCategory',
            'scheduleOrder'
          ]
        },
        {
          model: MembershipModel,
          as: 'memberships',
          attributes: ['membershipId', 'membershipUserId', 'membershipRole'],
          include: [
            {
              model: UserModel,
              as: 'employee',
              attributes: ['userId', 'userName', 'userWhatsappNumber']
            }
          ]
        }
      ]
    })

    const response = ResponseData.success({ data: result })

    logger.info('Office retrieved successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
