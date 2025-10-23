import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { getQuizResult } from '@/services/quiz';
import { successResponse, errorResponse } from '@/utils/response';

const paramsSchema = z.object({
  sessionId: z.string().uuid(),
});

/**
 * @api {get} /external/quiz/:sessionId/result Get Quiz Result
 * @apiName GetQuizResult
 * @apiGroup Quiz
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets the final results of a completed quiz session
 *
 * @apiParam {String} sessionId Session identifier (UUID)
 *
 * @apiSuccess {String} sessionId Session identifier
 * @apiSuccess {Number} totalScore Total score (0-100)
 * @apiSuccess {Number} correctAnswers Number of correct answers (0-10)
 * @apiSuccess {Number} completionTime Total time in seconds
 * @apiSuccess {String} performanceMessage Performance feedback message
 * @apiSuccess {Date} endTime Completion timestamp
 *
 * @apiError {String} NotFoundError Session not found
 * @apiError {String} BusinessRuleError Quiz not completed yet
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = paramsSchema.parse(req.params);

    const result = await getQuizResult(validated.sessionId);

    res.json(successResponse(result));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('Validation failed', error.errors));
    } else if (error.message === 'Session not found') {
      res.status(404).json(errorResponse(error.message));
    } else if (error.message === 'Quiz not completed yet') {
      res.status(400).json(errorResponse(error.message));
    } else {
      next(error);
    }
  }
}
