import { clsx } from 'clsx';

export interface ButtonVariantProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

/**
 * Get button className based on variants
 */
export function getButtonClassName(props: ButtonVariantProps): string {
  const { variant = 'primary', size = 'md', fullWidth = false, className } = props;

  return clsx(
    'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    {
      'bg-naruto-orange text-white hover:bg-naruto-orange/90 focus-visible:ring-naruto-orange shadow-md hover:shadow-lg':
        variant === 'primary',
      'bg-naruto-blue text-white hover:bg-naruto-blue/90 focus-visible:ring-naruto-blue shadow-md hover:shadow-lg':
        variant === 'secondary',
      'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 shadow-md hover:shadow-lg':
        variant === 'danger',
      'bg-transparent text-white hover:bg-white/10 focus-visible:ring-white/50':
        variant === 'ghost',
    },
    {
      'h-8 px-3 text-sm': size === 'sm',
      'h-10 px-4 text-base': size === 'md',
      'h-12 px-6 text-lg': size === 'lg',
    },
    {
      'w-full': fullWidth,
    },
    className
  );
}
