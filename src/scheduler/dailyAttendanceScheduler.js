"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const dailyAttendanceService_1 = require("../services/dailyAttendanceService");
const logs_1 = __importDefault(require("../logs"));
// // setiap jam 00:00
// export const startDailyAttendanceScheduler = (): void => {
//   cron.schedule('0 0 * * *', async () => {
//     logger.info('[CRON] Running daily attendance recap...')
//     await RecapDailyAttendanceService()
//   })
// }
node_cron_1.default.schedule('0 0 * * *', async () => {
    logs_1.default.info('[CRON] Running daily attendance recap (WIB)...');
    await (0, dailyAttendanceService_1.RecapDailyAttendanceService)();
}, {
    timezone: 'Asia/Jakarta'
});
