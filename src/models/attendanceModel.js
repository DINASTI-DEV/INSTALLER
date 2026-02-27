"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceModel = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
const baseModelFields_1 = require("../database/baseModelFields");
const officeModel_1 = require("./officeModel");
const userModel_1 = require("./userModel");
const scheduleModel_1 = require("./scheduleModel");
exports.AttendanceModel = config_1.sequelize.define('Attendances', {
    ...baseModelFields_1.BaseModelFields,
    attendanceId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    attendanceCompanyId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    attendanceScheduleId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    attendanceUserId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    attendanceOfficeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    attendanceTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    attendanceCategory: {
        type: sequelize_1.DataTypes.ENUM('checkin', 'checkout', 'breakin', 'breakout'),
        allowNull: false
    },
    attendancePhoto: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    attendanceLatitude: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    attendanceLongitude: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    attendanceDistanceFromOffice: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    attendanceFaceId: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    attendanceFingerprintId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'attendances',
    timestamps: true,
    underscored: true,
    freezeTableName: true
});
exports.AttendanceModel.belongsTo(officeModel_1.OfficeModel, { foreignKey: 'attendanceOfficeId', as: 'office' });
officeModel_1.OfficeModel.hasOne(exports.AttendanceModel, {
    foreignKey: 'attendanceOfficeId',
    as: 'attendance'
});
exports.AttendanceModel.belongsTo(userModel_1.UserModel, { foreignKey: 'attendanceUserId', as: 'user' });
userModel_1.UserModel.hasOne(exports.AttendanceModel, { foreignKey: 'attendanceUserId', as: 'attendance' });
exports.AttendanceModel.belongsTo(scheduleModel_1.ScheduleModel, {
    foreignKey: 'attendanceScheduleId',
    as: 'schedule'
});
scheduleModel_1.ScheduleModel.hasOne(exports.AttendanceModel, {
    foreignKey: 'attendanceScheduleId',
    as: 'attendance'
});
