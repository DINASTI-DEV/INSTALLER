import { createSchedule } from './create'
import { findAllSchedule } from './findAll'
import { findAllScheduleByOffice } from './findAllScheduleByOffice'
import { findDetailSchedule } from './findDetail'
import { findAllDetailScheduleByOffice } from './findDetailScheduleByOffice'
import { removeSchedule } from './remove'
import { updateSchedule } from './update'

export const scheduleControllers = {
  findAll: findAllSchedule,
  findAllScheduleByOffice,
  findAllDetailScheduleByOffice,
  findOne: findDetailSchedule,
  create: createSchedule,
  update: updateSchedule,
  remove: removeSchedule
}
