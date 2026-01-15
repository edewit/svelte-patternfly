export type TitleHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type TitleSize = 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export interface TitleProps {
  /** The heading level to use */
  headingLevel: TitleHeadingLevel;
  /** The size of the title (overrides default size for heading level) */
  size?: TitleSize;
  /** Additional CSS class */
  class?: string;
  /** Children content */
  children?: import('svelte').Snippet | string;
  /** Allow additional props */
  [key: string]: unknown;
}
