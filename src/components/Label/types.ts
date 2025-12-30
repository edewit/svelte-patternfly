export type LabelColor =
  | 'grey'
  | 'blue'
  | 'green'
  | 'orange'
  | 'red'
  | 'orangered'
  | 'purple'
  | 'teal'
  | 'yellow';

export type LabelStatus = 'success' | 'warning' | 'danger' | 'info' | 'custom';

export type LabelVariant = 'filled' | 'outlined';

export interface LabelProps {
  color?: LabelColor;
  status?: LabelStatus;
  variant?: LabelVariant;
  isCompact?: boolean;
  isDisabled?: boolean;
  icon?: import('svelte').Snippet | string;
  onClose?: () => void;
  onClick?: (event: MouseEvent) => void;
  href?: string;
  textMaxWidth?: string;
  id?: string;
  'aria-label'?: string;
  class?: string;
  children?: import('svelte').Snippet | string;
}

