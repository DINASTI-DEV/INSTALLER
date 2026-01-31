import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { handleServerError } from '../../utilities/requestHandler'
import { type IAuthenticatedRequest } from '../../interfaces/shared/request.interface'
import { RecapDailyAttendanceService } from '../../services/dailyAttendanceService'

export const recapDailyAttendance = async (
  req: IAuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    await RecapDailyAttendanceService()
    return res.status(StatusCodes.OK).json(
      ResponseData.success({
        message: 'Daily attendance recap executed'
      })
    )
  } catch (error) {
    return handleServerError(res, error)
  }
}
