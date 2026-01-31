import { IJwtPayload } from '../shared/jwt.interface'
import { IPaginationRequest } from '../shared/paginationRequest.interface'

export interface IDailyAttendanceReportFindAllRequest extends IPaginationRequest {
  jwtPayload: IJwtPayload
  companyId: number
}
