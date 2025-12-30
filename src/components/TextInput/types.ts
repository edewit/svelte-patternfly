export interface TextInputExpandedObj {
  isExpanded?: boolean;
  'aria-controls'?: string;
  'aria-expanded'?: boolean;
}

export interface TextInputProps {
  'aria-label'?: string;
  className?: string;
  customIcon?: import('svelte').Snippet;
  expandedProps?: TextInputExpandedObj;
  isDisabled?: boolean;
  /** @deprecated Use expandedProps instead */
  isExpanded?: boolean;
  /** @deprecated Use isStartTruncated instead */
  isLeftTruncated?: boolean;
  isRequired?: boolean;
  isStartTruncated?: boolean;
  onBlur?: (event: Event) => void;
  onChange?: (event: Event, value: string) => void;
  onFocus?: (event: Event) => void;
  placeholder?: string;
  readOnlyVariant?: 'plain' | 'default';
  type?:
    | 'text'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'time'
    | 'url';
  validated?: 'success' | 'warning' | 'error' | 'default';
  value?: string | number;
  id?: string;
  name?: string;
  class?: string;
}
