export type DescriptionListColumnModifier = '1Col' | '2Col' | '3Col';

export type DescriptionListBreakpoint = 'default' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type DescriptionListDisplay = 'lg' | '2xl';

export interface ColumnModifier {
  default?: DescriptionListColumnModifier;
  sm?: DescriptionListColumnModifier;
  md?: DescriptionListColumnModifier;
  lg?: DescriptionListColumnModifier;
  xl?: DescriptionListColumnModifier;
  '2xl'?: DescriptionListColumnModifier;
}

export interface DescriptionListProps {
  id?: string;
  'aria-label'?: string;
  isHorizontal?: boolean;
  isCompact?: boolean;
  isFluid?: boolean;
  isColumnFill?: boolean;
  isAutoFit?: boolean;
  isAutoColumnWidth?: boolean;
  isInlineGrid?: boolean;
  display?: DescriptionListDisplay;
  columnModifier?: ColumnModifier;
  class?: string;
  children?: import('svelte').Snippet;
}

export interface DescriptionListGroupProps {
  isCard?: boolean;
  isVertical?: boolean;
  class?: string;
  children?: import('svelte').Snippet;
}

export interface DescriptionListTermProps {
  hasHelpText?: boolean;
  class?: string;
  children?: import('svelte').Snippet;
}

export interface DescriptionListTermHelpTextProps {
  headerContent?: import('svelte').Snippet;
  bodyContent?: import('svelte').Snippet;
  footerContent?: import('svelte').Snippet;
  showClose?: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  class?: string;
  children?: import('svelte').Snippet;
}

export interface DescriptionListTermHelpTextButtonProps {
  id?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  tabindex?: number;
  onclick?: (event: MouseEvent) => void;
  onkeydown?: (event: KeyboardEvent) => void;
  class?: string;
  children?: import('svelte').Snippet;
}

export interface DescriptionListDescriptionProps {
  class?: string;
  children?: import('svelte').Snippet;
}
