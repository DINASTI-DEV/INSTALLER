import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import AWS from 'aws-sdk'
import { ResponseData } from '../../utilities/response'
import { handleServerError } from '../../utilities/requestHandler'
import { type IAuthenticatedRequest } from '../../interfaces/shared/request.interface'

const rekognition = new AWS.Rekognition()
const s3 = new AWS.S3()

const COLLECTION_ID = 'employee_faces'
const BUCKET_NAME = 'employee-fresh-face'

export const compareFace = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  if (!req.file) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(ResponseData.error({ message: 'Image is required' }))
  }

  try {
    /**
     * 1️⃣ Upload image ke S3
     */
    const imageUrl = await s3
      .upload({
        Bucket: BUCKET_NAME,
        Key: `attendance/${req.jwtPayload!.userId}/${Date.now()}.jpg`,
        Body: req.file.buffer,
        ContentType: 'image/jpeg'
      })
      .promise()

    /**
     * 2️⃣ Compare face
     */
    const result = await rekognition
      .searchFacesByImage({
        CollectionId: COLLECTION_ID,
        Image: { Bytes: req.file.buffer },
        FaceMatchThreshold: 90,
        MaxFaces: 1
      })
      .promise()

    if (!result.FaceMatches || result.FaceMatches.length === 0) {
      return res.status(StatusCodes.OK).json(
        ResponseData.success({
          message: 'Face not recognized',
          data: { imageUrl: imageUrl.Location }
        })
      )
    }

    const matchedFace = result.FaceMatches[0]

    if (Number(matchedFace.Face?.ExternalImageId) !== req.jwtPayload?.userId) {
      return res.status(StatusCodes.OK).json(
        ResponseData.success({
          message: 'Face not match',
          data: { imageUrl: imageUrl.Location }
        })
      )
    }
    console.log({
      userId: matchedFace.Face?.ExternalImageId,
      similarity: matchedFace.Similarity,
      imageUrl: imageUrl.Location
    })

    /**
     * 3️⃣ SUCCESS RESPONSE
     */
    return res.status(StatusCodes.OK).json(
      ResponseData.success({
        data: {
          userId: matchedFace.Face?.ExternalImageId,
          similarity: matchedFace.Similarity,
          imageUrl: imageUrl.Location
        }
      })
    )
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
