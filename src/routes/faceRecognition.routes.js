"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const faceDetection_1 = require("../controllers/faceDetection");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
router.use(middlewares_1.middleware.useAuthorization);
router.use(middlewares_1.middleware.allowMembershipRoles('employee', 'company'));
router.get('/face-id', faceDetection_1.FaceRecognitionController.getFaceId);
router.post('/registers', upload.single('image'), faceDetection_1.FaceRecognitionController.registerFace);
router.post('/compares', upload.single('image'), faceDetection_1.FaceRecognitionController.compareFace);
exports.default = router;
