export type ToggleGroupItemChangeHandler = (
  event: MouseEvent,
  isSelected: boolean
) => void;

export interface ToggleGroupProps {
  /** Modifies the toggle group to include compact styling */
  isCompact?: boolean;
  /** Accessible label for the toggle group */
  'aria-label'?: string;
  /** Additional CSS class */
  class?: string;
  /** Allow additional props */
  [key: string]: unknown;
}

export interface ToggleGroupItemProps {
  /** Text rendered inside the toggle group item */
  text?: string;
  /** Icon rendered inside the toggle group item */
  icon?: import('svelte').Snippet;
  /** Flag indicating if the toggle group item is disabled */
  isDisabled?: boolean;
  /** Flag indicating if the toggle group item is selected */
  isSelected?: boolean;
  /** Callback for when the toggle group item selection changes */
  onChange?: ToggleGroupItemChangeHandler;
  /** Unique identifier for the button */
  buttonId?: string;
  /** Accessible label for the button */
  'aria-label'?: string;
  /** Additional CSS class */
  class?: string;
  /** Allow additional props */
  [key: string]: unknown;
}
