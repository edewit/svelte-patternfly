export type ToolbarItemVariant =
  | 'bulk-select'
  | 'overflow-menu'
  | 'pagination'
  | 'search-filter'
  | 'label'
  | 'chip-group'
  | 'separator'
  | 'expand-all';

export type ToolbarGroupVariant =
  | 'filter-group'
  | 'action-group'
  | 'action-group-inline'
  | 'action-group-plain'
  | 'label-group';

export interface ToolbarProps {
  id?: string;
  className?: string;
  class?: string;
  clearAllFilters?: () => void;
  clearFiltersButtonText?: string;
  collapseListedFiltersBreakpoint?: 'all' | 'md' | 'lg' | 'xl' | '2xl';
  isExpanded?: boolean;
  isFullHeight?: boolean;
  isStatic?: boolean;
  isSticky?: boolean;
  toggleIsExpanded?: () => void;
  ouiaId?: string;
  ouiaSafe?: boolean;
  children?: import('svelte').Snippet;
}

export interface ToolbarContentProps {
  id?: string;
  className?: string;
  class?: string;
  alignItems?: 'center';
  alignSelf?: 'center';
  clearAllFilters?: () => void;
  clearFiltersButtonText?: string;
  isExpanded?: boolean;
  showClearFiltersButton?: boolean;
  children?: import('svelte').Snippet;
}

export interface ToolbarItemProps {
  id?: string;
  className?: string;
  class?: string;
  align?: { default?: 'alignStart' | 'alignEnd' | 'alignStartWithConsumers' | 'alignEndWithConsumers' };
  isAllExpanded?: boolean;
  isOverflowContainer?: boolean;
  variant?: ToolbarItemVariant;
  widths?: { default?: string; sm?: string; md?: string; lg?: string; xl?: string; '2xl'?: string };
  children?: import('svelte').Snippet;
}

export interface ToolbarGroupProps {
  id?: string;
  className?: string;
  class?: string;
  align?: { default?: 'alignStart' | 'alignEnd' | 'alignStartWithConsumers' | 'alignEndWithConsumers' };
  variant?: ToolbarGroupVariant;
  children?: import('svelte').Snippet;
}
