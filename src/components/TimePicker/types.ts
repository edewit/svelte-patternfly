export interface TimePickerProps {
  'aria-label'?: string;
  class?: string;
  delimiter?: string;
  id?: string;
  includeSeconds?: boolean;
  inputProps?: Record<string, any>;
  invalidFormatErrorMessage?: string;
  invalidMinMaxErrorMessage?: string;
  is24Hour?: boolean;
  isDisabled?: boolean;
  isOpen?: boolean;
  maxTime?: string | Date;
  menuAppendTo?: HTMLElement | (() => HTMLElement) | 'parent' | 'inline';
  minTime?: string | Date;
  onChange?: (
    event: Event,
    time: string,
    hour?: number,
    minute?: number,
    seconds?: number,
    isValid?: boolean
  ) => void;
  placeholder?: string;
  setIsOpen?: (isOpen?: boolean) => void;
  stepMinutes?: number;
  time?: string | Date;
  validateTime?: (time: string) => boolean;
  width?: string;
  zIndex?: number;
}
