/**
 * Retry Utility
 * Implements exponential backoff retry logic for transient failures
 */

import { Logger } from './logger';

const logger = new Logger('RetryUtil');

/**
 * Retry a function with exponential backoff
 * @param fn Function to retry
 * @param maxAttempts Maximum number of attempts
 * @param initialDelayMs Initial delay between retries in milliseconds
 * @returns Result of successful function call
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  initialDelayMs: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      logger.debug(`Attempt ${attempt}/${maxAttempts}`);
      return await fn();
    } catch (error: any) {
      lastError = error;

      // Don't retry on client errors (4xx)
      if (error.response?.status >= 400 && error.response?.status < 500) {
        logger.debug(`Not retrying on client error: ${error.response.status}`);
        throw error;
      }

      if (attempt < maxAttempts) {
        const delayMs = initialDelayMs * Math.pow(2, attempt - 1); // Exponential backoff
        logger.warn(
          `Attempt ${attempt} failed: ${error.message}. Retrying in ${delayMs}ms...`
        );
        await sleep(delayMs);
      } else {
        logger.error(`All ${maxAttempts} attempts failed`);
      }
    }
  }

  throw lastError || new Error('Retry failed: Unknown error');
}

/**
 * Sleep helper for delay between retries
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry with custom backoff strategy
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number;
    initialDelayMs?: number;
    backoffMultiplier?: number;
    maxDelayMs?: number;
  } = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    initialDelayMs = 1000,
    backoffMultiplier = 2,
    maxDelayMs = 30000,
  } = options;

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;

      if (attempt < maxAttempts) {
        let delayMs = initialDelayMs * Math.pow(backoffMultiplier, attempt - 1);
        delayMs = Math.min(delayMs, maxDelayMs); // Cap max delay
        logger.warn(`Attempt ${attempt} failed. Retrying in ${delayMs}ms...`);
        await sleep(delayMs);
      }
    }
  }

  throw lastError || new Error('Retry failed');
}
