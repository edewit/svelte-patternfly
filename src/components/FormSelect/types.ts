export interface FormSelectProps {
  'aria-label'?: string;
  className?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  onBlur?: (event: Event) => void;
  onChange?: (event: Event, value: string) => void;
  onFocus?: (event: Event) => void;
  ouiaId?: number | string;
  ouiaSafe?: boolean;
  validated?: 'success' | 'warning' | 'error' | 'default';
  value?: any;
  id?: string;
  name?: string;
  class?: string;
}

export interface FormSelectOptionProps {
  label: string;
  className?: string;
  isDisabled?: boolean;
  isPlaceholder?: boolean;
  value?: any;
}

export interface FormSelectOptionGroupProps {
  label: string;
  className?: string;
  isDisabled?: boolean;
}
