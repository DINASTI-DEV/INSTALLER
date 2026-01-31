import { DataTypes } from 'sequelize'
import { sequelize } from '../database/config'
import { BaseModelFields } from '../database/baseModelFields'
import { PositionInstance } from '../interfaces/position/position.dto'

export const PositionModel = sequelize.define<PositionInstance>(
  'Positions',
  {
    ...BaseModelFields,
    positionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    positionCompanyId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    positionName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    positionDailySalary: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      comment: 'Gaji per hari'
    }
  },
  {
    tableName: 'positions',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)
