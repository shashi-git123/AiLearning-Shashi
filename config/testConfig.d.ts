/**
 * Test Configuration Manager
 * Handles environment-specific settings and validation
 */
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
declare const testConfig: TestConfig;
export default testConfig;
//# sourceMappingURL=testConfig.d.ts.map