"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOffice = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const officeSchema_1 = require("../../schemas/officeSchema");
const requestHandler_1 = require("../../utilities/requestHandler");
const officeModel_1 = require("../../models/officeModel");
const logs_1 = __importDefault(require("../../../logs"));
const config_1 = require("../../database/config");
const scheduleModel_1 = require("../../models/scheduleModel");
const createOffice = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(officeSchema_1.createOfficeSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    const transaction = await config_1.sequelize.transaction();
    try {
        const companyId = req?.membershipPayload?.membershipCompanyId;
        validatedData.officeCompanyId = companyId;
        const currentOfficeCount = await officeModel_1.OfficeModel.count({
            where: {
                deleted: 0,
                officeCompanyId: companyId
            },
            transaction
        });
        const createdOffice = await officeModel_1.OfficeModel.create(validatedData, { transaction });
        const schedules = [
            {
                scheduleCompanyId: companyId,
                scheduleOfficeId: createdOffice.officeId,
                scheduleName: 'Minggu',
                scheduleStart: '09:00',
                scheduleEnd: '17:00',
                scheduleBreakStart: '12:00',
                scheduleBreakEnd: '13:00',
                scheduleCategory: 'libur',
                scheduleOrder: 0
            },
            {
                scheduleCompanyId: companyId,
                scheduleOfficeId: createdOffice.officeId,
                scheduleName: 'Senin',
                scheduleStart: '09:00',
                scheduleEnd: '17:00',
                scheduleBreakStart: '12:00',
                scheduleBreakEnd: '13:00',
                scheduleCategory: 'regular',
                scheduleOrder: 1
            },
            {
                scheduleCompanyId: companyId,
                scheduleOfficeId: createdOffice.officeId,
                scheduleName: 'Selasa',
                scheduleStart: '09:00',
                scheduleEnd: '17:00',
                scheduleBreakStart: '12:00',
                scheduleBreakEnd: '13:00',
                scheduleCategory: 'regular',
                scheduleOrder: 2
            },
            {
                scheduleCompanyId: companyId,
                scheduleOfficeId: createdOffice.officeId,
                scheduleName: 'Rabu',
                scheduleStart: '09:00',
                scheduleEnd: '17:00',
                scheduleBreakStart: '12:00',
                scheduleBreakEnd: '13:00',
                scheduleCategory: 'regular',
                scheduleOrder: 3
            },
            {
                scheduleCompanyId: companyId,
                scheduleOfficeId: createdOffice.officeId,
                scheduleName: 'Kamis',
                scheduleStart: '09:00',
                scheduleEnd: '17:00',
                scheduleBreakStart: '12:00',
                scheduleBreakEnd: '13:00',
                scheduleCategory: 'regular',
                scheduleOrder: 4
            },
            {
                scheduleCompanyId: companyId,
                scheduleOfficeId: createdOffice.officeId,
                scheduleName: 'Jumat',
                scheduleStart: '09:00',
                scheduleEnd: '17:00',
                scheduleBreakStart: '12:00',
                scheduleBreakEnd: '13:00',
                scheduleCategory: 'regular',
                scheduleOrder: 5
            },
            {
                scheduleCompanyId: companyId,
                scheduleOfficeId: createdOffice.officeId,
                scheduleName: 'Sabtu',
                scheduleStart: '09:00',
                scheduleEnd: '17:00',
                scheduleBreakStart: '12:00',
                scheduleBreakEnd: '13:00',
                scheduleCategory: 'libur',
                scheduleOrder: 6
            }
        ];
        await scheduleModel_1.ScheduleModel.bulkCreate(schedules, { transaction });
        await transaction.commit();
        const response = response_1.ResponseData.success({});
        logs_1.default.info('Office created successfully');
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (serverError) {
        await transaction.rollback();
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.createOffice = createOffice;
