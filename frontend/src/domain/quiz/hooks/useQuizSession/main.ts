import { useState, useCallback, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { quizService } from '../../services/quizService';
import type { UseQuizSessionOptions, UseQuizSessionReturn } from './types';
import type { QuizSession, QuizQuestion } from '../../types';

/**
 * @hook useQuizSession
 * @summary Manages quiz session state and interactions
 * @domain quiz
 * @type domain-hook
 * @category quiz-management
 */
export const useQuizSession = (options: UseQuizSessionOptions): UseQuizSessionReturn => {
  const { userId, onComplete, onError } = options;

  const [session, setSession] = useState<QuizSession | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const questionStartTime = useRef<number>(Date.now());

  const startQuizMutation = useMutation({
    mutationFn: () => quizService.startQuiz(userId),
    onSuccess: (data) => {
      setSession(data);
      setCurrentQuestion(data.currentQuestion);
      questionStartTime.current = Date.now();
      setError(null);
    },
    onError: (err: Error) => {
      setError(err);
      onError?.(err);
    },
  });

  const submitAnswerMutation = useMutation({
    mutationFn: async (selectedOptionId: string) => {
      if (!session || !currentQuestion) {
        throw new Error('No active session or question');
      }

      const responseTime = Math.floor((Date.now() - questionStartTime.current) / 1000);

      const answer = await quizService.submitAnswer({
        sessionId: session.sessionId,
        questionId: currentQuestion.questionId,
        selectedOptionId,
        responseTime,
      });

      return answer;
    },
    onSuccess: async (answer) => {
      if (!session) return;

      const nextQuestionNumber = (currentQuestion?.questionNumber || 0) + 1;

      if (nextQuestionNumber > session.totalQuestions) {
        onComplete?.(session.sessionId);
        return;
      }

      try {
        const nextQuestion = await quizService.getCurrentQuestion(session.sessionId);
        setCurrentQuestion(nextQuestion);
        questionStartTime.current = Date.now();
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
          onError?.(err);
        }
      }
    },
    onError: (err: Error) => {
      setError(err);
      onError?.(err);
    },
  });

  const startQuiz = useCallback(async () => {
    await startQuizMutation.mutateAsync();
  }, [startQuizMutation]);

  const submitAnswer = useCallback(
    async (selectedOptionId: string) => {
      await submitAnswerMutation.mutateAsync(selectedOptionId);
    },
    [submitAnswerMutation]
  );

  return {
    session,
    currentQuestion,
    isLoading: startQuizMutation.isPending,
    isSubmitting: submitAnswerMutation.isPending,
    error,
    startQuiz,
    submitAnswer,
    questionStartTime: questionStartTime.current,
  };
};
