import type { QuizResult } from '../../types';

export interface ResultCardProps {
  result: QuizResult;
  onRestart: () => void;
  onViewSummary: () => void;
}
