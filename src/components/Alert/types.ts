export type AlertVariant = 'custom' | 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps {
  variant?: AlertVariant;
  isInline?: boolean;
  isPlain?: boolean;
  isExpandable?: boolean;
  isExpanded?: boolean;
  isTruncate?: boolean;
  title?: string;
  titleScreenReader?: string;
  customIcon?: string;
  showClose?: boolean;
  onClose?: () => void;
  onExpand?: (expanded: boolean) => void;
  id?: string;
  'aria-label'?: string;
  'aria-live'?: 'polite' | 'assertive' | 'off';
  'aria-atomic'?: boolean;
  class?: string;
}
