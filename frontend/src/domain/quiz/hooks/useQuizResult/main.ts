import { useQuery } from '@tanstack/react-query';
import { quizService } from '../../services/quizService';
import type { UseQuizResultOptions, UseQuizResultReturn } from './types';

/**
 * @hook useQuizResult
 * @summary Fetches quiz results and question summary
 * @domain quiz
 * @type domain-hook
 * @category quiz-results
 */
export const useQuizResult = (options: UseQuizResultOptions): UseQuizResultReturn => {
  const { sessionId, enabled = true } = options;

  const {
    data: result,
    isLoading: isLoadingResult,
    error: resultError,
    refetch: refetchResult,
  } = useQuery({
    queryKey: ['quiz-result', sessionId],
    queryFn: () => quizService.getQuizResult(sessionId),
    enabled: enabled && !!sessionId,
    retry: 1,
  });

  const {
    data: summary,
    isLoading: isLoadingSummary,
    error: summaryError,
    refetch: refetchSummary,
  } = useQuery({
    queryKey: ['quiz-summary', sessionId],
    queryFn: () => quizService.getQuestionSummary(sessionId),
    enabled: enabled && !!sessionId,
    retry: 1,
  });

  const refetch = () => {
    refetchResult();
    refetchSummary();
  };

  return {
    result: result || null,
    summary: summary || null,
    isLoading: isLoadingResult || isLoadingSummary,
    error: (resultError || summaryError) as Error | null,
    refetch,
  };
};
