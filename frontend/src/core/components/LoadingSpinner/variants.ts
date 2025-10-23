import { clsx } from 'clsx';

export interface LoadingSpinnerVariantProps {
  size?: 'small' | 'medium' | 'large';
}

export function getLoadingSpinnerClassName(props: LoadingSpinnerVariantProps): string {
  const { size = 'medium' } = props;

  return clsx({
    'w-8 h-8': size === 'small',
    'w-12 h-12': size === 'medium',
    'w-16 h-16': size === 'large',
  });
}
