export interface HintProps {
  actions?: import('svelte').Snippet;
  hasNoActionsOffset?: boolean;
  class?: string;
  children?: import('svelte').Snippet;
}

export interface HintTitleProps {
  class?: string;
  children?: import('svelte').Snippet | string;
}

export interface HintBodyProps {
  class?: string;
  children?: import('svelte').Snippet | string;
}

export interface HintFooterProps {
  class?: string;
  children?: import('svelte').Snippet | string;
}
