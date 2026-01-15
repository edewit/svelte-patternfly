export type SimpleListItemClickHandler = (
  event: Event,
  itemId: number | string
) => void;

export type SimpleListOnSelectHandler = (
  event: Event,
  result: { itemId: number | string }
) => void;

export interface SimpleListProps {
  /** Callback when an item is selected */
  onSelect?: SimpleListOnSelectHandler;
  /** Flag indicating if the simple list is controlled */
  isControlled?: boolean;
  /** Aria label for the simple list */
  'aria-label'?: string;
  /** Additional CSS class */
  class?: string;
  /** Children content */
  children?: import('svelte').Snippet;
  /** Allow additional props */
  [key: string]: unknown;
}

export interface SimpleListItemProps {
  /** Unique identifier for the item */
  itemId?: number | string;
  /** Flag indicating if the item is active/selected */
  isActive?: boolean;
  /** Custom click handler for the item */
  onClick?: SimpleListItemClickHandler;
  /** Content to render as the item (can be used instead of children) */
  component?: 'button' | 'a';
  /** Href for anchor component type */
  href?: string;
  /** Additional CSS class */
  class?: string;
  /** Children content */
  children?: import('svelte').Snippet | string;
  /** Allow additional props */
  [key: string]: unknown;
}

export interface SimpleListGroupProps {
  /** Title of the group */
  title?: string;
  /** Unique identifier for the group */
  id?: string;
  /** Additional CSS class */
  class?: string;
  /** Additional CSS class for the title */
  titleClassName?: string;
  /** Children content */
  children?: import('svelte').Snippet;
  /** Allow additional props */
  [key: string]: unknown;
}
