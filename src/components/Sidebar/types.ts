import type { Snippet } from 'svelte';

/**
 * Width options for the sidebar panel
 */
export type SidebarPanelWidth = 'default' | '25' | '33' | '50' | '66' | '75' | '100';

/**
 * Props for the Sidebar component
 */
export interface SidebarProps {
  /** Indicates the direction of the layout. */
  orientation?: 'stack';
  /** Flag indicating that the panel is displayed to the right of the content. */
  isPanelRight?: boolean;
  /** Flag indicating a gutter should be placed between the panel and content. */
  hasGutter?: boolean;
  /** Flag indicating that the sidebar should have no background. */
  hasNoBackground?: boolean;
  /** Additional classes applied to the sidebar container. */
  class?: string;
  /** Adds an accessible name to the sidebar when there is scrollable content. */
  'aria-label'?: string;
  /** Tab index for keyboard navigation when there is scrollable content. */
  tabIndex?: number;
  /** Children content */
  children?: Snippet;
}

/**
 * Props for the SidebarPanel component
 */
export interface SidebarPanelProps {
  /** Indicates the width of the panel in various breakpoints. */
  width?: SidebarPanelWidth;
  /** Indicates that the panel should not grow with the content. */
  hasNoFlex?: boolean;
  /** Flag indicating that the panel should remain sticky while content is scrollable. */
  isSticky?: boolean;
  /** Flag indicating that the panel should not remain sticky while content is scrollable. */
  isStatic?: boolean;
  /** Flag indicating that the panel has a border. */
  hasBorder?: boolean;
  /** Flag indicating that the panel has padding. */
  hasPadding?: boolean;
  /** Additional classes applied to the sidebar panel. */
  class?: string;
  /** Children content */
  children?: Snippet;
}

/**
 * Props for the SidebarContent component
 */
export interface SidebarContentProps {
  /** Flag indicating that the content should have no background. */
  hasNoBackground?: boolean;
  /** Flag indicating the content has padding. */
  hasPadding?: boolean;
  /** Flag indicating the content has a secondary background color. */
  isSecondary?: boolean;
  /** Additional classes applied to the sidebar content. */
  class?: string;
  /** Children content */
  children?: Snippet;
}

