import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { handleServerError } from '../../utilities/requestHandler'
import { type IAuthenticatedRequest } from '../../interfaces/shared/request.interface'
import { UserModel } from '../../models/userModel'

export const getFaceId = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const user = await UserModel.findOne({
      where: {
        deleted: 0,
        userId: req.jwtPayload?.userId
      }
    })

    if (user == null) {
      const message = 'user not found!'
      const response = ResponseData.error({ message })
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const response = ResponseData.success({
      data: { faceId: user?.userFaceId || null }
    })

    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
