export interface MenuToggleProps {
  isExpanded?: boolean;
  isDisabled?: boolean;
  isPlain?: boolean;
  isFullHeight?: boolean;
  isFullWidth?: boolean;
  isPlaceholder?: boolean;
  isSettings?: boolean;
  size?: 'default' | 'sm';
  variant?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'plain' | 'plainText' | 'typeahead';
  badge?: import('svelte').Snippet | string | number;
  icon?: import('svelte').Snippet;
  status?: 'default' | 'warning' | 'danger' | 'success';
  statusIcon?: import('svelte').Snippet;
  'aria-label'?: string;
  'aria-haspopup'?: 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  'aria-controls'?: string;
  'aria-describedby'?: string;
  onClick?: (event: MouseEvent) => void;
  class?: string;
  children?: import('svelte').Snippet | string;
  [key: string]: unknown;
}

