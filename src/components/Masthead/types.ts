export type MastheadDisplay = 'inline' | 'stack';

export type MastheadInset = 'insetNone' | 'insetXs' | 'insetSm' | 'insetMd' | 'insetLg' | 'insetXl' | 'inset2xl' | 'inset3xl';

export type MastheadBreakpoint = 'default' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface MastheadDisplayBreakpoints {
  default?: MastheadDisplay;
  sm?: MastheadDisplay;
  md?: MastheadDisplay;
  lg?: MastheadDisplay;
  xl?: MastheadDisplay;
  '2xl'?: MastheadDisplay;
}

export interface MastheadInsetBreakpoints {
  default?: MastheadInset;
  sm?: MastheadInset;
  md?: MastheadInset;
  lg?: MastheadInset;
  xl?: MastheadInset;
  '2xl'?: MastheadInset;
}

export interface MastheadProps {
  id?: string;
  display?: MastheadDisplayBreakpoints;
  inset?: MastheadInsetBreakpoints;
  class?: string;
  children?: import('svelte').Snippet;
}

export interface MastheadMainProps {
  class?: string;
  children?: import('svelte').Snippet;
}

export interface MastheadToggleProps {
  class?: string;
  children?: import('svelte').Snippet;
}

export interface MastheadBrandProps {
  class?: string;
  children?: import('svelte').Snippet;
}

export interface MastheadLogoProps {
  component?: string;
  href?: string;
  class?: string;
  children?: import('svelte').Snippet | string;
  [key: string]: unknown;
}

export interface MastheadContentProps {
  class?: string;
  children?: import('svelte').Snippet | string;
}

