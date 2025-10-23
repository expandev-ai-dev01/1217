import { getLoadingSpinnerClassName, LoadingSpinnerVariantProps } from './variants';

export interface LoadingSpinnerProps extends LoadingSpinnerVariantProps {
  text?: string;
}

/**
 * @component LoadingSpinner
 * @summary Loading indicator with optional text
 * @domain core
 * @type ui-component
 * @category feedback
 */
export const LoadingSpinner = ({ size = 'medium', text }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={getLoadingSpinnerClassName({ size })}>
        <div className="animate-spin rounded-full border-4 border-naruto-orange border-t-transparent" />
      </div>
      {text && <p className="mt-4 text-white text-center">{text}</p>}
    </div>
  );
};
