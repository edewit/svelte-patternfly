export interface SelectProps {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onSelect?: (event?: MouseEvent, value?: any) => void;
  toggle: import('svelte').Snippet;
  isPlain?: boolean;
  isScrollable?: boolean;
  maxMenuHeight?: string;
  menuHeight?: string;
  onOpenChangeKeys?: string[];
  onToggleKeydown?: (event: KeyboardEvent) => void;
  shouldFocusToggleOnSelect?: boolean;
  shouldFocusFirstItemOnOpen?: boolean;
  shouldPreventScrollOnItemFocus?: boolean;
  focusTimeoutDelay?: number;
  selected?: any | any[];
  role?: string;
  variant?: 'default' | 'typeahead';
  zIndex?: number;
  popperProps?: Record<string, unknown>;
  id?: string;
  class?: string;
  children?: import('svelte').Snippet;
  [key: string]: unknown;
}

export interface SelectListProps {
  isAriaMultiselectable?: boolean;
  class?: string;
  children?: import('svelte').Snippet;
  [key: string]: unknown;
}

export interface SelectOptionProps {
  value?: any;
  isSelected?: boolean;
  isDisabled?: boolean;
  isFocused?: boolean;
  hasCheckbox?: boolean;
  icon?: import('svelte').Snippet;
  description?: import('svelte').Snippet | string;
  isExternalLink?: boolean;
  class?: string;
  children?: import('svelte').Snippet | string;
  [key: string]: unknown;
}

export interface SelectGroupProps {
  label?: import('svelte').Snippet | string;
  class?: string;
  children?: import('svelte').Snippet;
  [key: string]: unknown;
}



