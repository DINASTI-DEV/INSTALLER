"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModelFields = void 0;
const sequelize_1 = require("sequelize");
exports.BaseModelFields = {
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.Sequelize.fn('now')
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
};
