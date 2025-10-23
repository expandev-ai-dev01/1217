import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { getCurrentQuestion } from '@/services/quiz';
import { successResponse, errorResponse } from '@/utils/response';

const paramsSchema = z.object({
  sessionId: z.string().uuid(),
});

/**
 * @api {get} /external/quiz/:sessionId/question Get Current Question
 * @apiName GetCurrentQuestion
 * @apiGroup Quiz
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets the current question for a quiz session
 *
 * @apiParam {String} sessionId Session identifier (UUID)
 *
 * @apiSuccess {String} questionId Question identifier
 * @apiSuccess {String} questionText Question text
 * @apiSuccess {String} category Question category
 * @apiSuccess {Array} options Answer options (4 items)
 * @apiSuccess {Number} questionNumber Current question number (1-10)
 *
 * @apiError {String} NotFoundError Session not found or completed
 * @apiError {String} ValidationError Invalid session ID
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = paramsSchema.parse(req.params);

    const question = await getCurrentQuestion(validated.sessionId);

    if (!question) {
      res.status(404).json(errorResponse('Session not found or quiz completed'));
      return;
    }

    const responseData = {
      questionId: question.questionId,
      questionText: question.questionText,
      category: question.category,
      options: question.options,
    };

    res.json(successResponse(responseData));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('Validation failed', error.errors));
    } else {
      next(error);
    }
  }
}
