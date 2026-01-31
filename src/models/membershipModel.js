"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipModel = void 0;
const sequelize_1 = require("sequelize");
const baseModelFields_1 = require("../database/baseModelFields");
const config_1 = require("../database/config");
const userModel_1 = require("./userModel");
const officeModel_1 = require("./officeModel");
exports.MembershipModel = config_1.sequelize.define('Memberships', {
    ...baseModelFields_1.BaseModelFields,
    membershipId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    membershipUserId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    membershipCompanyId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    membershipRole: {
        type: sequelize_1.DataTypes.ENUM('company', 'employee'),
        allowNull: true
    },
    membershipStatus: {
        type: sequelize_1.DataTypes.ENUM('active', 'deactivate', 'pending', 'rejected'),
        allowNull: true,
        defaultValue: 'active'
    },
    membershipOfficeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'memberships',
    timestamps: false,
    underscored: true,
    freezeTableName: true
});
exports.MembershipModel.belongsTo(userModel_1.UserModel, { foreignKey: 'membershipUserId', as: 'employee' });
userModel_1.UserModel.hasOne(exports.MembershipModel, { foreignKey: 'membershipUserId', as: 'memberships' });
exports.MembershipModel.belongsTo(officeModel_1.OfficeModel, {
    foreignKey: 'membershipOfficeId',
    as: 'office'
});
officeModel_1.OfficeModel.hasMany(exports.MembershipModel, {
    foreignKey: 'membershipOfficeId',
    as: 'memberships'
});
