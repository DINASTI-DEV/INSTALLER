"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const baseModelFields_1 = require("../database/baseModelFields");
const config_1 = require("../database/config");
const positionModel_1 = require("./positionModel");
exports.UserModel = config_1.sequelize.define('Users', {
    ...baseModelFields_1.BaseModelFields,
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    userPassword: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    userWhatsappNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userRole: {
        type: sequelize_1.DataTypes.ENUM('admin', 'superAdmin', 'user'),
        allowNull: false,
        defaultValue: 'user'
    },
    userDeviceId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: '_'
    },
    userOnboardingStatus: {
        type: sequelize_1.DataTypes.ENUM('waiting', 'completed'),
        allowNull: true,
        defaultValue: 'waiting'
    },
    userPositionId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    userFaceId: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    userFingerprintId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    userFingerprintDeviceId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    userFingerprintDeviceName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
exports.UserModel.belongsTo(positionModel_1.PositionModel, { foreignKey: 'userPositionId', as: 'position' });
