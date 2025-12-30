export type DrawerPosition = 'left' | 'right' | 'bottom';

export type DrawerVariant = 'default' | 'inline' | 'static';

export interface DrawerProps {
  isExpanded?: boolean;
  position?: DrawerPosition;
  variant?: DrawerVariant;
  isInline?: boolean;
  isStatic?: boolean;
  onExpand?: () => void;
  class?: string;
}

export interface DrawerContentProps {
  isExpanded?: boolean;
  class?: string;
  children?: import('svelte').Snippet;
  panelContent?: import('svelte').Snippet;
}

export interface DrawerContentBodyProps {
  hasPadding?: boolean;
  class?: string;
  children?: import('svelte').Snippet;
}

export interface DrawerPanelContentProps {
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  hasNoPadding?: boolean;
  isResizable?: boolean;
  defaultSize?: string;
  isExpanded?: boolean;
  class?: string;
  children?: import('svelte').Snippet;
}

export interface DrawerHeadProps {
  class?: string;
  children?: import('svelte').Snippet;
}

export interface DrawerActionsProps {
  class?: string;
  children?: import('svelte').Snippet;
}

export interface DrawerCloseButtonProps {
  'aria-label'?: string;
  onClick?: () => void;
  class?: string;
}

export interface DrawerPanelDescriptionProps {
  class?: string;
  children?: import('svelte').Snippet;
}

export interface DrawerPanelBodyProps {
  hasPadding?: boolean;
  class?: string;
  children?: import('svelte').Snippet;
}
