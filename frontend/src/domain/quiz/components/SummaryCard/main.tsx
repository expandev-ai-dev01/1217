import { Button } from '@/core/components/Button';
import type { SummaryCardProps } from './types';

/**
 * @component SummaryCard
 * @summary Displays detailed review of all quiz questions and answers
 * @domain quiz
 * @type domain-component
 * @category quiz-review
 */
export const SummaryCard = ({ summary, onBack }: SummaryCardProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl mb-6">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-naruto-yellow mb-6">
          Revisão Detalhada
        </h2>

        <div className="space-y-6">
          {summary.questions.map((item, index) => (
            <div
              key={index}
              className={`bg-white/5 rounded-lg p-4 border-l-4 ${
                item.isCorrect ? 'border-green-500' : 'border-red-500'
              }`}
            >
              <div className="mb-3">
                <span className="text-sm font-semibold text-naruto-yellow">
                  Pergunta {index + 1}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{item.questionText}</h3>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-start">
                  <span className="text-sm font-medium text-gray-300 mr-2">Sua resposta:</span>
                  <span
                    className={`text-sm font-semibold ${
                      item.isCorrect ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {item.selectedOption}
                  </span>
                </div>
                {!item.isCorrect && (
                  <div className="flex items-start">
                    <span className="text-sm font-medium text-gray-300 mr-2">
                      Resposta correta:
                    </span>
                    <span className="text-sm font-semibold text-green-400">
                      {item.correctOption}
                    </span>
                  </div>
                )}
              </div>

              {item.explanation && (
                <div className="bg-naruto-blue/20 rounded p-3 mt-3">
                  <p className="text-sm text-gray-200">
                    <span className="font-semibold text-naruto-yellow">Explicação:</span>{' '}
                    {item.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Button variant="secondary" size="lg" fullWidth onClick={onBack}>
        Voltar aos Resultados
      </Button>
    </div>
  );
};
