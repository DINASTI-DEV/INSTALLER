"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionModel = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
const baseModelFields_1 = require("../database/baseModelFields");
exports.PositionModel = config_1.sequelize.define('Positions', {
    ...baseModelFields_1.BaseModelFields,
    positionId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    positionCompanyId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    positionName: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    positionHourlySalary: {
        type: sequelize_1.DataTypes.DECIMAL(12, 2),
        allowNull: false,
        comment: 'Gaji per jam'
    }
}, {
    tableName: 'positions',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
