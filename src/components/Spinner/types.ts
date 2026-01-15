export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

export interface SpinnerProps {
  /** Size variant of the spinner */
  size?: SpinnerSize;
  /** Custom diameter of the spinner (e.g., '80px') */
  diameter?: string;
  /** Accessible label for the spinner */
  'aria-label'?: string;
  /** ID of element that describes the spinner */
  'aria-labelledby'?: string;
  /** Whether the spinner has finished loading */
  'aria-valuetext'?: string;
  /** Flag indicating the spinner is inline and should display inline-block */
  isInline?: boolean;
  /** Additional CSS class */
  class?: string;
  /** Allow additional props */
  [key: string]: unknown;
}
