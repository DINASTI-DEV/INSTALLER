"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerRunLogModel = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
const baseModelFields_1 = require("../database/baseModelFields");
exports.SchedulerRunLogModel = config_1.sequelize.define('SchedulerRunLogs', {
    ...baseModelFields_1.BaseModelFields,
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    jobName: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        field: 'job_name',
        comment: 'Nama job scheduler, e.g. RecapDailyAttendance'
    },
    runDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
        field: 'run_date',
        comment: 'Tanggal yang diproses (YYYY-MM-DD). Satu job hanya boleh jalan sekali per run_date.'
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'success', 'failed'),
        allowNull: true,
        defaultValue: 'pending',
        comment: 'Status eksekusi: pending, success, atau failed'
    }
}, {
    tableName: 'scheduler_run_logs',
    timestamps: true,
    underscored: true,
    freezeTableName: true
});
