"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerRecapDailyAttendance = void 0;
const http_status_codes_1 = require("http-status-codes");
const dayjs_1 = __importDefault(require("dayjs"));
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const schedulerRunLogModel_1 = require("../../models/schedulerRunLogModel");
const dailyAttendanceService_1 = require("../../services/dailyAttendanceService");
const logs_1 = __importDefault(require("../../../logs"));
const RECAP_DAILY_ATTENDANCE_JOB = 'RecapDailyAttendance';
/**
 * Jalankan scheduler RecapDailyAttendance secara manual.
 * Hanya diizinkan jika untuk hari itu (tanggal recap = kemarin) status failed atau belum ada run.
 */
const triggerRecapDailyAttendance = async (req, res) => {
    try {
        const recapDate = (0, dayjs_1.default)().subtract(1, 'day').format('YYYY-MM-DD');
        const existingLog = await schedulerRunLogModel_1.SchedulerRunLogModel.findOne({
            where: {
                deleted: 0,
                jobName: RECAP_DAILY_ATTENDANCE_JOB,
                runDate: recapDate
            }
        });
        if (existingLog != null) {
            const status = existingLog.status;
            if (status === 'success') {
                const message = `Recap daily attendance untuk tanggal ${recapDate} sudah berhasil dijalankan. Tidak perlu dijalankan lagi.`;
                logs_1.default.warn(message);
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error({ message }));
            }
            if (status === 'failed' || status === 'pending') {
                await existingLog.destroy();
                logs_1.default.info(`[Trigger] Menghapus log (${status}) untuk ${recapDate}, akan dijalankan ulang.`);
            }
        }
        await (0, dailyAttendanceService_1.RecapDailyAttendanceService)();
        logs_1.default.info(`[Trigger] Recap daily attendance untuk ${recapDate} selesai dijalankan manual.`);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_1.ResponseData.success({
            message: 'Recap daily attendance berhasil dijalankan.',
            data: { recapDate }
        }));
    }
    catch (serverError) {
        logs_1.default.error('[Trigger] Recap daily attendance gagal:', serverError);
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.triggerRecapDailyAttendance = triggerRecapDailyAttendance;
