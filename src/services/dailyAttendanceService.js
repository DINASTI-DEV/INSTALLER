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
const RecapDailyAttendanceService = async () => {
    // ===============================
    // 1. Tentukan tanggal recap (kemarin)
    // ===============================
    const recapDate = (0, dayjs_1.default)().subtract(1, 'day').format('YYYY-MM-DD');
    const startOfDay = (0, dayjs_1.default)(recapDate).startOf('day').toDate();
    const endOfDay = (0, dayjs_1.default)(recapDate).endOf('day').toDate();
    // ===============================
    // 2. Ambil semua attendance kemarin
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
            grouped[key] = {
                companyId: attendance.attendanceCompanyId,
                userId: attendance.attendanceUserId,
                scheduleId: attendance.attendanceScheduleId,
                schedule: attendance.schedule,
                checkin: null,
                break: null,
                checkout: null,
                dailySalary: attendance.user?.position?.positionDailySalary || 0
            };
        }
        grouped[key][attendance.attendanceCategory] = attendance.attendanceTime;
    }
    // ===============================
    // 4. Validasi & Simpan ke Summary
    // ===============================
    for (const key of Object.keys(grouped)) {
        const data = grouped[key];
        const errors = [];
        const schedule = data.schedule;
        // ⛔ Jika schedule tidak ada
        if (!schedule) {
            errors.push('Schedule tidak ditemukan');
        }
        // ⛔ Validasi kehadiran dasar
        if (!data.checkin)
            errors.push('Tidak melakukan check-in');
        if (!data.break)
            errors.push('Tidak melakukan break');
        if (!data.checkout)
            errors.push('Tidak melakukan checkout');
        // ===============================
        // 5. Validasi waktu (jika data lengkap)
        // ===============================
        if (schedule && data.checkin && data.break && data.checkout) {
            const checkinTime = (0, dayjs_1.default)(data.checkin);
            const breakTime = (0, dayjs_1.default)(data.break);
            const checkoutTime = (0, dayjs_1.default)(data.checkout);
            const scheduleStart = (0, dayjs_1.default)(`${recapDate} ${schedule.scheduleStart}`);
            const scheduleEnd = (0, dayjs_1.default)(`${recapDate} ${schedule.scheduleEnd}`);
            const breakStart = (0, dayjs_1.default)(`${recapDate} ${schedule.scheduleBreakStart}`);
            const breakEnd = (0, dayjs_1.default)(`${recapDate} ${schedule.scheduleBreakEnd}`);
            if (checkinTime.isAfter(scheduleStart)) {
                errors.push('Check-in melewati jam masuk');
            }
            if (breakTime.isBefore(breakStart) || breakTime.isAfter(breakEnd)) {
                errors.push('Waktu break di luar jadwal');
            }
            if (checkoutTime.isBefore(scheduleEnd)) {
                errors.push('Checkout lebih awal dari jam pulang');
            }
        }
        const isValidAttendance = errors.length === 0;
        // ===============================
        // 6. Simpan summary (idempotent-safe)
        // ===============================
        await dailyAttendanceSummaryModel_1.DailyAttendanceSummaryModel.create({
            summaryCompanyId: data.companyId,
            summaryUserId: data.userId,
            summaryScheduleId: data.scheduleId,
            summaryDate: recapDate,
            checkinTime: data.checkin,
            breakTime: data.break,
            checkoutTime: data.checkout,
            isValidAttendance,
            dailySalary: isValidAttendance ? data.dailySalary : 0,
            description: isValidAttendance ? null : errors.join('; ')
        });
    }
};
exports.RecapDailyAttendanceService = RecapDailyAttendanceService;
