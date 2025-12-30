export type BadgeVariant = 'read' | 'unread' | 'disabled';

export interface BadgeProps {
  variant?: BadgeVariant;
  class?: string;
}
