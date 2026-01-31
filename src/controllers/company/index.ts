import { findAllCompany } from './findAll'
import { findDetailCompany } from './findDetail'
import { updateCompany } from './update'

export const companyControllers = {
  findAll: findAllCompany,
  findDetail: findDetailCompany,
  update: updateCompany
}
