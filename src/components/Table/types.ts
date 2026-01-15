export type TableVariant = 'default' | 'compact';

export type TableGridBreakpoint = '' | 'grid' | 'grid-md' | 'grid-lg' | 'grid-xl' | 'grid-2xl';

export type SortDirection = 'asc' | 'desc' | 'none';

export interface ThInfoType {
  /** Tooltip content */
  tooltip?: string;
  /** Popover content (snippet) */
  popover?: import('svelte').Snippet;
  /** Aria label for the info button */
  ariaLabel?: string;
  /** Additional class for the info element */
  className?: string;
  /** Tooltip props */
  tooltipProps?: {
    isContentLeftAligned?: boolean;
  };
  /** Popover props */
  popoverProps?: {
    headerContent?: string;
    footerContent?: import('svelte').Snippet;
  };
}

export interface ThSortType {
  /** Current sort direction */
  sortBy?: SortDirection;
  /** Column index for sorting */
  columnIndex?: number;
  /** Callback when sort is triggered */
  onSort?: (event: MouseEvent, columnIndex: number, direction: SortDirection) => void;
}

export interface TableProps {
  /** Aria label for the table */
  'aria-label'?: string;
  /** Table variant */
  variant?: TableVariant;
  /** Adds borders to the table */
  isBordered?: boolean;
  /** Removes borders from the table */
  isBorderless?: boolean;
  /** Makes the table striped */
  isStriped?: boolean;
  /** Makes the table expandable */
  isExpandable?: boolean;
  /** Grid breakpoint for responsive behavior */
  gridBreakpoint?: TableGridBreakpoint;
  /** Makes the header sticky */
  isStickyHeader?: boolean;
  /** Is the table nested inside another table */
  isNested?: boolean;
  /** Table ID */
  id?: string;
  /** Additional CSS class */
  class?: string;
  /** Children content */
  children?: import('svelte').Snippet;
  /** Allow additional props */
  [key: string]: unknown;
}

export interface CaptionProps {
  /** Additional CSS class */
  class?: string;
  /** Children content */
  children?: import('svelte').Snippet | string;
  /** Allow additional props */
  [key: string]: unknown;
}

export interface TheadProps {
  /** Prevents text wrapping */
  noWrap?: boolean;
  /** Additional CSS class */
  class?: string;
  /** Children content */
  children?: import('svelte').Snippet;
  /** Allow additional props */
  [key: string]: unknown;
}

export interface TbodyProps {
  /** Additional CSS class */
  class?: string;
  /** Children content */
  children?: import('svelte').Snippet;
  /** Allow additional props */
  [key: string]: unknown;
}

export interface TrProps {
  /** Is the row selected */
  isSelected?: boolean;
  /** Is the row expanded */
  isExpanded?: boolean;
  /** Is this a row for expandable content */
  isExpandableRow?: boolean;
  /** Is the row hoverable */
  isHoverable?: boolean;
  /** Is the row clickable */
  isClickable?: boolean;
  /** Row click handler */
  onRowClick?: (event: MouseEvent) => void;
  /** Additional CSS class */
  class?: string;
  /** Children content */
  children?: import('svelte').Snippet;
  /** Allow additional props */
  [key: string]: unknown;
}

export interface ThProps {
  /** Sort configuration */
  sort?: ThSortType;
  /** Info tooltip/popover configuration */
  info?: ThInfoType;
  /** Column scope */
  scope?: 'col' | 'row';
  /** Center text */
  textCenter?: boolean;
  /** Column width (e.g., '10%', '100px') */
  width?: string | number;
  /** Minimum width */
  minWidth?: string | number;
  /** Maximum width */
  maxWidth?: string | number;
  /** Is the column a subheader */
  isSubheader?: boolean;
  /** Column span */
  colSpan?: number;
  /** Row span */
  rowSpan?: number;
  /** Additional CSS class */
  class?: string;
  /** Children content */
  children?: import('svelte').Snippet | string;
  /** Allow additional props */
  [key: string]: unknown;
}

export interface TdProps {
  /** Data label for responsive view */
  dataLabel?: string;
  /** Center text */
  textCenter?: boolean;
  /** Column span */
  colSpan?: number;
  /** Row span */
  rowSpan?: number;
  /** Width */
  width?: string | number;
  /** Is this a compound expand toggle cell */
  compoundExpand?: {
    isExpanded?: boolean;
    onToggle?: (event: MouseEvent) => void;
  };
  /** Is this a select cell */
  select?: {
    isSelected?: boolean;
    onSelect?: (event: Event, isSelected: boolean) => void;
    isDisabled?: boolean;
    rowIndex?: number;
  };
  /** Is this an expand toggle cell */
  expand?: {
    isExpanded?: boolean;
    onToggle?: (event: MouseEvent) => void;
    rowIndex?: number;
  };
  /** Is this an actions cell */
  isActionCell?: boolean;
  /** Additional CSS class */
  class?: string;
  /** Children content */
  children?: import('svelte').Snippet | string;
  /** Allow additional props */
  [key: string]: unknown;
}
