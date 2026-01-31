import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { createOfficeSchema } from '../../schemas/officeSchema'
import {
  handleServerError,
  handleValidationError,
  validateRequest
} from '../../utilities/requestHandler'
import { ValidationError } from 'joi'
import { IOfficeCreateRequest } from '../../interfaces/office/office.request'
import { OfficeModel } from '../../models/officeModel'
import logger from '../../logs'
import { IAuthenticatedRequest } from '../../interfaces/shared/request.interface'
import { sequelize } from '../../database/config'
import { ScheduleModel } from '../../models/scheduleModel'
import { IScheduleAttributes } from '../../interfaces/schedule/schedule.dto'

export const createOffice = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    createOfficeSchema,
    req.body
  ) as {
    error: ValidationError
    value: IOfficeCreateRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  const transaction = await sequelize.transaction()

  try {
    const companyId = req?.membershipPayload?.membershipCompanyId!
    validatedData.officeCompanyId = companyId

    const currentOfficeCount = await OfficeModel.count({
      where: {
        deleted: 0,
        officeCompanyId: companyId
      },
      transaction
    })

    const createdOffice = await OfficeModel.create(validatedData, { transaction })

    const schedules = [
      {
        scheduleCompanyId: companyId,
        scheduleOfficeId: createdOffice.officeId,
        scheduleName: 'Minggu',
        scheduleStart: '09:00',
        scheduleEnd: '17:00',
        scheduleBreakStart: '12:00',
        scheduleBreakEnd: '13:00',
        scheduleCategory: 'libur',
        scheduleOrder: 0
      },
      {
        scheduleCompanyId: companyId,
        scheduleOfficeId: createdOffice.officeId,
        scheduleName: 'Senin',
        scheduleStart: '09:00',
        scheduleEnd: '17:00',
        scheduleBreakStart: '12:00',
        scheduleBreakEnd: '13:00',
        scheduleCategory: 'regular',
        scheduleOrder: 1
      },
      {
        scheduleCompanyId: companyId,
        scheduleOfficeId: createdOffice.officeId,
        scheduleName: 'Selasa',
        scheduleStart: '09:00',
        scheduleEnd: '17:00',
        scheduleBreakStart: '12:00',
        scheduleBreakEnd: '13:00',
        scheduleCategory: 'regular',
        scheduleOrder: 2
      },
      {
        scheduleCompanyId: companyId,
        scheduleOfficeId: createdOffice.officeId,
        scheduleName: 'Rabu',
        scheduleStart: '09:00',
        scheduleEnd: '17:00',
        scheduleBreakStart: '12:00',
        scheduleBreakEnd: '13:00',
        scheduleCategory: 'regular',
        scheduleOrder: 3
      },
      {
        scheduleCompanyId: companyId,
        scheduleOfficeId: createdOffice.officeId,
        scheduleName: 'Kamis',
        scheduleStart: '09:00',
        scheduleEnd: '17:00',
        scheduleBreakStart: '12:00',
        scheduleBreakEnd: '13:00',
        scheduleCategory: 'regular',
        scheduleOrder: 4
      },
      {
        scheduleCompanyId: companyId,
        scheduleOfficeId: createdOffice.officeId,
        scheduleName: 'Jumat',
        scheduleStart: '09:00',
        scheduleEnd: '17:00',
        scheduleBreakStart: '12:00',
        scheduleBreakEnd: '13:00',
        scheduleCategory: 'regular',
        scheduleOrder: 5
      },
      {
        scheduleCompanyId: companyId,
        scheduleOfficeId: createdOffice.officeId,
        scheduleName: 'Sabtu',
        scheduleStart: '09:00',
        scheduleEnd: '17:00',
        scheduleBreakStart: '12:00',
        scheduleBreakEnd: '13:00',
        scheduleCategory: 'libur',
        scheduleOrder: 6
      }
    ] as IScheduleAttributes[]

    await ScheduleModel.bulkCreate(schedules, { transaction })

    await transaction.commit()
    const response = ResponseData.success({})
    logger.info('Office created successfully')
    return res.status(StatusCodes.CREATED).json(response)
  } catch (serverError) {
    await transaction.rollback()
    return handleServerError(res, serverError)
  }
}
