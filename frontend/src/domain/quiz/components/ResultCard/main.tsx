import { Button } from '@/core/components/Button';
import type { ResultCardProps } from './types';

/**
 * @component ResultCard
 * @summary Displays quiz completion results with score and performance message
 * @domain quiz
 * @type domain-component
 * @category quiz-results
 */
export const ResultCard = ({ result, onRestart, onViewSummary }: ResultCardProps) => {
  const getPerformanceColor = (score: number) => {
    if (score === 100) return 'text-green-400';
    if (score >= 70) return 'text-blue-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-naruto-yellow mb-4">
          Quiz Concluído!
        </h2>
        <div
          className={`text-6xl md:text-7xl font-bold mb-4 ${getPerformanceColor(
            result.totalScore
          )}`}
        >
          {result.totalScore}
        </div>
        <p className="text-xl text-white mb-2">pontos de 100</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-naruto-orange mb-1">{result.correctAnswers}</div>
          <div className="text-sm text-gray-300">Acertos</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-naruto-blue mb-1">
            {formatTime(result.completionTime)}
          </div>
          <div className="text-sm text-gray-300">Tempo Total</div>
        </div>
      </div>

      <div className="bg-naruto-orange/20 border border-naruto-orange/50 rounded-lg p-4 mb-8">
        <p className="text-white text-center font-medium">{result.performanceMessage}</p>
      </div>

      <div className="space-y-3">
        <Button variant="primary" size="lg" fullWidth onClick={onViewSummary}>
          Ver Respostas Detalhadas
        </Button>
        <Button variant="secondary" size="lg" fullWidth onClick={onRestart}>
          Fazer Novo Quiz
        </Button>
      </div>
    </div>
  );
};
