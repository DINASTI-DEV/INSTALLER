import dayjs from 'dayjs'
import { Op } from 'sequelize'
import { AttendanceModel } from '../models/attendanceModel'
import { UserModel } from '../models/userModel'
import { PositionModel } from '../models/positionModel'
import { DailyAttendanceSummaryModel } from '../models/dailyAttendanceSummaryModel'
import { ScheduleModel } from '../models/scheduleModel'

export const RecapDailyAttendanceService = async (): Promise<void> => {
  // ===============================
  // 1. Tentukan tanggal recap (kemarin)
  // ===============================
  const recapDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD')

  const startOfDay = dayjs(recapDate).startOf('day').toDate()
  const endOfDay = dayjs(recapDate).endOf('day').toDate()

  // ===============================
  // 2. Ambil attendance kemarin
  // ===============================
  const attendances = await AttendanceModel.findAll({
    where: {
      attendanceTime: {
        [Op.between]: [startOfDay, endOfDay]
      }
    },
    include: [
      {
        model: UserModel,
        as: 'user',
        include: [{ model: PositionModel, as: 'position' }]
      },
      {
        model: ScheduleModel,
        as: 'schedule'
      }
    ]
  })

  // ===============================
  // 3. Grouping per user + schedule
  // ===============================
  const grouped: Record<string, any> = {}

  for (const attendance of attendances as any[]) {
    const key = `${attendance.attendanceUserId}-${attendance.attendanceScheduleId}`

    if (!grouped[key]) {
      grouped[key] = {
        companyId: attendance.attendanceCompanyId,
        userId: attendance.attendanceUserId,
        scheduleId: attendance.attendanceScheduleId,
        schedule: attendance.schedule,
        checkin: null,
        breakin: null,
        breakout: null,
        checkout: null,
        dailySalary: attendance.user?.position?.positionDailySalary || 0
      }
    }

    grouped[key][attendance.attendanceCategory] = attendance.attendanceTime
  }

  // ===============================
  // 4. Validasi & Simpan Summary
  // ===============================
  for (const key of Object.keys(grouped)) {
    const data = grouped[key]
    const errors: string[] = []
    const schedule = data.schedule

    if (!schedule) {
      errors.push('Schedule tidak ditemukan')
    }

    // Validasi dasar
    if (!data.checkin) errors.push('Tidak melakukan check-in')
    if (!data.breakin) errors.push('Tidak melakukan break-in')
    if (!data.breakout) errors.push('Tidak melakukan break-out')
    if (!data.checkout) errors.push('Tidak melakukan checkout')

    // ===============================
    // 5. Validasi waktu
    // ===============================
    if (schedule && data.checkin && data.breakin && data.breakout && data.checkout) {
      const checkinTime = dayjs(data.checkin)
      const breakinTime = dayjs(data.breakin)
      const breakoutTime = dayjs(data.breakout)
      const checkoutTime = dayjs(data.checkout)

      const scheduleStart = dayjs(`${recapDate} ${schedule.scheduleStart}`)
      const scheduleEnd = dayjs(`${recapDate} ${schedule.scheduleEnd}`)
      const breakStart = dayjs(`${recapDate} ${schedule.scheduleBreakStart}`)
      const breakEnd = dayjs(`${recapDate} ${schedule.scheduleBreakEnd}`)

      if (checkinTime.isAfter(scheduleStart)) {
        errors.push('Check-in melewati jam masuk')
      }

      // ⛔ BREAK HARUS DI DALAM RANGE
      if (breakinTime.isBefore(breakStart) || breakinTime.isAfter(breakEnd)) {
        errors.push('Break-in di luar jam istirahat')
      }

      if (breakoutTime.isBefore(breakStart) || breakoutTime.isAfter(breakEnd)) {
        errors.push('Break-out di luar jam istirahat')
      }

      if (breakoutTime.isBefore(breakinTime)) {
        errors.push('Break-out lebih awal dari break-in')
      }

      if (checkoutTime.isBefore(scheduleEnd)) {
        errors.push('Checkout lebih awal dari jam pulang')
      }
    }

    const isValidAttendance = errors.length === 0

    // ===============================
    // 6. Simpan summary
    // ===============================
    await DailyAttendanceSummaryModel.create({
      summaryCompanyId: data.companyId,
      summaryUserId: data.userId,
      summaryScheduleId: data.scheduleId,
      summaryDate: recapDate,
      checkinTime: data.checkin,
      breakinTime: data.breakin,
      breakoutTime: data.breakout,
      checkoutTime: data.checkout,
      isValidAttendance,
      dailySalary: isValidAttendance ? data.dailySalary : 0,
      description: isValidAttendance ? null : errors.join('; ')
    })
  }
}
