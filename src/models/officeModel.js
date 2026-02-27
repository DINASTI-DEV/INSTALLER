"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfficeModel = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
const baseModelFields_1 = require("../database/baseModelFields");
const breakTimeModel_1 = require("./breakTimeModel");
exports.OfficeModel = config_1.sequelize.define('Offices', {
    ...baseModelFields_1.BaseModelFields,
    officeId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    officeCompanyId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    officeName: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    officeAddress: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    officeLongitude: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    officeLatitude: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    officeMaximumDistanceAttendance: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1000
    },
    officeWifiMacAddress: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: true
    }
}, {
    tableName: 'offices',
    timestamps: false,
    underscored: true,
    freezeTableName: true
});
exports.OfficeModel.hasMany(breakTimeModel_1.BreakTimeModel, {
    foreignKey: 'breakTimeOfficeId',
    as: 'breakTimes'
});
breakTimeModel_1.BreakTimeModel.belongsTo(exports.OfficeModel, {
    foreignKey: 'breakTimeOfficeId',
    as: 'office'
});
