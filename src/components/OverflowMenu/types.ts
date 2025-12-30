export type OverflowMenuBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface OverflowMenuProps {
  breakpoint: OverflowMenuBreakpoint;
  breakpointReference?: HTMLElement | (() => HTMLElement) | { current: HTMLElement | null };
  class?: string;
  children?: import('svelte').Snippet;
  [key: string]: unknown;
}

export interface OverflowMenuContentProps {
  isPersistent?: boolean;
  class?: string;
  children?: import('svelte').Snippet;
  [key: string]: unknown;
}

export interface OverflowMenuControlProps {
  hasAdditionalOptions?: boolean;
  class?: string;
  children?: import('svelte').Snippet;
  [key: string]: unknown;
}

export interface OverflowMenuGroupProps {
  groupType?: 'button' | 'icon';
  isPersistent?: boolean;
  class?: string;
  children?: import('svelte').Snippet;
  [key: string]: unknown;
}

export interface OverflowMenuItemProps {
  isPersistent?: boolean;
  class?: string;
  children?: import('svelte').Snippet | string;
  [key: string]: unknown;
}

export interface OverflowMenuDropdownItemProps {
  itemId?: string | number;
  isShared?: boolean;
  class?: string;
  children?: import('svelte').Snippet | string;
  [key: string]: unknown;
}

