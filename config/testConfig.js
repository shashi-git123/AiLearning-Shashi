"use strict";
/**
 * Test Configuration Manager
 * Handles environment-specific settings and validation
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });
/**
 * Default configuration with environment overrides
 */
const testConfig = {
    api: {
        baseUrl: process.env.API_BASE_URL || 'https://api.amazon.in',
        timeoutMs: parseInt(process.env.API_TIMEOUT_MS || '10000', 10),
        retryAttempts: parseInt(process.env.API_RETRY_ATTEMPTS || '3', 10),
        retryDelayMs: parseInt(process.env.API_RETRY_DELAY_MS || '1000', 10),
    },
    environment: {
        nodeEnv: process.env.NODE_ENV || 'test',
        logLevel: process.env.LOG_LEVEL || 'info',
    },
    credentials: {
        testEmail: process.env.TEST_EMAIL || 'test.user@amazon.in',
        testPassword: process.env.TEST_PASSWORD || 'TestPassword123!',
        invalidEmail: process.env.TEST_INVALID_EMAIL || 'invalid@amazon.in',
        invalidPassword: process.env.TEST_INVALID_PASSWORD || 'WrongPassword123!',
    },
    logging: {
        enableRequestLogging: process.env.ENABLE_REQUEST_LOGGING === 'true',
        enableResponseLogging: process.env.ENABLE_RESPONSE_LOGGING === 'true',
    },
};
exports.default = testConfig;
//# sourceMappingURL=testConfig.js.map