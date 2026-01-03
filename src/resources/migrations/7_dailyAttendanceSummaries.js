/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { BaseModelFields } = require('../baseModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('daily_attendance_summaries', {
      ...BaseModelFields,
      summary_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      summary_company_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      summary_user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      summary_schedule_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      summary_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      checkin_time: {
        type: DataTypes.DATE,
        allowNull: true
      },
      break_time: {
        type: DataTypes.DATE,
        allowNull: true
      },
      checkout_time: {
        type: DataTypes.DATE,
        allowNull: true
      },
      is_valid_attendance: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      daily_salary: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('daily_attendance_summaries')
  }
}
