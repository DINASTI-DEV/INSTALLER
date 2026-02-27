"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecapDailyAttendanceService = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const sequelize_1 = require("sequelize");
const attendanceModel_1 = require("../models/attendanceModel");
const userModel_1 = require("../models/userModel");
const positionModel_1 = require("../models/positionModel");
const dailyAttendanceSummaryModel_1 = require("../models/dailyAttendanceSummaryModel");
const scheduleModel_1 = require("../models/scheduleModel");
const breakTimeModel_1 = require("../models/breakTimeModel");
const schedulerRunLogModel_1 = require("../models/schedulerRunLogModel");
const logs_1 = __importDefault(require("../../logs"));
const RECAP_DAILY_ATTENDANCE_JOB = 'RecapDailyAttendance';
/**
 * Total durasi break (menit) untuk suatu office pada tanggal tertentu.
 * Break time hanya berlaku untuk hari itu (breakTimeDate = date).
 */
const getTotalBreakMinutesForOffice = async (companyId, officeId, date) => {
    const breakTimes = await breakTimeModel_1.BreakTimeModel.findAll({
        where: {
            deleted: 0,
            breakTimeCompanyId: companyId,
            breakTimeOfficeId: officeId,
            breakTimeDate: date
        },
        attributes: ['breakTimeDuration']
    });
    return breakTimes.reduce((sum, row) => sum + Number(row.breakTimeDuration || 0), 0);
};
/**
 * Calculate effective working hours: (checkout - checkin) in hours minus total break time.
 * Returns hours (decimal).
 */
