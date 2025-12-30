export interface HelperTextProps {
  id?: string;
  component?: 'div' | 'ul';
  isLiveRegion?: boolean;
  'aria-label'?: string;
  className?: string;
  class?: string;
}

export interface HelperTextItemProps {
  id?: string;
  variant?: 'default' | 'indeterminate' | 'warning' | 'success' | 'error';
  icon?: import('svelte').Snippet | string;
  component?: 'div' | 'li';
  screenReaderText?: string;
  isDynamic?: boolean;
  className?: string;
  class?: string;
}
