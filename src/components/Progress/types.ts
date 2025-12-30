export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressMeasureLocation = 'outside' | 'inside' | 'top' | 'none';
export type ProgressVariant = 'default' | 'success' | 'warning' | 'danger';

export interface ProgressProps {
  /** Classname for progress component. */
  class?: string;
  /** Actual progress value. */
  value?: number;
  /** ID for the progress component. Also used to generate IDs for child components. */
  id?: string;
  /** Title above progress bar. */
  title?: string;
  /** Text description of current progress value to display instead of percentage. */
  label?: string;
  /** Size of the progress bar. */
  size?: ProgressSize;
  /** Where to display the measure (percentage or label). */
  measureLocation?: ProgressMeasureLocation;
  /** Adds a status variant to the progress bar. */
  variant?: ProgressVariant;
  /** Minimum value for the progress bar. */
  min?: number;
  /** Maximum value for the progress bar. */
  max?: number;
  /** Accessible text description of current progress value, for when value is not a percentage. */
  valueText?: string;
  /** Adds accessible text to the ProgressBar. Required when title not used and there is not any label associated with the progress bar */
  'aria-label'?: string;
  /** Associates the ProgressBar with its label for accessibility purposes. Required when title not used */
  'aria-labelledby'?: string;
  /** Adds an accessible description to the ProgressBar via space separated list of ids. Required when helperText is passed in. */
  'aria-describedby'?: string;
  /** Indicate whether to truncate the title. */
  isTitleTruncated?: boolean;
  /** Content which is rendered in the helper text area below the progress bar. */
  helperText?: string;
  /** OUIA component id */
  ouiaId?: string | number;
  /** OUIA component safe */
  ouiaSafe?: boolean;
  /** Additional props */
  [key: string]: unknown;
}

