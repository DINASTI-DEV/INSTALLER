import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { ValidationError } from 'joi'

import { ResponseData } from '../../utilities/response'
import {
  handleServerError,
  handleValidationError,
  validateRequest
} from '../../utilities/requestHandler'

import { type IAuthenticatedRequest } from '../../interfaces/shared/request.interface'
import { UserModel } from '../../models/userModel'
import { PositionModel } from '../../models/positionModel'
import { assignPositionSchema } from '../../schemas/positionSchema'

interface IAssignPositionPayload {
  positionId: number
  userIds: number[]
}

export const assignUserPosition = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    assignPositionSchema,
    req.body
  ) as {
    error: ValidationError
    value: IAssignPositionPayload
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const { positionId, userIds } = validatedData

    /**
     * Optional (recommended):
     * cek apakah position ada & masih dalam company user
     */
    const position = await PositionModel.findOne({
      where: {
        positionId,
        positionCompanyId: req.membershipPayload?.membershipUserId
      }
    })

    if (!position) {
      const message = `position not found`
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    /**
     * Bulk update user position
     */
    const [affectedRows] = await UserModel.update(
      { userPositionId: positionId },
      {
        where: {
          userId: {
            [Op.in]: userIds
          }
        }
      }
    )

    const response = ResponseData.success({})

    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
