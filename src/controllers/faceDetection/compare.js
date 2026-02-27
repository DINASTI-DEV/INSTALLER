"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareFace = void 0;
const http_status_codes_1 = require("http-status-codes");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const rekognition = new aws_sdk_1.default.Rekognition();
const s3 = new aws_sdk_1.default.S3();
const COLLECTION_ID = 'employee_faces';
const BUCKET_NAME = 'employee-fresh-face';
const compareFace = async (req, res) => {
    if (!req.file) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json(response_1.ResponseData.error({ message: 'Image is required' }));
    }
    try {
        /**
         * 1️⃣ Upload image ke S3
         */
        const imageUrl = await s3
            .upload({
            Bucket: BUCKET_NAME,
            Key: `attendance/${req.body.userId}/${Date.now()}.jpg`,
            Body: req.file.buffer,
            ContentType: 'image/jpeg'
        })
            .promise();
        /**
         * 2️⃣ Compare face
         */
        const result = await rekognition
            .searchFacesByImage({
            CollectionId: COLLECTION_ID,
            Image: { Bytes: req.file.buffer },
            FaceMatchThreshold: 90,
            MaxFaces: 1
        })
            .promise();
        if (!result.FaceMatches || result.FaceMatches.length === 0) {
            return res.status(http_status_codes_1.StatusCodes.OK).json(response_1.ResponseData.success({
                message: 'Face not recognized',
                data: { imageUrl: imageUrl.Location }
            }));
        }
        const matchedFace = result.FaceMatches[0];
        if (Number(matchedFace.Face?.ExternalImageId) !== req.body?.userId) {
            return res.status(http_status_codes_1.StatusCodes.OK).json(response_1.ResponseData.success({
                message: 'Face not match',
                data: { imageUrl: imageUrl.Location }
            }));
        }
        console.log({
            userId: matchedFace.Face?.ExternalImageId,
            similarity: matchedFace.Similarity,
            imageUrl: imageUrl.Location
        });
        /**
         * 3️⃣ SUCCESS RESPONSE
         */
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_1.ResponseData.success({
            data: {
                userId: matchedFace.Face?.ExternalImageId,
                similarity: matchedFace.Similarity,
                imageUrl: imageUrl.Location
            }
        }));
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.compareFace = compareFace;
