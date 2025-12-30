export type NavSelectClickHandler = (
  event: Event,
  itemId: number | string,
  groupId?: number | string,
  to?: string
) => void;

export type NavOnSelectHandler = (
  event: Event,
  result: { itemId: number | string; groupId?: number | string }
) => void;

export type NavOnToggleHandler = (
  event: MouseEvent,
  result: { groupId: number | string; isExpanded: boolean }
) => void;

export interface NavProps {
  onSelect?: NavOnSelectHandler;
  onToggle?: NavOnToggleHandler;
  variant?: 'default' | 'horizontal' | 'horizontal-subnav';
  'aria-label'?: string;
  ouiaId?: string;
  class?: string;
  children?: import('svelte').Snippet;
  [key: string]: unknown;
}

export interface NavListProps {
  class?: string;
  children?: import('svelte').Snippet;
  [key: string]: unknown;
}

export interface NavGroupProps {
  title?: string;
  'aria-label'?: string;
  id?: string;
  class?: string;
  children?: import('svelte').Snippet;
  [key: string]: unknown;
}

export interface NavExpandableProps {
  title: string;
  groupId: number | string;
  isActive?: boolean;
  isExpanded?: boolean;
  class?: string;
  children?: import('svelte').Snippet;
  [key: string]: unknown;
}

export interface NavItemProps {
  id?: string;
  to?: string;
  itemId?: number | string;
  groupId?: number | string;
  isActive?: boolean;
  preventDefault?: boolean;
  onClick?: NavSelectClickHandler;
  flyout?: import('svelte').Snippet;
  class?: string;
  children?: import('svelte').Snippet | string;
  [key: string]: unknown;
}

