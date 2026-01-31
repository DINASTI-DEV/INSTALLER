import { type Request, type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { ResponseData } from '../../../utilities/response'
import {
  handleServerError,
  handleValidationError,
  validateRequest
} from '../../../utilities/requestHandler'
import { ValidationError } from 'joi'
import { UserModel } from '../../../models/userModel'
import logger from '../../../logs'
import { hashPassword } from '../../../utilities/scurePassword'
import { companyrRegistrationSchema } from '../../../schemas/auth/companyAuthSchema'
import { ICompanyRegisterRequest } from '../../../interfaces/auth/companyAuth.request'
import { CompanyModel } from '../../../models/companyModel'
import { generateUniqueInviteCode } from './createInviteCode'
import { MembershipModel } from '../../../models/membershipModel'
import { IMembershipAttributes } from '../../../interfaces/membership/membership.dto'
import { sequelize } from '../../../database/config'
import moment from 'moment'

export const companyRegister = async (req: Request, res: Response): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    companyrRegistrationSchema,
    req.body
  ) as {
    error: ValidationError
    value: ICompanyRegisterRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  const transaction = await sequelize.transaction()

  try {
    const existingUser = await UserModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        userWhatsappNumber: { [Op.eq]: validatedData.user.userWhatsappNumber }
      },
      transaction
    })

    if (existingUser != null) {
      await transaction.rollback()
      const message = `Nomor Whatsapp ${existingUser.userWhatsappNumber} sudah terdaftar, gunakan yang lain`
      logger.info(`Registration attempt failed: ${message}`)
      return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error({ message }))
    }

    validatedData.user.userPassword = hashPassword(validatedData.user.userPassword)
    validatedData.user.userRole = 'admin'

    const createdUser = await UserModel.create(validatedData.user, { transaction })

    validatedData.company.companyInviteCode = await generateUniqueInviteCode()

    const createdCompany = await CompanyModel.create(validatedData.company, {
      transaction
    })

    const membershipPayload = {
      membershipUserId: createdUser.userId,
      membershipCompanyId: createdCompany.companyId,
      membershipRole: 'company',
      membershipStatus: 'active'
    } as IMembershipAttributes

    await MembershipModel.create(membershipPayload, { transaction })

    const dateNow = moment()

    await transaction.commit()

    return res
      .status(StatusCodes.CREATED)
      .json(ResponseData.success({ message: 'Registration successful' }))
  } catch (serverError) {
    await transaction.rollback()
    return handleServerError(res, serverError)
  }
}
