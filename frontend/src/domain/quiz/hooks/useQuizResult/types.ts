import type { QuizResult, QuestionSummary } from '../../types';

export interface UseQuizResultOptions {
  sessionId: string;
  enabled?: boolean;
}

export interface UseQuizResultReturn {
  result: QuizResult | null;
  summary: QuestionSummary | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
