import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { submitAnswer } from '@/services/quiz';
import { successResponse, errorResponse } from '@/utils/response';

const bodySchema = z.object({
  sessionId: z.string().uuid(),
  questionId: z.string().uuid(),
  selectedOptionId: z.string(),
  responseTime: z.number().int().positive(),
});

/**
 * @api {post} /external/quiz/answer Submit Answer
 * @apiName SubmitAnswer
 * @apiGroup Quiz
 * @apiVersion 1.0.0
 *
 * @apiDescription Submits an answer to a quiz question
 *
 * @apiParam {String} sessionId Session identifier (UUID)
 * @apiParam {String} questionId Question identifier (UUID)
 * @apiParam {String} selectedOptionId Selected option identifier
 * @apiParam {Number} responseTime Time taken to answer (seconds)
 *
 * @apiSuccess {String} questionId Question identifier
 * @apiSuccess {String} selectedOptionId Selected option identifier
 * @apiSuccess {Boolean} isCorrect Whether answer is correct
 * @apiSuccess {Number} responseTime Response time in seconds
 * @apiSuccess {Number} pointsEarned Points earned (10 or 0)
 *
 * @apiError {String} ValidationError Invalid parameters
 * @apiError {String} NotFoundError Session not found
 * @apiError {String} BusinessRuleError Quiz already completed or invalid question
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = bodySchema.parse(req.body);

    const answer = await submitAnswer(validated);

    res.json(successResponse(answer));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('Validation failed', error.errors));
    } else if (error.message === 'Session not found') {
      res.status(404).json(errorResponse(error.message));
    } else if (
      error.message === 'Quiz already completed' ||
      error.message === 'Invalid question for current session state'
    ) {
      res.status(400).json(errorResponse(error.message));
    } else {
      next(error);
    }
  }
}
