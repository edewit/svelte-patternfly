export type ListComponent = 'ol' | 'ul';

export type OrderType = '1' | 'a' | 'A' | 'i' | 'I';

export type ListVariant = 'inline';

export type ListIconSize = 'default' | 'large';

export interface ListProps {
  component?: ListComponent;
  isBordered?: boolean;
  isPlain?: boolean;
  variant?: ListVariant;
  iconSize?: ListIconSize;
  type?: OrderType;
  'aria-label'?: string;
  class?: string;
  children?: import('svelte').Snippet;
}

export interface ListItemProps {
  icon?: import('svelte').Snippet;
  class?: string;
  children?: import('svelte').Snippet | string;
}

