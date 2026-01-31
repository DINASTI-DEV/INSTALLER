import { IJwtPayload } from '../shared/jwt.interface'
import { IPaginationRequest } from '../shared/paginationRequest.interface'

export interface IPositionFindAllRequest extends IPaginationRequest {
  jwtPayload: IJwtPayload
  companyId: number
}

export interface IPositionFindDetailRequest {
  jwtPayload: IJwtPayload
  companyId: number
}

export interface IPositionRemoveRequest extends IPositionFindDetailRequest {
  jwtPayload: IJwtPayload
  positionId: number
  membershipCompanyId: number
}

export interface IPositionUpdateRequest {
  jwtPayload: IJwtPayload
  positionId: number
  positionName?: string
  positionDailySalary?: number
}
