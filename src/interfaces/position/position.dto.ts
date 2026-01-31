import { Model } from 'sequelize'
import { IBaseModelFields } from '../../database/baseModelFields'

export interface IPositionAttributes extends IBaseModelFields {
  positionId: number
  positionCompanyId: number
  positionName: string
  positionDailySalary: number
}

export type IPositionCreationAttributes = Omit<
  IPositionAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>

export interface PositionInstance
  extends Model<IPositionAttributes, IPositionCreationAttributes>,
    IPositionAttributes {}
