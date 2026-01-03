"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleModel = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
const baseModelFields_1 = require("../database/baseModelFields");
const officeModel_1 = require("./officeModel");
exports.ScheduleModel = config_1.sequelize.define('Schedules', {
    ...baseModelFields_1.BaseModelFields,
    scheduleId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    scheduleCompanyId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    scheduleName: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    scheduleOfficeId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'Office',
            key: 'officeId'
        }
    },
    scheduleStart: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    scheduleEnd: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    scheduleBreakStart: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    scheduleBreakEnd: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    scheduleCategory: {
        type: sequelize_1.DataTypes.ENUM('regular', 'libur'),
        allowNull: true,
        defaultValue: 'regular'
    },
    scheduleOrder: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    }
}, {
    tableName: 'schedules',
    timestamps: true,
    underscored: true,
    freezeTableName: true
});
exports.ScheduleModel.belongsTo(officeModel_1.OfficeModel, { foreignKey: 'scheduleOfficeId', as: 'office' });
officeModel_1.OfficeModel.hasMany(exports.ScheduleModel, { foreignKey: 'scheduleOfficeId', as: 'schedules' });
