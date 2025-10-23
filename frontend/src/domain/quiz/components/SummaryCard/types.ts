import type { QuestionSummary } from '../../types';

export interface SummaryCardProps {
  summary: QuestionSummary;
  onBack: () => void;
}
