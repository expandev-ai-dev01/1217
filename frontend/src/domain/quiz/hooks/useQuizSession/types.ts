import type { QuizSession, QuizQuestion, QuizAnswer } from '../../types';

export interface UseQuizSessionOptions {
  userId: string;
  onComplete?: (sessionId: string) => void;
  onError?: (error: Error) => void;
}

export interface UseQuizSessionReturn {
  session: QuizSession | null;
  currentQuestion: QuizQuestion | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: Error | null;
  startQuiz: () => Promise<void>;
  submitAnswer: (selectedOptionId: string) => Promise<void>;
  questionStartTime: number;
}
