import { Request, Response } from 'express';
import { errorResponse } from '@/utils/response';

/**
 * @summary
 * Middleware to handle 404 Not Found errors
 *
 * @function notFoundMiddleware
 * @module middleware/notFound
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 *
 * @returns {void}
 */
export function notFoundMiddleware(req: Request, res: Response): void {
  res.status(404).json(
    errorResponse('Route not found', {
      code: 'NOT_FOUND',
      path: req.path,
      method: req.method,
    })
  );
}
