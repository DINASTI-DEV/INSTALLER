import Joi from 'joi'
import { jwtPayloadSchema } from './jwtPayloadSchema'

export const createPositionSchema = Joi.object({
  positionName: Joi.string().trim().min(2).max(100).required().messages({
    'string.base': 'positionName harus berupa string',
    'string.empty': 'positionName tidak boleh kosong',
    'string.min': 'positionName minimal 2 karakter',
    'string.max': 'positionName maksimal 100 karakter',
    'any.required': 'positionName wajib diisi'
  }),

  positionDailySalary: Joi.number().precision(2).positive().required().messages({
    'number.base': 'position harus berupa angka',
    'number.positive': 'position harus lebih dari 0',
    'any.required': 'position wajib diisi'
  })
})

export const updatePositionchema = Joi.object({
  jwtPayload: jwtPayloadSchema,

  positionId: Joi.number().precision(2).positive().required().messages({
    'number.base': 'positionId harus berupa angka',
    'number.positive': 'positionId harus lebih dari 0',
    'any.required': 'positionId wajib diisi'
  }),

  positionName: Joi.string().trim().min(2).max(100).required().messages({
    'string.base': 'positionName harus berupa string',
    'string.empty': 'positionName tidak boleh kosong',
    'string.min': 'positionName minimal 2 karakter',
    'string.max': 'positionName maksimal 100 karakter',
    'any.required': 'positionName wajib diisi'
  }),

  positionDailySalary: Joi.number().precision(2).positive().required().messages({
    'number.base': 'dailySalary harus berupa angka',
    'number.positive': 'dailySalary harus lebih dari 0',
    'any.required': 'dailySalary wajib diisi'
  })
})

export const removePositionSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  positionId: Joi.number().integer().positive().required()
})

export const findDetailPositionSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  positionId: Joi.number().integer().positive().required()
})

export const findAllPositionSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional()
})

export const assignPositionSchema = Joi.object({
  positionId: Joi.number().integer().positive().required(),
  userIds: Joi.array().items(Joi.number().integer().positive()).min(1).required()
})
