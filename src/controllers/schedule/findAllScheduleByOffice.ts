import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Pagination } from '../../utilities/pagination'
import { Op } from 'sequelize'
import {
  handleServerError,
  handleValidationError,
  validateRequest
} from '../../utilities/requestHandler'
import { findAllOfficeSchema } from '../../schemas/officeSchema'
import { ValidationError } from 'joi'
import { IOfficeFindAllRequest } from '../../interfaces/office/office.request'
import { OfficeModel } from '../../models/officeModel'
import logger from '../../logs'
import { type IAuthenticatedRequest } from '../../interfaces/shared/request.interface'
import { ScheduleModel } from '../../models/scheduleModel'
import { MembershipModel } from '../../models/membershipModel'
import { UserModel } from '../../models/userModel'

export const findAllScheduleByOffice = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    findAllOfficeSchema,
    req.query
  ) as {
    error: ValidationError
    value: IOfficeFindAllRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const { page: queryPage, size: querySize, pagination, search } = validatedData

    const page = new Pagination(Number(queryPage) || 0, Number(querySize) || 10)

    const result = await OfficeModel.findAndCountAll({
      where: {
        deleted: 0,
        officeCompanyId: req?.membershipPayload?.membershipCompanyId!,
        ...(Boolean(search) && {
          [Op.or]: [{ officeName: { [Op.like]: `%${search}%` } }]
        })
      },
      attributes: [
        'officeId',
        'officeCompanyId',
        'officeName',
        'officeAddress',
        'officeLongitude',
        'officeLatitude',
        'officeMaximumDistanceAttendance',
        'officeWifiMacAddress'
      ],
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
              attributes: ['userName', 'userWhatsappNumber']
            }
          ]
        }
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
