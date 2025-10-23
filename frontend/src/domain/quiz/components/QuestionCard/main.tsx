import { useState } from 'react';
import { Button } from '@/core/components/Button';
import type { QuestionCardProps } from './types';

/**
 * @component QuestionCard
 * @summary Displays a quiz question with multiple choice options
 * @domain quiz
 * @type domain-component
 * @category quiz-display
 */
export const QuestionCard = ({
  question,
  totalQuestions,
  onAnswerSelect,
  isSubmitting,
}: QuestionCardProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (optionId: string) => {
    if (isSubmitting) return;
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (selectedOption && !isSubmitting) {
      onAnswerSelect(selectedOption);
      setSelectedOption(null);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-naruto-yellow font-semibold text-sm">
            Pergunta {question.questionNumber} de {totalQuestions}
          </span>
          <span className="bg-naruto-blue/30 text-white px-3 py-1 rounded-full text-xs font-medium">
            {question.category}
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6">{question.questionText}</h2>
      </div>

      <div className="space-y-3 mb-6">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            disabled={isSubmitting}
            className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
              selectedOption === option.id
                ? 'bg-naruto-orange text-white shadow-lg scale-105'
                : 'bg-white/5 text-white hover:bg-white/10 hover:scale-102'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <span className="font-medium">{option.text}</span>
          </button>
        ))}
      </div>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={handleSubmit}
        disabled={!selectedOption || isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Confirmar Resposta'}
      </Button>
    </div>
  );
};
