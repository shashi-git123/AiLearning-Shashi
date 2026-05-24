/**
 * Logger Utility
 * Provides structured logging with different log levels
 */

import testConfig from '@config/testConfig';

/**
 * Log levels with numeric values for comparison
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

/**
 * Logger class for structured logging
 */
export class Logger {
  private context: string;
  private currentLogLevel: LogLevel;

  constructor(context: string) {
    this.context = context;

    const configLevel = testConfig.environment.logLevel;
    this.currentLogLevel = LogLevel[configLevel.toUpperCase() as keyof typeof LogLevel] || LogLevel.INFO;
  }

  /**
   * Format log message with timestamp and context
   */
  private formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] [${this.context}] ${message}`;
  }

  /**
   * Debug level logging
   */
  debug(message: string): void {
    if (this.currentLogLevel <= LogLevel.DEBUG) {
      console.log(this.formatMessage('DEBUG', message));
    }
  }

  /**
   * Info level logging
   */
  info(message: string): void {
    if (this.currentLogLevel <= LogLevel.INFO) {
      console.log(this.formatMessage('INFO', message));
    }
  }

  /**
   * Warning level logging
   */
  warn(message: string): void {
    if (this.currentLogLevel <= LogLevel.WARN) {
      console.warn(this.formatMessage('WARN', message));
    }
  }

  /**
   * Error level logging
   */
  error(message: string, error?: Error): void {
    if (this.currentLogLevel <= LogLevel.ERROR) {
      console.error(this.formatMessage('ERROR', message));
      if (error) {
        console.error(`Stack trace: ${error.stack}`);
      }
    }
  }
}
