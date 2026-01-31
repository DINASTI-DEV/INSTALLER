"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestTimer = void 0;
const requestTimer = (req, res, next) => {
    const startHrTime = process.hrtime();
    res.on('finish', () => {
        const [seconds, nanoseconds] = process.hrtime(startHrTime);
        const executionTime = (seconds * 1000 + nanoseconds / 1e6).toFixed(2) + 'ms';
        res.locals.executionTime = executionTime;
    });
    next();
};
exports.requestTimer = requestTimer;
