import type { ButtonProps } from '../Button/types';

export type ValidatedOptions = 'success' | 'warning' | 'error' | 'default';

export interface NumberInputProps {
  className?: string;
  class?: string;
  inputAriaLabel?: string;
  inputName?: string;
  inputProps?: Record<string, any>;
  isDisabled?: boolean;
  max?: number;
  min?: number;
  minusBtnAriaLabel?: string;
  minusBtnProps?: ButtonProps;
  onBlur?: (event: Event) => void;
  onChange?: (event: Event) => void;
  onMinus?: (event: MouseEvent, name?: string) => void;
  onPlus?: (event: MouseEvent, name?: string) => void;
  plusBtnAriaLabel?: string;
  plusBtnProps?: ButtonProps;
  unit?: import('svelte').Snippet | string;
  unitPosition?: 'before' | 'after';
  validated?: ValidatedOptions;
  value?: number | '';
  widthChars?: number;
}

