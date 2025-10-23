/**
 * @module QuizTypes
 * @summary Type definitions for quiz domain
 * @domain quiz
 * @category types
 */

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  questionId: string;
  questionText: string;
  category: string;
  options: QuizOption[];
  questionNumber: number;
}

export interface QuizSession {
  sessionId: string;
  userId: string;
  startTime: string;
  totalQuestions: number;
  currentQuestionIndex: number;
  currentQuestion: QuizQuestion;
}

export interface QuizAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  responseTime: number;
  pointsEarned: number;
}

export interface QuizResult {
  sessionId: string;
  totalScore: number;
  correctAnswers: number;
  completionTime: number;
  performanceMessage: string;
  endTime: string;
}

export interface QuestionSummaryItem {
  questionText: string;
  selectedOption: string;
  correctOption: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface QuestionSummary {
  questions: QuestionSummaryItem[];
}
