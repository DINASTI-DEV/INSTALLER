"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueInviteCode = generateUniqueInviteCode;
const companyModel_1 = require("../../../models/companyModel");
function generateRandomCode(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}
async function generateUniqueInviteCode(length = 6) {
    let code = '';
    let exists = true;
    while (exists) {
        code = generateRandomCode(length);
        const existingCompany = await companyModel_1.CompanyModel.findOne({
            where: { companyInviteCode: code }
        });
        exists = !!existingCompany;
    }
    return code;
}
