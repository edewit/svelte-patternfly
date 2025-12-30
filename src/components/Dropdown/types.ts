export interface DropdownProps {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onSelect?: (event?: MouseEvent, value?: string | number) => void;
  toggle: import('svelte').Snippet | string;
  isPlain?: boolean;
  isScrollable?: boolean;
  maxMenuHeight?: string;
  menuHeight?: string;
  onOpenChangeKeys?: string[];
  onToggleKeydown?: (event: KeyboardEvent) => void;
  shouldFocusToggleOnSelect?: boolean;
  focusTimeoutDelay?: number;
  ouiaId?: string | number;
  ouiaSafe?: boolean;
  class?: string;
  children?: import('svelte').Snippet;
}

export interface MenuToggleProps {
  isExpanded?: boolean;
  isDisabled?: boolean;
  isPlain?: boolean;
  isFullHeight?: boolean;
  isSplitButton?: boolean;
  variant?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'plain';
  'aria-label'?: string;
  'aria-haspopup'?: 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  'aria-controls'?: string;
  'aria-describedby'?: string;
  onClick?: () => void;
  class?: string;
  children?: import('svelte').Snippet | string;
  [key: string]: unknown;
}

export interface DropdownListProps {
  class?: string;
  children?: import('svelte').Snippet;
}

export interface DropdownItemProps {
  value?: string | number;
  isDisabled?: boolean;
  isAriaDisabled?: boolean;
  to?: string;
  href?: string;
  component?: 'a' | 'button';
  description?: string;
  tooltipProps?: {
    content?: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
  };
  onClick?: (event: MouseEvent) => void;
  class?: string;
  children?: import('svelte').Snippet | string;
  [key: string]: unknown;
}

export interface DropdownGroupProps {
  label?: string;
  labelHeadingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  class?: string;
  children?: import('svelte').Snippet;
}

export interface DividerProps {
  component?: 'li' | 'div' | 'hr';
  class?: string;
  [key: string]: unknown;
}

