import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '@/utils/response';

/**
 * @summary
 * Global error handling middleware for Express application
 *
 * @function errorMiddleware
 * @module middleware/error
 *
 * @param {Error} error - Error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 *
 * @returns {void}
 */
export function errorMiddleware(error: any, req: Request, res: Response, next: NextFunction): void {
  console.error('Error:', error);

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.status(statusCode).json(
    errorResponse(message, {
      code: error.code || 'INTERNAL_ERROR',
      path: req.path,
      method: req.method,
    })
  );
}
