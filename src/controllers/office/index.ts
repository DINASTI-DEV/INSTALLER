import { createOffice } from './create'
import { findAllOffice } from './findAll'
import { findAllOfficeLocation } from './findAllOfficeLocation'
import { findAllOfficeName } from './findAllOfficeName'
import { findDetailOffice } from './findDetail'
import { removeOffice } from './remove'
import { updateOffice } from './update'

export const officeControllers = {
  findAll: findAllOffice,
  findAllOfficeName: findAllOfficeName,
  findAllOfficeLocation,
  findDetail: findDetailOffice,
  create: createOffice,
  update: updateOffice,
  remove: removeOffice
}
