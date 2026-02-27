"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreakTimeModel = void 0;
const sequelize_1 = require("sequelize");
const baseModelFields_1 = require("../database/baseModelFields");
const config_1 = require("../database/config");
exports.BreakTimeModel = config_1.sequelize.define('BreakTimes', {
    ...baseModelFields_1.BaseModelFields,
    breakTimeId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    breakTimeCompanyId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    breakTimeOfficeId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    breakTimeScheduleId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    breakTimeDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
        comment: 'Tanggal berlaku break time (hanya hari ini)'
    },
    breakTimeCategory: {
        type: sequelize_1.DataTypes.ENUM('start', 'end'),
        allowNull: false
    },
    breakTimeStart: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    breakTimeEnd: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    breakTimeDuration: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'break_times',
    timestamps: false,
    underscored: true,
    freezeTableName: true
});
