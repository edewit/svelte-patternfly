export interface TextInputGroupProps {
  className?: string;
  class?: string;
  isDisabled?: boolean;
  isPlain?: boolean;
  children?: import('svelte').Snippet;
}

export interface TextInputGroupMainProps {
  className?: string;
  class?: string;
  'aria-label'?: string;
  hint?: string;
  icon?: import('svelte').Snippet;
  isDisabled?: boolean;
  name?: string;
  onChange?: (event: Event, value: string) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  placeholder?: string;
  type?: 'text' | 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'time' | 'url';
  value?: string;
  children?: import('svelte').Snippet;
}

export interface TextInputGroupUtilitiesProps {
  className?: string;
  class?: string;
  children?: import('svelte').Snippet;
}
