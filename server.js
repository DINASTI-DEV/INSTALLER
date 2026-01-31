"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const configs_1 = require("./src/configs");
const logs_1 = __importDefault(require("./src/logs"));
const PORT = configs_1.appConfigs.app.port;
const server = app_1.default.listen(PORT, () => {
  logs_1.default.info(`Server running on http://localhost:${PORT}`);
});
process.on("SIGTERM", () => {
  logs_1.default.info("SIGTERM received. Shutting down gracefully.");
  server.close(() => {
    logs_1.default.info("HTTP server closed.");
  });
});
process.on("uncaughtException", (err) => {
  logs_1.default.error("Uncaught Exception:", err);
  process.exit(1);
});
process.on("unhandledRejection", (reason) => {
  logs_1.default.error("Unhandled Rejection:", reason);
});
