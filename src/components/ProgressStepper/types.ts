export type ProgressStepVariant = 'default' | 'success' | 'info' | 'pending' | 'warning' | 'danger';

export interface ProgressStepperProps {
  /** Adds an accessible label to the progress stepper. */
  'aria-label'?: string;
  /** Additional classes applied to the progress stepper container. */
  class?: string;
  /** Flag indicating the progress stepper should be centered. */
  isCenterAligned?: boolean;
  /** Flag indicating the progress stepper should be rendered compactly. */
  isCompact?: boolean;
  /** Flag indicating the progress stepper has a vertical layout. */
  isVertical?: boolean;
  /** Additional props */
  [key: string]: unknown;
}

export interface ProgressStepProps {
  /** Accessible label for the progress step. Should communicate all information being communicated by the progress step's icon, including the variant and the completed status. */
  'aria-label'?: string;
  /** Additional classes applied to the progress step container. */
  class?: string;
  /** Description text of a progress step. */
  description?: string;
  /** Custom icon of a progress step. Will override default icons provided by the variant. */
  icon?: import('svelte').Snippet;
  /** Flag indicating the progress step is the current step. */
  isCurrent?: boolean;
  /** ID of the progress step. */
  id?: string;
  /** ID of the title of the progress step. */
  titleId?: string;
  /** Variant of the progress step. */
  variant?: ProgressStepVariant;
  /** Additional props */
  [key: string]: unknown;
}

