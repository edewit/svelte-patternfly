export type PageSectionVariant = 'default' | 'secondary';
export type PageSectionType = 'default' | 'nav' | 'subnav' | 'tabs' | 'breadcrumb' | 'wizard';
export type PagePadding = 'padding' | 'noPadding';

export interface PagePaddingBreakpoints {
  default?: PagePadding;
  sm?: PagePadding;
  md?: PagePadding;
  lg?: PagePadding;
  xl?: PagePadding;
  '2xl'?: PagePadding;
}

export interface PageProps {
  masthead?: import('svelte').Snippet;
  sidebar?: import('svelte').Snippet;
  isContentFilled?: boolean;
  isManagedSidebar?: boolean;
  id?: string;
  class?: string;
  children?: import('svelte').Snippet;
  [key: string]: unknown;
}

export interface PageSidebarProps {
  isSidebarOpen?: boolean;
  id?: string;
  class?: string;
  children?: import('svelte').Snippet;
  [key: string]: unknown;
}

export interface PageSidebarBodyProps {
  usePageInsets?: boolean;
  isFilled?: boolean;
  id?: string;
  class?: string;
  children?: import('svelte').Snippet;
  [key: string]: unknown;
}

export interface PageSectionProps {
  variant?: PageSectionVariant;
  padding?: PagePaddingBreakpoints;
  type?: PageSectionType;
  isFilled?: boolean;
  'aria-labelledby'?: string;
  id?: string;
  class?: string;
  children?: import('svelte').Snippet;
  [key: string]: unknown;
}

export interface PageGroupProps {
  isFilled?: boolean;
  id?: string;
  class?: string;
  children?: import('svelte').Snippet;
  [key: string]: unknown;
}

export interface PageToggleButtonProps {
  isHamburgerButton?: boolean;
  'aria-label'?: string;
  isSidebarOpen?: boolean;
  onSidebarToggle?: () => void;
  id?: string;
  class?: string;
  [key: string]: unknown;
}

