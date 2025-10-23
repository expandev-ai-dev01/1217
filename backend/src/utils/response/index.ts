/**
 * @summary
 * Standard success response format
 *
 * @function successResponse
 * @module utils/response
 *
 * @param {T} data - Response data
 * @param {object} [metadata] - Optional metadata
 *
 * @returns {SuccessResponse<T>} Formatted success response
 *
 * @example
 * const response = successResponse({ id: 1, name: 'Quiz' });
 */
export function successResponse<T>(
  data: T,
  metadata?: {
    page?: number;
    pageSize?: number;
    total?: number;
    [key: string]: any;
  }
): SuccessResponse<T> {
  return {
    success: true,
    data,
    metadata: {
      ...metadata,
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * @summary
 * Standard error response format
 *
 * @function errorResponse
 * @module utils/response
 *
 * @param {string} message - Error message
 * @param {object} [details] - Optional error details
 *
 * @returns {ErrorResponse} Formatted error response
 *
 * @example
 * const response = errorResponse('Validation failed', { field: 'email' });
 */
export function errorResponse(message: string, details?: any): ErrorResponse {
  return {
    success: false,
    error: {
      message,
      details,
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * @interface SuccessResponse
 * @description Standard success response structure
 *
 * @property {true} success - Success flag
 * @property {T} data - Response data
 * @property {object} [metadata] - Optional metadata
 */
export interface SuccessResponse<T> {
  success: true;
  data: T;
  metadata?: {
    page?: number;
    pageSize?: number;
    total?: number;
    timestamp: string;
    [key: string]: any;
  };
}

/**
 * @interface ErrorResponse
 * @description Standard error response structure
 *
 * @property {false} success - Success flag
 * @property {object} error - Error details
 */
export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    details?: any;
    timestamp: string;
  };
}
