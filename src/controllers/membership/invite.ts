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
import { IAuthenticatedRequest } from '../../interfaces/shared/request.interface'
import {
  IMembershipCreateRequest,
  IMembershipInviteRequest
} from '../../interfaces/membership/membership.request'
import { MembershipModel } from '../../models/membershipModel'
import { membershipInviteSchema } from '../../schemas/membershipSchema'
import { CompanyModel } from '../../models/companyModel'
import { Op } from 'sequelize'

export const inviteMembership = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    membershipInviteSchema,
    req.body
  ) as {
    error: ValidationError
    value: IMembershipInviteRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const companyCheck = await CompanyModel.findOne({
      where: {
        deleted: 0,
        companyInviteCode: validatedData.inviteCode
      }
    })

    if (companyCheck === null) {
      const message = 'Kode invitation tidak ditemukan'
      return res.status(StatusCodes.FORBIDDEN).json(ResponseData.error({ message }))
    }

    const activeMembershipCheck = await MembershipModel.findOne({
      where: {
        deleted: 0,
        membershipStatus: { [Op.not]: 'rejected' },
        membershipCompanyId: companyCheck.companyId,
        membershipUserId: req?.jwtPayload?.userId
      }
    })

    if (activeMembershipCheck) {
      const message = 'Anda sudah terdaftar'
      return res.status(StatusCodes.FORBIDDEN).json(ResponseData.error({ message }))
    }

    const memebershipPayload = {
      membershipUserId: req?.jwtPayload?.userId!,
      membershipCompanyId: companyCheck.companyId,
      membershipRole: 'employee',
      membershipStatus: 'pending'
    } as IMembershipCreateRequest

    await MembershipModel.create(memebershipPayload)

    const response = ResponseData.success({})
    logger.info('Invite membership created successfully')
    return res.status(StatusCodes.CREATED).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
