export type WizardStepStatus = 'default' | 'error' | 'success' | 'warning';

export type WizardNavItemStatus = 'default' | 'error' | 'success' | 'warning';

export interface WizardStepFooter {
  /** Text for the next button */
  nextButtonText?: string;
  /** Text for the back button */
  backButtonText?: string;
  /** Text for the cancel button */
  cancelButtonText?: string;
  /** Whether to hide the cancel button */
  hideCancelButton?: boolean;
  /** Whether to disable the next button */
  isNextDisabled?: boolean;
  /** Whether to disable the back button */
  isBackDisabled?: boolean;
}

export interface WizardStep {
  /** Unique identifier for the step */
  id: string;
  /** Name/title of the step */
  name: string;
  /** Index of the step (auto-assigned) */
  index?: number;
  /** Whether the step is disabled */
  isDisabled?: boolean;
  /** Whether the step is hidden */
  isHidden?: boolean;
  /** Status of the step */
  status?: WizardStepStatus;
  /** Footer configuration for the step */
  footer?: WizardStepFooter;
  /** Sub-steps for expandable navigation */
  steps?: WizardStep[];
}

export interface WizardProps {
  /** Title of the wizard */
  title?: string;
  /** Description of the wizard */
  description?: string;
  /** Height of the wizard */
  height?: number | string;
  /** Width of the wizard */
  width?: number | string;
  /** The currently active step ID */
  activeStepId?: string;
  /** Callback when the active step changes */
  onStepChange?: (event: Event, currentStep: WizardStep, prevStep: WizardStep) => void;
  /** Callback when the wizard is closed */
  onClose?: () => void;
  /** Callback when the wizard is saved/finished */
  onSave?: () => void;
  /** Whether to show the close button */
  hasCloseButton?: boolean;
  /** Whether to show the header */
  hasHeader?: boolean;
  /** Whether the nav is expanded on mobile */
  isNavExpanded?: boolean;
  /** Text for the next button */
  nextButtonText?: string;
  /** Text for the back button */
  backButtonText?: string;
  /** Text for the cancel button */
  cancelButtonText?: string;
  /** Aria label for the nav */
  navAriaLabel?: string;
  /** Aria label for the main content */
  mainAriaLabel?: string;
  /** Additional CSS class */
  class?: string;
  /** Allow additional props */
  [key: string]: unknown;
}

export interface WizardStepProps {
  /** Unique identifier for the step */
  id: string;
  /** Name/title of the step shown in the nav */
  name: string;
  /** Whether the step is disabled */
  isDisabled?: boolean;
  /** Whether the step is hidden from the nav */
  isHidden?: boolean;
  /** Status of the step */
  status?: WizardStepStatus;
  /** Footer configuration for the step */
  footer?: WizardStepFooter;
  /** Additional CSS class */
  class?: string;
  /** Allow additional props */
  [key: string]: unknown;
}

export interface WizardNavProps {
  /** Aria label for the nav */
  'aria-label'?: string;
  /** Additional CSS class */
  class?: string;
  /** Allow additional props */
  [key: string]: unknown;
}

export interface WizardNavItemProps {
  /** Step ID this nav item represents */
  stepId: string;
  /** Content/name of the nav item */
  content?: string;
  /** Whether the nav item is current */
  isCurrent?: boolean;
  /** Whether the nav item is disabled */
  isDisabled?: boolean;
  /** Whether the nav item is expandable */
  isExpandable?: boolean;
  /** Whether the nav item is expanded */
  isExpanded?: boolean;
  /** Step number to display */
  stepIndex?: number;
  /** Status of the nav item */
  status?: WizardNavItemStatus;
  /** Callback when clicked */
  onClick?: (event: MouseEvent, stepId: string) => void;
  /** Additional CSS class */
  class?: string;
  /** Allow additional props */
  [key: string]: unknown;
}

export interface WizardBodyProps {
  /** Whether the body has no padding */
  hasNoPadding?: boolean;
  /** Additional CSS class */
  class?: string;
  /** Allow additional props */
  [key: string]: unknown;
}

export interface WizardFooterProps {
  /** Text for the next button */
  nextButtonText?: string;
  /** Text for the back button */
  backButtonText?: string;
  /** Text for the cancel button */
  cancelButtonText?: string;
  /** Whether to hide the cancel button */
  hideCancelButton?: boolean;
  /** Whether the next button is disabled */
  isNextDisabled?: boolean;
  /** Whether the back button is disabled */
  isBackDisabled?: boolean;
  /** Whether this is the first step */
  isFirstStep?: boolean;
  /** Whether this is the last step */
  isLastStep?: boolean;
  /** Callback when next is clicked */
  onNext?: (event: MouseEvent) => void;
  /** Callback when back is clicked */
  onBack?: (event: MouseEvent) => void;
  /** Callback when cancel is clicked */
  onCancel?: (event: MouseEvent) => void;
  /** Additional CSS class */
  class?: string;
  /** Allow additional props */
  [key: string]: unknown;
}

export interface WizardHeaderProps {
  /** Title of the wizard */
  title?: string;
  /** Description of the wizard */
  description?: string;
  /** Whether to show the close button */
  hasCloseButton?: boolean;
  /** Callback when close is clicked */
  onClose?: () => void;
  /** Additional CSS class */
  class?: string;
  /** Allow additional props */
  [key: string]: unknown;
}

export interface WizardToggleProps {
  /** Current step name */
  currentStepName?: string;
  /** Current step number */
  currentStepNumber?: number;
  /** Whether the nav is expanded */
  isExpanded?: boolean;
  /** Callback when toggle is clicked */
  onToggle?: () => void;
  /** Additional CSS class */
  class?: string;
  /** Allow additional props */
  [key: string]: unknown;
}
