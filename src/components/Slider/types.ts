export interface SliderStepObject {
  /** Value of the step */
  value: number;
  /** Label for the step (optional) */
  label?: string;
  /** Whether the step tick should be hidden */
  isLabelHidden?: boolean;
}

export type SliderOnChangeHandler = (event: Event, value: number) => void;

export interface SliderProps {
  /** Current value of the slider */
  value?: number;
  /** Minimum value of the slider */
  min?: number;
  /** Maximum value of the slider */
  max?: number;
  /** Step increment for the slider */
  step?: number;
  /** Flag to show value input field */
  isInputVisible?: boolean;
  /** Width of the input field */
  inputWidth?: number | string;
  /** Label for the input field */
  inputLabel?: string;
  /** Position of the input field */
  inputPosition?: 'aboveThumb' | 'end';
  /** Flag indicating if the slider is disabled */
  isDisabled?: boolean;
  /** Flag to show tooltip over thumb */
  hasTooltipOverThumb?: boolean;
  /** Custom steps for the slider */
  customSteps?: SliderStepObject[];
  /** Flag indicating custom steps are continuous (no snapping) */
  areCustomStepsContinuous?: boolean;
  /** Aria label for the slider thumb */
  'aria-label'?: string;
  /** Aria labelledby for the slider thumb */
  'aria-labelledby'?: string;
  /** Aria describedby for the slider thumb */
  'aria-describedby'?: string;
  /** Callback when value changes */
  onChange?: SliderOnChangeHandler;
  /** Left actions slot */
  leftActions?: import('svelte').Snippet;
  /** Right actions slot */
  rightActions?: import('svelte').Snippet;
  /** Additional CSS class */
  class?: string;
  /** Allow additional props */
  [key: string]: unknown;
}
