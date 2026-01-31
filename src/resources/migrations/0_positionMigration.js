/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { BaseModelFields } = require('../baseModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('positions', {
      ...BaseModelFields,
      position_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      position_company_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      position_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      position_daily_salary: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        comment: 'Gaji per hari'
      }
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('positions')
  }
}
