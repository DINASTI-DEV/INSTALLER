"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.membershipControllers = void 0;
const findAll_1 = require("./findAll");
const invite_1 = require("./invite");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.membershipControllers = {
    findAll: findAll_1.findAllMembership,
    invite: invite_1.inviteMembership,
    update: update_1.updateMembership,
    remove: remove_1.removeMembership
};
