"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const _1 = require(".");
const redis = new ioredis_1.default({
    host: _1.appConfigs.redis.host || '127.0.0.1',
    port: Number(_1.appConfigs.redis.port) || 6379
});
redis.on('connect', () => console.log('✅ Connected to Redis'));
redis.on('error', (err) => console.error('❌ Redis Error:', err));
exports.default = redis;
