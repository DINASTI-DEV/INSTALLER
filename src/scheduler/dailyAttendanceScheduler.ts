import cron from 'node-cron'
import { RecapDailyAttendanceService } from '../services/dailyAttendanceService'
import logger from '../logs'

// // setiap 1 menit
// export const startDailyAttendanceScheduler = (): void => {
//   cron.schedule('* * * * *', async () => {
//     logger.info('[CRON] Running daily attendance recap...')
//     await RecapDailyAttendanceService()
//   })
// }

cron.schedule(
  '0 0 * * *',
  async () => {
    logger.info('[CRON] Running daily attendance recap (WIB)...')
    await RecapDailyAttendanceService()
  },
  {
    timezone: 'Asia/Jakarta'
  }
)
