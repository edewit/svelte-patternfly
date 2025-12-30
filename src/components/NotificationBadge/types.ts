export type NotificationBadgeVariant = 'read' | 'unread' | 'attention';

export interface NotificationBadgeProps {
  variant?: NotificationBadgeVariant;
  'aria-label'?: string;
  isExpanded?: boolean;
  count?: number;
  shouldNotify?: boolean;
  onClick?: (event: MouseEvent) => void;
  onAnimationEnd?: (event: AnimationEvent) => void;
  icon?: import('svelte').Snippet;
  attentionIcon?: import('svelte').Snippet;
  className?: string;
  class?: string;
  children?: import('svelte').Snippet;
}

