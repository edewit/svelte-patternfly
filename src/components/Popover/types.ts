export type PopoverPosition =
  | 'auto'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end';

export type AppendToElement = HTMLElement | (() => HTMLElement) | 'parent' | 'inline';
export type PopoverTriggerAction = 'click' | 'hover';

export interface PopoverProps {
  id?: string;
  headerContent?: import('svelte').Snippet;
  bodyContent: import('svelte').Snippet;
  footerContent?: import('svelte').Snippet;
  showClose?: boolean;
  isVisible?: boolean;
  onClose?: () => void;
  position?: PopoverPosition;
  appendTo?: AppendToElement;
  triggerAction?: PopoverTriggerAction;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  ariaModal?: boolean;
  hasNoPadding?: boolean;
  width?: string | 'auto';
  minWidth?: string;
  maxWidth?: string;
  elementToFocus?: string | HTMLElement;
  enableFlip?: boolean;
  flipBehavior?: 'flip' | 'clock' | 'counter';
  distance?: number;
  class?: string;
  children?: import('svelte').Snippet;
}
