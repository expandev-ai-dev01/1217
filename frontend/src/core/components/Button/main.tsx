import { ButtonHTMLAttributes, forwardRef } from 'react';
import { getButtonClassName, ButtonVariantProps } from './variants';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {}

/**
 * @component Button
 * @summary Reusable button component with multiple variants and sizes
 * @domain core
 * @type ui-component
 * @category form
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, fullWidth, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={getButtonClassName({ variant, size, fullWidth, className })}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
