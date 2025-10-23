import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { startQuiz } from '@/services/quiz';
import { successResponse, errorResponse } from '@/utils/response';

const bodySchema = z.object({
  userId: z.string().uuid(),
});

/**
 * @api {post} /external/quiz/start Start Quiz Session
 * @apiName StartQuiz
 * @apiGroup Quiz
 * @apiVersion 1.0.0
 *
 * @apiDescription Starts a new quiz session with 10 random questions
 *
 * @apiParam {String} userId User identifier (UUID)
 *
 * @apiSuccess {String} sessionId Session identifier
 * @apiSuccess {String} userId User identifier
 * @apiSuccess {Date} startTime Session start time
 * @apiSuccess {Number} totalQuestions Total number of questions (10)
 * @apiSuccess {Number} currentQuestionIndex Current question index (0)
 * @apiSuccess {Object} currentQuestion First question data
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} ServerError Internal server error
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = bodySchema.parse(req.body);

    const session = await startQuiz(validated);

    const currentQuestion = session.questions[0];

    const responseData = {
      sessionId: session.sessionId,
      userId: session.userId,
      startTime: session.startTime,
      totalQuestions: session.totalQuestions,
      currentQuestionIndex: session.currentQuestionIndex,
      currentQuestion: {
        questionId: currentQuestion.questionId,
        questionText: currentQuestion.questionText,
        category: currentQuestion.category,
        options: currentQuestion.options,
        questionNumber: 1,
      },
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
