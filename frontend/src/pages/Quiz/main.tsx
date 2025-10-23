import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizSession } from '@/domain/quiz/hooks/useQuizSession';
import { useQuizResult } from '@/domain/quiz/hooks/useQuizResult';
import { QuestionCard } from '@/domain/quiz/components/QuestionCard';
import { ResultCard } from '@/domain/quiz/components/ResultCard';
import { SummaryCard } from '@/domain/quiz/components/SummaryCard';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { Button } from '@/core/components/Button';

/**
 * @page QuizPage
 * @summary Main quiz page managing quiz flow from start to completion
 * @domain quiz
 * @type interactive-page
 * @category quiz-management
 */
export const QuizPage = () => {
  const navigate = useNavigate();
  const [userId] = useState(() => crypto.randomUUID());
  const [completedSessionId, setCompletedSessionId] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const {
    session,
    currentQuestion,
    isLoading,
    isSubmitting,
    error: sessionError,
    startQuiz,
    submitAnswer,
  } = useQuizSession({
    userId,
    onComplete: (sessionId) => {
      setCompletedSessionId(sessionId);
    },
    onError: (error: Error) => {
      console.error('Quiz session error:', error);
    },
  });

  const {
    result,
    summary,
    isLoading: isLoadingResult,
    error: resultError,
  } = useQuizResult({
    sessionId: completedSessionId || '',
    enabled: !!completedSessionId,
  });

  useEffect(() => {
    startQuiz();
  }, []);

  const handleRestart = () => {
    setCompletedSessionId(null);
    setShowSummary(false);
    startQuiz();
  };

  const handleViewSummary = () => {
    setShowSummary(true);
  };

  const handleBackToResults = () => {
    setShowSummary(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="large" text="Carregando quiz..." />
      </div>
    );
  }

  if (sessionError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Erro ao Carregar Quiz</h2>
          <p className="text-white mb-6">{sessionError.message}</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Voltar ao Início
          </Button>
        </div>
      </div>
    );
  }

  if (completedSessionId && result && summary) {
    if (showSummary) {
      return <SummaryCard summary={summary} onBack={handleBackToResults} />;
    }

    return (
      <ResultCard result={result} onRestart={handleRestart} onViewSummary={handleViewSummary} />
    );
  }

  if (completedSessionId && isLoadingResult) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="large" text="Calculando resultados..." />
      </div>
    );
  }

  if (completedSessionId && resultError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Erro ao Carregar Resultados</h2>
          <p className="text-white mb-6">{resultError.message}</p>
          <Button variant="primary" onClick={handleRestart}>
            Tentar Novamente
          </Button>
        </div>
      </div>
    );
  }

  if (!session || !currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="large" text="Preparando pergunta..." />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <QuestionCard
        question={currentQuestion}
        totalQuestions={session.totalQuestions}
        onAnswerSelect={submitAnswer}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default QuizPage;
