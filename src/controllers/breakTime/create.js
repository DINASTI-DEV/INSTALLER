"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBreakTime = void 0;
const http_status_codes_1 = require("http-status-codes");
const dayjs_1 = __importDefault(require("dayjs"));
const customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
const response_1 = require("../../utilities/response");
const breakTimeModel_1 = require("../../models/breakTimeModel");
const requestHandler_1 = require("../../utilities/requestHandler");
const breakTimeSchema_1 = require("../../schemas/breakTimeSchema");
const officeModel_1 = require("../../models/officeModel");
const scheduleModel_1 = require("../../models/scheduleModel");
const logs_1 = __importDefault(require("../../../logs"));
dayjs_1.default.extend(customParseFormat_1.default);
/** Hitung durasi dalam menit dari start (HH:mm) ke end (HH:mm) */
const durationMinutes = (start, end) => {
    const s = (0, dayjs_1.default)(start, 'HH:mm', true);
    const e = (0, dayjs_1.default)(end, 'HH:mm', true);
    if (!s.isValid() || !e.isValid())
        return 0;
    return e.diff(s, 'minute');
};
const createBreakTime = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(breakTimeSchema_1.createBreakTimeSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const office = await officeModel_1.OfficeModel.findOne({
            where: {
                deleted: 0,
                officeCompanyId: req?.membershipPayload?.membershipCompanyId,
                officeId: validatedData.breakTimeOfficeId
            }
        });
        if (office == null) {
            const message = `Office not found with ID: ${validatedData.breakTimeOfficeId}`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        const schedules = await scheduleModel_1.ScheduleModel.findAll({
            where: {
                deleted: 0,
                scheduleCompanyId: req?.membershipPayload?.membershipCompanyId,
                scheduleOfficeId: validatedData.breakTimeOfficeId
            },
            attributes: [
                'scheduleId',
                'scheduleStart',
                'scheduleEnd',
                'scheduleBreakStart',
                'scheduleBreakEnd',
                'scheduleCategory'
            ]
        });
        const companyId = req?.membershipPayload?.membershipCompanyId;
        if (!schedules?.length) {
            const message = 'Tidak ada jadwal kerja (schedule) untuk office ini.';
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error({ message }));
        }
        // Break time hanya boleh dibuat untuk hari ini dan hanya berlaku hari ini
        // Semua waktu (breakTimeStart, breakTimeEnd, breakTimeDuration) di-set dari server
        const breakTimeDate = (0, dayjs_1.default)().format('YYYY-MM-DD');
        const firstRegularSchedule = schedules.find((s) => s.scheduleCategory === 'regular' && s.scheduleStart && s.scheduleEnd);
        const breakTimeScheduleId = firstRegularSchedule?.scheduleId;
        // Pastikan hanya ada satu break time per hari per office.
        // Jika sudah ada data di hari ini untuk office tersebut, lakukan update, bukan create baru.
        const existingBreakTime = await breakTimeModel_1.BreakTimeModel.findOne({
            where: {
                deleted: 0,
                breakTimeCompanyId: companyId,
                breakTimeOfficeId: validatedData.breakTimeOfficeId,
                breakTimeDate,
                breakTimeCategory: 'start'
            }
        });
        if (existingBreakTime != null) {
            const breakTimeEndServer = (0, dayjs_1.default)().format('HH:mm');
            const breakTimeDurationServer = durationMinutes(existingBreakTime.breakTimeStart, breakTimeEndServer);
            await existingBreakTime.update({
                breakTimeCategory: 'end',
                breakTimeEnd: breakTimeEndServer,
                breakTimeDuration: breakTimeDurationServer,
                ...(breakTimeScheduleId != null && { breakTimeScheduleId }),
                breakTimeDate
            });
            const response = response_1.ResponseData.success({
                message: 'Break time updated successfully'
            });
            logs_1.default.info('Break time updated successfully');
            return res.status(http_status_codes_1.StatusCodes.OK).json(response);
        }
        else {
            const breakTimeStartServer = (0, dayjs_1.default)().format('HH:mm');
            const breakTimeEndServer = (0, dayjs_1.default)().format('HH:mm');
            const breakTimeDurationServer = 0;
            const createData = {
                breakTimeCompanyId: companyId,
                breakTimeOfficeId: validatedData.breakTimeOfficeId,
                breakTimeDate: breakTimeDate,
                breakTimeScheduleId: breakTimeScheduleId,
                breakTimeStart: breakTimeStartServer,
                breakTimeEnd: breakTimeEndServer,
                breakTimeDuration: breakTimeDurationServer,
                breakTimeCategory: 'start'
            };
            await breakTimeModel_1.BreakTimeModel.create(createData);
            const response = response_1.ResponseData.success({
                message: 'Break time created successfully'
            });
            logs_1.default.info('Break time created successfully');
            return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
        }
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.createBreakTime = createBreakTime;
