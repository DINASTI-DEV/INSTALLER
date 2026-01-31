import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import AWS from 'aws-sdk'
import { ResponseData } from '../../utilities/response'
import { handleServerError } from '../../utilities/requestHandler'
import { type IAuthenticatedRequest } from '../../interfaces/shared/request.interface'
import { UserModel } from '../../models/userModel'

const rekognition = new AWS.Rekognition()
const COLLECTION_ID = 'employee_faces'

export const registerFace = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  console.log(req.file)
  if (!req.file) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(ResponseData.error({ message: 'Image is required' }))
  }

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

    const result = await rekognition
      .indexFaces({
        CollectionId: COLLECTION_ID,
        Image: { Bytes: req.file.buffer },
        ExternalImageId: req.jwtPayload?.userId?.toString() || ''
      })
      .promise()

    const faceId = result.FaceRecords?.[0]?.Face?.FaceId

    if (!faceId) {
      const message = 'face ID not found!'
      const response = ResponseData.error({ message })
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    user.userFaceId = faceId
    void user.save()

    const response = ResponseData.success({
      data: { faceId }
    })

    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
