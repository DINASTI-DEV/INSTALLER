"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModel = void 0;
const sequelize_1 = require("sequelize");
const baseModelFields_1 = require("../database/baseModelFields");
const config_1 = require("../database/config");
exports.CompanyModel = config_1.sequelize.define('Companies', {
    ...baseModelFields_1.BaseModelFields,
    companyId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    companyName: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    companyIndustry: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    companyInviteCode: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'companies',
    timestamps: false,
    underscored: true,
    freezeTableName: true
});
