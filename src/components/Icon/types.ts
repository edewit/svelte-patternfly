export type IconSize =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | 'headingSm'
  | 'headingMd'
  | 'headingLg'
  | 'headingXl'
  | 'heading_2xl'
  | 'heading_3xl'
  | 'bodySm'
  | 'bodyDefault'
  | 'bodyLg';

export type IconStatus = 'custom' | 'info' | 'success' | 'warning' | 'danger';

export interface IconProps {
  size?: IconSize;
  iconSize?: IconSize;
  status?: IconStatus;
  isInline?: boolean;
  isInProgress?: boolean;
  progressIcon?: import('svelte').Snippet;
  progressIconSize?: IconSize;
  shouldMirrorRTL?: boolean;
  defaultProgressArialabel?: string;
  class?: string;
  children?: import('svelte').Snippet;
  icon?: string; // Icon class string (e.g., "fas fa-cog")
}


