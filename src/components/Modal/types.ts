export type ModalVariant = 'small' | 'medium' | 'large' | 'default';
export type ModalPosition = 'top' | 'default';
export type ModalAppendToElement = HTMLElement | (() => HTMLElement);

export interface ModalProps {
  isOpen?: boolean;
  onClose?: (event?: KeyboardEvent | MouseEvent) => void;
  ouiaId?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-label'?: string;
  appendTo?: ModalAppendToElement;
  variant?: ModalVariant;
  position?: ModalPosition;
  width?: string;
  elementToFocus?: string | HTMLElement;
  showClose?: boolean;
  hasNoBodyWrapper?: boolean;
  disableFocusTrap?: boolean;
  class?: string;
  children?: import('svelte').Snippet;
}

export interface ModalHeaderProps {
  title?: string;
  labelId?: string;
  titleIconVariant?: 'success' | 'danger' | 'warning' | 'info' | 'custom';
  titleIcon?: import('svelte').Snippet;
  class?: string;
  children?: import('svelte').Snippet;
}

export interface ModalBodyProps {
  id?: string;
  tabIndex?: number;
  class?: string;
  children?: import('svelte').Snippet;
}

export interface ModalFooterProps {
  class?: string;
  children?: import('svelte').Snippet;
}

