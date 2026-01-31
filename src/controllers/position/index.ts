import { assignUserPosition } from './assign'
import { createPosition } from './create'
import { findAllPosition } from './findAll'
import { findDetailPosition } from './findDetail'
import { removePosition } from './remove'
import { updatePosition } from './update'

export const positionControllers = {
  findAll: findAllPosition,
  findDetail: findDetailPosition,
  create: createPosition,
  remove: removePosition,
  update: updatePosition,
  assign: assignUserPosition
}
