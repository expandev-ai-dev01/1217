import { Router } from 'express';
import * as quizStartController from '@/api/v1/external/quiz/start/controller';
import * as quizQuestionController from '@/api/v1/external/quiz/question/controller';
import * as quizAnswerController from '@/api/v1/external/quiz/answer/controller';
import * as quizResultController from '@/api/v1/external/quiz/result/controller';
import * as quizSummaryController from '@/api/v1/external/quiz/summary/controller';

const router = Router();

// Quiz routes
router.post('/quiz/start', quizStartController.postHandler);
router.get('/quiz/:sessionId/question', quizQuestionController.getHandler);
router.post('/quiz/answer', quizAnswerController.postHandler);
router.get('/quiz/:sessionId/result', quizResultController.getHandler);
router.get('/quiz/:sessionId/summary', quizSummaryController.getHandler);

export default router;
