import { clsx, ClassValue } from 'clsx';

/**
 * @utility cn
 * @summary Utility function to merge class names
 * @domain core
 * @type utility-function
 * @category styling
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
