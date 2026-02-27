"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyAttendanceSummaryModel = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
const baseModelFields_1 = require("../database/baseModelFields");
const scheduleModel_1 = require("./scheduleModel");
const userModel_1 = require("./userModel");
exports.DailyAttendanceSummaryModel = config_1.sequelize.define('DailyAttendanceSummaries', {
    ...baseModelFields_1.BaseModelFields,
    summaryId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    summaryCompanyId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    summaryUserId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    summaryScheduleId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    summaryDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
    checkinTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    breakTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    checkoutTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    isValidAttendance: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    dailySalary: {
        type: sequelize_1.DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
    },
    totalWorkHours: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: true,
        defaultValue: 0,
        comment: 'Total jam kerja efektif (checkout - checkin - break), dalam jam'
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'daily_attendance_summaries',
    timestamps: true,
    underscored: true,
    freezeTableName: true
});
exports.DailyAttendanceSummaryModel.belongsTo(userModel_1.UserModel, {
    foreignKey: 'summaryUserId',
    as: 'employee'
});
userModel_1.UserModel.hasOne(exports.DailyAttendanceSummaryModel, {
    foreignKey: 'summaryUserId',
    as: 'dailyReport'
});
exports.DailyAttendanceSummaryModel.belongsTo(scheduleModel_1.ScheduleModel, {
    foreignKey: 'summaryScheduleId',
    as: 'schedule'
});
scheduleModel_1.ScheduleModel.hasOne(exports.DailyAttendanceSummaryModel, {
    foreignKey: 'summaryScheduleId',
    as: 'schedule'
});
