"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const _1 = require(".");
aws_sdk_1.default.config.update({
    region: _1.appConfigs.aws.region,
    accessKeyId: _1.appConfigs.aws.accessKeyId,
    secretAccessKey: _1.appConfigs.aws.secretAccessKey
});
