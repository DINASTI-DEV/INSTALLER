"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myProfileController = void 0;
const find_1 = require("./find");
const onboarding_1 = require("./onboarding");
const update_1 = require("./update");
exports.myProfileController = {
    find: find_1.findMyProfile,
    update: update_1.updateMyProfile,
    updateOnboardingStatus: onboarding_1.updateOnboardingStatus
};
