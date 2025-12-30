export type NotificationDrawerVariant = 'custom' | 'info' | 'success' | 'warning' | 'danger';

export interface NotificationDrawerProps {
  class?: string;
}

export interface NotificationDrawerHeaderProps {
  count?: number;
  onClose?: (event: MouseEvent | KeyboardEvent) => void;
  class?: string;
}

export interface NotificationDrawerBodyProps {
  class?: string;
}

export interface NotificationDrawerListProps {
  'aria-label'?: string;
  class?: string;
}

export interface NotificationDrawerListItemProps {
  variant?: NotificationDrawerVariant;
  isRead?: boolean;
  isHoverable?: boolean;
  class?: string;
}

export interface NotificationDrawerListItemHeaderProps {
  variant?: NotificationDrawerVariant;
  title?: string;
  srTitle?: string;
  truncateTitle?: number;
  class?: string;
}

export interface NotificationDrawerListItemBodyProps {
  timestamp?: string;
  class?: string;
}

