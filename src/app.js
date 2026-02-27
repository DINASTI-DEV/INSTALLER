"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const main_routes_1 = require("./routes/main.routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./configs/swagger"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const configs_1 = require("./configs");
const requestHandler_1 = require("./utilities/requestHandler");
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("./utilities/response");
const middlewares_1 = require("./middlewares");
require("../src/scheduler/dailyAttendanceScheduler");
const logs_1 = __importDefault(require("../logs"));
const app = (0, express_1.default)();
app.use(middlewares_1.middleware.requestTimer);
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: configs_1.appConfigs.cors.origin?.toString().split(',') ?? ['http://localhost:5173'],
    credentials: true
}));
app.use(body_parser_1.default.urlencoded({ limit: '10mb', extended: true }));
app.use(body_parser_1.default.json({ limit: '10mb' }));
app.use((0, cookie_parser_1.default)());
app.use((0, compression_1.default)());
// const limiter = rateLimit({
//   windowMs: parseInt(appConfigs.rateLimit.windowMinutes ?? '15') * 60 * 1000,
//   max: parseInt(appConfigs.rateLimit.maxRequest ?? '100')
// })
// app.use(limiter)
// Trust proxy (for production with nginx/proxy)
app.set('trust proxy', 1);
app.use((0, morgan_1.default)('combined', {
    stream: {
        write: (message) => logs_1.default.info(message.trim())
    }
}));
app.use('/api/v1/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
(0, main_routes_1.appRouterV1)(app);
app.use((req, res) => {
    const message = `Route not found!`;
    logs_1.default.warn(message);
    const response = response_1.ResponseData.error({ message });
    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
});
app.use((serverError, req, res, _next) => {
    logs_1.default.error(serverError.stack);
    return (0, requestHandler_1.handleServerError)(res, serverError);
});
exports.default = app;
