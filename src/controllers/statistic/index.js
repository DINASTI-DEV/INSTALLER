"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statisticController = void 0;
const productivities_1 = require("./productivities");
const total_1 = require("./total");
exports.statisticController = {
    findTotal: total_1.findTotal,
    productivities: productivities_1.productivities
};
