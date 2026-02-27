"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFace = void 0;
const http_status_codes_1 = require("http-status-codes");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const userModel_1 = require("../../models/userModel");
const rekognition = new aws_sdk_1.default.Rekognition();
const COLLECTION_ID = 'employee_faces';
const registerFace = async (req, res) => {
    if (!req.file) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json(response_1.ResponseData.error({ message: 'Image is required' }));
    }
    try {
        const user = await userModel_1.UserModel.findOne({
            where: {
                deleted: 0,
                userId: req.body?.userId
            }
        });
        if (user == null) {
            const message = 'user not found!';
            const response = response_1.ResponseData.error({ message });
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        const result = await rekognition
            .indexFaces({
            CollectionId: COLLECTION_ID,
            Image: { Bytes: req.file.buffer },
            ExternalImageId: req.body?.userId?.toString() || ''
        })
            .promise();
        const faceId = result.FaceRecords?.[0]?.Face?.FaceId;
        if (!faceId) {
            const message = 'face ID not found!';
            const response = response_1.ResponseData.error({ message });
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        user.userFaceId = faceId;
        void user.save();
        const response = response_1.ResponseData.success({
            data: { faceId }
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.registerFace = registerFace;
