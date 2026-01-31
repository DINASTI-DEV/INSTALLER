import { DataTypes } from 'sequelize'
import { sequelize } from '../database/config'
import { BaseModelFields } from '../database/baseModelFields'
import { ScheduleModel } from './scheduleModel'
import { UserModel } from './userModel'

export const DailyAttendanceSummaryModel = sequelize.define(
  'DailyAttendanceSummaries',
  {
    ...BaseModelFields,
    summaryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    summaryCompanyId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    summaryUserId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    summaryScheduleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    summaryDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    checkinTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    breakTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    checkoutTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    isValidAttendance: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    dailySalary: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    tableName: 'daily_attendance_summaries',
    timestamps: true,
    underscored: true,
    freezeTableName: true
  }
)

DailyAttendanceSummaryModel.belongsTo(UserModel, {
  foreignKey: 'summaryUserId',
  as: 'employee'
})

UserModel.hasOne(DailyAttendanceSummaryModel, {
  foreignKey: 'summaryUserId',
  as: 'dailyReport'
})

DailyAttendanceSummaryModel.belongsTo(ScheduleModel, {
  foreignKey: 'summaryScheduleId',
  as: 'schedule'
})

ScheduleModel.hasOne(DailyAttendanceSummaryModel, {
  foreignKey: 'summaryScheduleId',
  as: 'schedule'
})
