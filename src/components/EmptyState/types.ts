export type EmptyStateVariant = 'xs' | 'sm' | 'lg' | 'xl' | 'full';
export type EmptyStateStatus = 'danger' | 'warning' | 'success' | 'info' | 'custom';
export type EmptyStateHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface EmptyStateProps {
  id?: string;
  class?: string;
  headerClassName?: string;
  titleClassName?: string;
  titleText?: string | import('svelte').Snippet;
  headingLevel?: EmptyStateHeadingLevel;
  icon?: string | import('svelte').Snippet;
  variant?: EmptyStateVariant;
  status?: EmptyStateStatus;
  isFullHeight?: boolean;
  children?: import('svelte').Snippet;
  bodySlot?: import('svelte').Snippet;
  footerSlot?: import('svelte').Snippet;
}

export interface EmptyStateBodyProps {
  class?: string;
  children?: import('svelte').Snippet;
}

export interface EmptyStateFooterProps {
  class?: string;
  children?: import('svelte').Snippet;
}

export interface EmptyStateActionsProps {
  class?: string;
  children?: import('svelte').Snippet;
}
