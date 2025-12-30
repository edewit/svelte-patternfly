export interface PaginationProps {
  itemCount?: number;
  perPage?: number;
  page?: number;
  onSetPage?: (event: MouseEvent | KeyboardEvent, newPage: number) => void;
  onPerPageSelect?: (
    event: MouseEvent | KeyboardEvent,
    newPerPage: number,
    newPage: number
  ) => void;
  perPageOptions?: Array<{ value: number; title?: string }>;
  widgetId?: string;
  itemsStart?: number;
  itemsEnd?: number;
  titles?: PaginationTitles;
  toggleTemplate?: (props: PaginationToggleTemplateProps) => string;
  isCompact?: boolean;
  isDisabled?: boolean;
  isStatic?: boolean;
  isSticky?: boolean;
  className?: string;
  class?: string;
  ouiaId?: string | number;
  ouiaSafe?: boolean;
  variant?: 'top' | 'bottom';
  dropDirection?: 'up' | 'down';
  firstPage?: number;
  lastPage?: number;
  offset?: number;
  inset?: {
    default?: 'insetNone' | 'insetSm' | 'insetMd' | 'insetLg' | 'insetXl' | 'inset2xl';
    sm?: 'insetNone' | 'insetSm' | 'insetMd' | 'insetLg' | 'insetXl' | 'inset2xl';
    md?: 'insetNone' | 'insetSm' | 'insetMd' | 'insetLg' | 'insetXl' | 'inset2xl';
    lg?: 'insetNone' | 'insetSm' | 'insetMd' | 'insetLg' | 'insetXl' | 'inset2xl';
    xl?: 'insetNone' | 'insetSm' | 'insetMd' | 'insetLg' | 'insetXl' | 'inset2xl';
    '2xl'?: 'insetNone' | 'insetSm' | 'insetMd' | 'insetLg' | 'insetXl' | 'inset2xl';
  };
  isLastFullPageShown?: boolean;
  [key: string]: unknown;
}

export interface PaginationTitles {
  items?: string;
  page?: string;
  itemsPerPage?: string;
  perPageSuffix?: string;
  toFirstPage?: string;
  toPreviousPage?: string;
  toNextPage?: string;
  toLastPage?: string;
  optionsToggle?: string;
  currPage?: string;
  paginationTitle?: string;
  ofWord?: string;
}

export interface PaginationToggleTemplateProps {
  firstIndex?: number;
  lastIndex?: number;
  itemCount?: number;
  itemsTitle?: string;
  ofWord?: string;
}

