import { publicClient } from '@/core/lib/api';
import type { QuizSession, QuizQuestion, QuizAnswer, QuizResult, QuestionSummary } from '../types';

/**
 * @service quizService
 * @summary Quiz service for public endpoints
 * @domain quiz
 * @type rest-service
 * @apiContext external
 */
export const quizService = {
  /**
   * @endpoint POST /api/v1/external/quiz/start
   * @summary Starts a new quiz session with 10 random questions
   */
  async startQuiz(userId: string): Promise<QuizSession> {
    const response = await publicClient.post('/quiz/start', { userId });
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/external/quiz/:sessionId/question
   * @summary Gets the current question for a quiz session
   */
  async getCurrentQuestion(sessionId: string): Promise<QuizQuestion> {
    const response = await publicClient.get(`/quiz/${sessionId}/question`);
    return response.data.data;
  },

  /**
   * @endpoint POST /api/v1/external/quiz/answer
   * @summary Submits an answer to a quiz question
   */
  async submitAnswer(data: {
    sessionId: string;
    questionId: string;
    selectedOptionId: string;
    responseTime: number;
  }): Promise<QuizAnswer> {
    const response = await publicClient.post('/quiz/answer', data);
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/external/quiz/:sessionId/result
   * @summary Gets the final results of a completed quiz session
   */
  async getQuizResult(sessionId: string): Promise<QuizResult> {
    const response = await publicClient.get(`/quiz/${sessionId}/result`);
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/external/quiz/:sessionId/summary
   * @summary Gets detailed feedback for all questions in a completed quiz
   */
  async getQuestionSummary(sessionId: string): Promise<QuestionSummary> {
    const response = await publicClient.get(`/quiz/${sessionId}/summary`);
    return response.data.data;
  },
};
