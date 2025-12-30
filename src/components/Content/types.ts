export type ContentVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'a'
  | 'ul'
  | 'ol'
  | 'li'
  | 'blockquote'
  | 'hr'
  | 'dl'
  | 'dt'
  | 'dd'
  | 'small'
  | 'pre'
  | 'strong'
  | 'em'
  | 'sub'
  | 'sup';

export const ContentVariants = {
  h1: 'h1' as const,
  h2: 'h2' as const,
  h3: 'h3' as const,
  h4: 'h4' as const,
  h5: 'h5' as const,
  h6: 'h6' as const,
  p: 'p' as const,
  a: 'a' as const,
  ul: 'ul' as const,
  ol: 'ol' as const,
  li: 'li' as const,
  blockquote: 'blockquote' as const,
  hr: 'hr' as const,
  dl: 'dl' as const,
  dt: 'dt' as const,
  dd: 'dd' as const,
  small: 'small' as const,
  pre: 'pre' as const,
  strong: 'strong' as const,
  em: 'em' as const,
  sub: 'sub' as const,
  sup: 'sup' as const
};

export interface ContentProps {
  component?: ContentVariant;
  isPageTitle?: boolean;
  isPlain?: boolean;
  isEditorial?: boolean;
  href?: string;
  class?: string;
}
