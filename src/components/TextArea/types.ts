export interface TextAreaProps {
  'aria-label'?: string;
  autoResize?: boolean;
  className?: string;
  customIcon?: import('svelte').Snippet;
  isDisabled?: boolean;
  isRequired?: boolean;
  onBlur?: (event: Event) => void;
  onChange?: (event: Event, value: string) => void;
  onFocus?: (event: Event) => void;
  placeholder?: string;
  readOnlyVariant?: 'plain' | 'default';
  resizeOrientation?: 'horizontal' | 'vertical' | 'both' | 'none';
  validated?: 'success' | 'warning' | 'error' | 'default';
  value?: string | number;
  id?: string;
  name?: string;
  class?: string;
}
