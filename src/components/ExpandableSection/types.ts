export type ExpandableSectionDisplaySize = 'default' | 'lg';

export type ExpandableSectionDirection = 'up' | 'down';

export type ExpandableSectionVariant = 'default' | 'truncate';

export interface ExpandableSectionProps {
  toggleText?: string;
  onToggle?: (event: MouseEvent, isExpanded: boolean) => void;
  isExpanded?: boolean;
  displaySize?: ExpandableSectionDisplaySize;
  isDetached?: boolean;
  contentId?: string;
  toggleId?: string;
  direction?: ExpandableSectionDirection;
  isIndented?: boolean;
  variant?: ExpandableSectionVariant;
  truncateMaxLines?: number;
  class?: string;
  children?: import('svelte').Snippet;
}
