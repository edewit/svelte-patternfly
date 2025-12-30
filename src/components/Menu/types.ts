export interface MenuProps {
  activeItemId?: string | number;
  onSelect?: (event?: MouseEvent, itemId?: string | number) => void;
  isPlain?: boolean;
  isFlyout?: boolean;
  containsFlyout?: boolean;
  isNavFlyout?: boolean;
  role?: 'menu' | 'listbox';
  selected?: string | number | (string | number)[];
  hidden?: boolean;
  class?: string;
  children?: import('svelte').Snippet;
  [key: string]: unknown;
}

export interface MenuContentProps {
  class?: string;
  children?: import('svelte').Snippet;
  [key: string]: unknown;
}

export interface MenuListProps {
  class?: string;
  children?: import('svelte').Snippet;
  [key: string]: unknown;
}

export interface MenuItemProps {
  itemId?: string | number;
  isDisabled?: boolean;
  isAriaDisabled?: boolean;
  isDanger?: boolean;
  isSelected?: boolean;
  to?: string;
  href?: string;
  component?: 'a' | 'button';
  description?: string;
  icon?: import('svelte').Snippet;
  tooltipProps?: {
    content?: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
  };
  submenu?: import('svelte').Snippet;
  isExpanded?: boolean;
  onToggle?: (event: MouseEvent, isExpanded: boolean) => void;
  onClick?: (event: MouseEvent) => void;
  class?: string;
  children?: import('svelte').Snippet | string;
  [key: string]: unknown;
}

export interface TooltipProps {
  content?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