const getEffectiveWorkHours = (checkin, checkout, totalBreakMinutes) => {
    const totalMinutes = (0, dayjs_1.default)(checkout).diff((0, dayjs_1.default)(checkin), 'minute', true);
    const effectiveMinutes = Math.max(0, totalMinutes - totalBreakMinutes);
    return effectiveMinutes / 60;
};
const RecapDailyAttendanceService = async () => {
    // ===============================
    // 1. Tentukan tanggal recap (kemarin)
    // ===============================
    const recapDate = (0, dayjs_1.default)().subtract(1, 'day').format('YYYY-MM-DD');
    // Klaim run untuk tanggal ini (hanya satu proses yang berhasil create; yang lain skip)
    let logRow = null;
    const [row, created] = await schedulerRunLogModel_1.SchedulerRunLogModel.findOrCreate({
        where: {
            jobName: RECAP_DAILY_ATTENDANCE_JOB,
            runDate: recapDate
        },
        defaults: {
            jobName: RECAP_DAILY_ATTENDANCE_JOB,
            runDate: recapDate,
            status: 'pending'
        }
    });
    logRow = row;
    if (!created) {
        logs_1.default.info(`[RecapDailyAttendance] Skip: sudah dijalankan untuk tanggal ${recapDate}. Hanya boleh sekali per hari.`);
        return;
    }
    try {
        const startOfDay = (0, dayjs_1.default)(recapDate).startOf('day').toDate();
        const endOfDay = (0, dayjs_1.default)(recapDate).endOf('day').toDate();
        // ===============================
        // 2. Ambil attendance kemarin
        // ===============================
        const attendances = await attendanceModel_1.AttendanceModel.findAll({
            where: {
                attendanceTime: {
                    [sequelize_1.Op.between]: [startOfDay, endOfDay]
                }
            },
            include: [
                {
                    model: userModel_1.UserModel,
                    as: 'user',
                    include: [{ model: positionModel_1.PositionModel, as: 'position' }]
                },
                {
                    model: scheduleModel_1.ScheduleModel,
                    as: 'schedule'
                }
            ]
        });
        // ===============================
        // 3. Grouping per user + schedule
        // ===============================
        const grouped = {};
        for (const attendance of attendances) {
            const key = `${attendance.attendanceUserId}-${attendance.attendanceScheduleId}`;
            if (!grouped[key]) {
                const hourlySalary = Number(attendance.user?.position?.positionHourlySalary ?? 0);
                grouped[key] = {
                    companyId: attendance.attendanceCompanyId,
                    officeId: attendance.schedule?.scheduleOfficeId ?? null,
                    userId: attendance.attendanceUserId,
                    scheduleId: attendance.attendanceScheduleId,
                    schedule: attendance.schedule,
                    hourlySalary,
                    checkin: null,
                    breakin: null,
                    breakout: null,
                    checkout: null
                };
            }
            grouped[key][attendance.attendanceCategory] = attendance.attendanceTime;
        }
        // ===============================
        // 4. Validasi & hitung dailySalary & Simpan Summary
        // ===============================
        for (const key of Object.keys(grouped)) {
            const data = grouped[key];
            const errors = [];
            const schedule = data.schedule;
            if (!schedule) {
                errors.push('Schedule tidak ditemukan');
            }
            // Validasi dasar
            if (!data.checkin)
                errors.push('Tidak melakukan check-in');
            if (!data.breakin)
                errors.push('Tidak melakukan break-in');
            if (!data.breakout)
                errors.push('Tidak melakukan break-out');
            if (!data.checkout)
                errors.push('Tidak melakukan checkout');
            // ===============================
            // 5. Validasi waktu
            // ===============================
            if (schedule && data.checkin && data.breakin && data.breakout && data.checkout) {
                const checkinTime = (0, dayjs_1.default)(data.checkin);
                const breakinTime = (0, dayjs_1.default)(data.breakin);
                const breakoutTime = (0, dayjs_1.default)(data.breakout);
                const checkoutTime = (0, dayjs_1.default)(data.checkout);
                const scheduleStart = (0, dayjs_1.default)(`${recapDate} ${schedule.scheduleStart ?? '00:00'}`);
                const scheduleEnd = (0, dayjs_1.default)(`${recapDate} ${schedule.scheduleEnd ?? '23:59'}`);
                const breakStart = (0, dayjs_1.default)(`${recapDate} ${schedule.scheduleBreakStart ?? '12:00'}`);
                const breakEnd = (0, dayjs_1.default)(`${recapDate} ${schedule.scheduleBreakEnd ?? '13:00'}`);
                if (checkinTime.isAfter(scheduleStart)) {
                    errors.push(`Check-in melewati jam masuk (${checkinTime.format('HH:mm')})`);
                }
                if (breakinTime.isBefore(breakStart) || breakinTime.isAfter(breakEnd)) {
                    errors.push(`Break-in di luar jam istirahat (${breakinTime.format('HH:mm')})`);
                }
                if (breakoutTime.isBefore(breakStart) || breakoutTime.isAfter(breakEnd)) {
                    errors.push(`Break-out di luar jam istirahat (${breakoutTime.format('HH:mm')})`);
                }
                if (breakoutTime.isBefore(breakinTime)) {
                    errors.push(`Break-out lebih awal dari break-in (${breakoutTime.format('HH:mm')})`);
                }
                if (checkoutTime.isBefore(scheduleEnd)) {
                    errors.push(`Checkout lebih awal dari jam pulang (${checkoutTime.format('HH:mm')})`);
                }
            }
            const isValidAttendance = errors.length === 0;
            // ===============================
            // 6. Hitung total jam kerja & dailySalary
            // ===============================
            let totalWorkHours = 0;
            let dailySalary = 0;
            if (data.checkin && data.checkout) {
                const officeId = data.officeId ?? schedule?.scheduleOfficeId;
                const totalBreakMinutes = officeId != null
                    ? await getTotalBreakMinutesForOffice(data.companyId, officeId, recapDate)
                    : 0;
                if (totalBreakMinutes > 0) {
                    errors.push(`Total waktu jeda: ${totalBreakMinutes} menit`);
                }
                totalWorkHours = getEffectiveWorkHours(data.checkin, data.checkout, totalBreakMinutes);
                if (isValidAttendance && data.hourlySalary > 0) {
                    dailySalary = Number((Number(data.hourlySalary) * totalWorkHours).toFixed(2));
                }
            }
            // ===============================
            // 7. Simpan summary
            // ===============================
            await dailyAttendanceSummaryModel_1.DailyAttendanceSummaryModel.create({
                summaryCompanyId: data.companyId,
                summaryUserId: data.userId,
                summaryScheduleId: data.scheduleId,
                summaryDate: recapDate,
                checkinTime: data.checkin,
                breakTime: data.breakin ?? null,
                checkoutTime: data.checkout,
                isValidAttendance,
                dailySalary,
                totalWorkHours: Number(totalWorkHours.toFixed(2)),
                description: isValidAttendance ? null : errors.join('; ')
            });
        }
        await logRow.update({ status: 'success' });
        logs_1.default.info(`[RecapDailyAttendance] Selesai untuk tanggal ${recapDate}.`);
    }
    catch (err) {
        if (logRow != null) {
            await logRow.update({ status: 'failed' }).catch(() => { });
        }
        logs_1.default.error(`[RecapDailyAttendance] Gagal untuk tanggal ${recapDate}:`, err);
        throw err;
    }
};
exports.RecapDailyAttendanceService = RecapDailyAttendanceService;
