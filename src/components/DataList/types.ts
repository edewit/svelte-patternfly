export type DataListModifier =
  | 'compact'
  | 'grid-lg'
  | 'grid-md'
  | 'grid-sm'
  | 'grid-xl'
  | 'grid-2xl';

export type DataListCellModifier =
  | 'align-right'
  | 'align-center'
  | 'icon'
  | 'no-fill'
  | 'wrap'
  | 'nowrap'
  | 'truncate';

export type DataListCellWidth =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';

export type VisibilityBreakpoint = 'default' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type VisibilityValue = 'hidden' | 'visible';

export interface Visibility {
  default?: VisibilityValue;
  sm?: VisibilityValue;
  md?: VisibilityValue;
  lg?: VisibilityValue;
  xl?: VisibilityValue;
  '2xl'?: VisibilityValue;
}

export interface DataListProps {
  id?: string;
  'aria-label'?: string;
  isCompact?: boolean;
  gridBreakpoint?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  class?: string;
  children?: import('svelte').Snippet;
}

export interface DataListItemProps {
  id?: string;
  'aria-labelledby'?: string;
  isExpanded?: boolean;
  isClickable?: boolean;
  class?: string;
  children?: import('svelte').Snippet;
}

export interface DataListItemRowProps {
  id?: string;
  class?: string;
  children?: import('svelte').Snippet;
}

export interface DataListItemCellsProps {
  dataListCells?: import('svelte').ComponentType[];
  class?: string;
  children?: import('svelte').Snippet;
}

export interface DataListCellProps {
  id?: string;
  width?: DataListCellWidth;
  modifier?: DataListCellModifier | DataListCellModifier[];
  isIcon?: boolean;
  isFilled?: boolean;
  isPlain?: boolean;
  class?: string;
  children?: import('svelte').Snippet;
}

export interface DataListControlProps {
  class?: string;
  children?: import('svelte').Snippet;
}

export interface DataListCheckProps {
  id?: string;
  name?: string;
  'aria-label'?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  class?: string;
}

export interface DataListActionProps {
  id?: string;
  'aria-labelledby'?: string;
  'aria-label'?: string;
  visibility?: Visibility;
  class?: string;
  children?: import('svelte').Snippet;
}

export interface DataListToggleProps {
  id?: string;
  'aria-labelledby'?: string;
  'aria-label'?: string;
  'aria-controls'?: string;
  isExpanded?: boolean;
  onClick?: () => void;
  class?: string;
  children?: import('svelte').Snippet;
}

export interface DataListContentProps {
  id?: string;
  'aria-label'?: string;
  isHidden?: boolean;
  hasNoPadding?: boolean;
  class?: string;
  children?: import('svelte').Snippet;
}
