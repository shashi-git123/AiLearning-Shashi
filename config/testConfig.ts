/**
 * Test Configuration Manager
 * Handles environment-specific settings and validation
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

/**
 * Configuration interface with all test environment settings
 */
export interface TestConfig {
  api: {
    baseUrl: string;
    timeoutMs: number;
    retryAttempts: number;
    retryDelayMs: number;
  };
  environment: {
    nodeEnv: 'test' | 'dev' | 'staging' | 'prod';
    logLevel: 'debug' | 'info' | 'warn' | 'error';
  };
  credentials: {
    testEmail: string;
    testPassword: string;
    invalidEmail: string;
    invalidPassword: string;
  };
  logging: {
    enableRequestLogging: boolean;
    enableResponseLogging: boolean;
  };
}

/**
 * Default configuration with environment overrides
 */
const testConfig: TestConfig = {
  api: {
    baseUrl: process.env.API_BASE_URL || 'https://api.amazon.in',
    timeoutMs: parseInt(process.env.API_TIMEOUT_MS || '10000', 10),
    retryAttempts: parseInt(process.env.API_RETRY_ATTEMPTS || '3', 10),
    retryDelayMs: parseInt(process.env.API_RETRY_DELAY_MS || '1000', 10),
  },
  environment: {
    nodeEnv: (process.env.NODE_ENV as 'test' | 'dev' | 'staging' | 'prod') || 'test',
    logLevel: (process.env.LOG_LEVEL as 'debug' | 'info' | 'warn' | 'error') || 'info',
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

export default testConfig;
