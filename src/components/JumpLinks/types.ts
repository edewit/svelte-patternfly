export interface JumpLinksProps {
  'aria-label'?: string;
  class?: string;
  children?: import('svelte').Snippet;
}

export interface JumpLinksItemProps {
  href?: string;
  isActive?: boolean;
  'aria-label'?: string;
  class?: string;
  children?: import('svelte').Snippet | string;
}

