import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { getQuestionSummary } from '@/services/quiz';
import { successResponse, errorResponse } from '@/utils/response';

const paramsSchema = z.object({
  sessionId: z.string().uuid(),
});

/**
 * @api {get} /external/quiz/:sessionId/summary Get Question Summary
 * @apiName GetQuestionSummary
 * @apiGroup Quiz
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets detailed feedback for all questions in a completed quiz
 *
 * @apiParam {String} sessionId Session identifier (UUID)
 *
 * @apiSuccess {Array} questions Array of question summaries
 * @apiSuccess {String} questions.questionText Question text
 * @apiSuccess {String} questions.selectedOption User's selected option
 * @apiSuccess {String} questions.correctOption Correct option
 * @apiSuccess {Boolean} questions.isCorrect Whether user answered correctly
 * @apiSuccess {String} [questions.explanation] Optional explanation
 *
 * @apiError {String} NotFoundError Session not found
 * @apiError {String} BusinessRuleError Quiz not completed yet
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = paramsSchema.parse(req.params);

    const summary = await getQuestionSummary(validated.sessionId);

    res.json(successResponse(summary));
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
