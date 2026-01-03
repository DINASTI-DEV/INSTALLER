"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceRecognitionController = void 0;
const compare_1 = require("./compare");
const getFaceId_1 = require("./getFaceId");
const register_1 = require("./register");
exports.FaceRecognitionController = {
    getFaceId: getFaceId_1.getFaceId,
    registerFace: register_1.registerFace,
    compareFace: compare_1.compareFace
};
