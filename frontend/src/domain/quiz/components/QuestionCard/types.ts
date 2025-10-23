import type { QuizQuestion } from '../../types';

export interface QuestionCardProps {
  question: QuizQuestion;
  totalQuestions: number;
  onAnswerSelect: (optionId: string) => void;
  isSubmitting: boolean;
}
